import {CKDBQueryFilterType} from "@apple/cktool.database";
import {CKDBQuerySortOrder} from "@apple/cktool.api.database/dist/types/models/CKDBQuerySortOrderCodec";

export enum CKDBFieldType {
    INT64 = "INT64",
    DOUBLE = "DOUBLE",
    STRING = "STRING",
    REFERENCE = "REFERENCE",
    TIMESTAMP = "TIMESTAMP"
}

export enum CKDBSortableFieldType {
    INT64 = "INT64",
    DOUBLE = "DOUBLE",
    TIMESTAMP = "TIMESTAMP"
}

interface FieldTypeConfig {
    singleValueFormatter: string;
    listValueFormatter: string;
    tsType: string;
    createSignature: string;
    validOperations: FilterOperation[];
    sortOperations?: SortOperation[];
}

type FilterOperation = keyof typeof CKDBQueryFilterType;
type OperationSignature = "Equals" | "NotEquals" | "LessThan" | "LessThanOrEquals" | "GreaterThan" | "GreaterThanOrEquals" | "ContainsAllTokens" | "In" | "NotIn" | "ContainsAnyTokens" | "ListContains" | "ListContainsAny" | "ListNotContains" | "ListNotContainsAny" | "BeginsWith" | "NotBeginsWith" | "ListMemberBeginsWith" | "ListMemberNotBeginsWith" | "ListContainsAll" | "NotListContainsAll" | "Near"
const operationToSignature: Record<FilterOperation, OperationSignature> = {
    "EQUALS": "Equals",
    "NOT_EQUALS": "NotEquals",
    "LESS_THAN": "LessThan",
    "LESS_THAN_OR_EQUALS": "LessThanOrEquals",
    "GREATER_THAN": "GreaterThan",
    "GREATER_THAN_OR_EQUALS": "GreaterThanOrEquals",
    "CONTAINS_ALL_TOKENS": "ContainsAllTokens",
    "IN": "In",
    "NOT_IN": "NotIn",
    "CONTAINS_ANY_TOKENS": "ContainsAnyTokens",
    "LIST_CONTAINS": "ListContains",
    "LIST_CONTAINS_ANY": "ListContainsAny",
    "LIST_NOT_CONTAINS": "ListNotContains",
    "LIST_NOT_CONTAINS_ANY": "ListNotContainsAny",
    "BEGINS_WITH": "BeginsWith",
    "NOT_BEGINS_WITH": "NotBeginsWith",
    "LIST_MEMBER_BEGINS_WITH": "ListMemberBeginsWith",
    "NOT_LIST_MEMBER_BEGINS_WITH": "ListMemberNotBeginsWith",
    "LIST_CONTAINS_ALL": "ListContainsAll",
    "NOT_LIST_CONTAINS_ALL": "NotListContainsAll",
    "NEAR": "Near"
};

export function generateQueryMethods(fieldType: CKDBFieldType, fieldName: string): string {
    const config = fieldTypeConfig[fieldType];

    const methods = config.validOperations.map(operation => {
        const signature = operationToSignature[operation as FilterOperation];
        const isListOperation = CKDBQueryFilterType[operation].includes('IN');
        const valueFieldName = isListOperation ? 'values' : 'value';
        const tsType = config.tsType;
        const valueType = isListOperation ? `${tsType}[]` : tsType;
        const formatter = isListOperation ? config.listValueFormatter : config.singleValueFormatter;
        const createSignature = config.createSignature;
        const createFunction = getCreateFunction(createSignature, formatter, isListOperation);

        const singleSpacing = ' '.repeat(4);
        const doubleSpacing = ' '.repeat(8);
        const tripleSpacing = ' '.repeat(12);

        return `\n` +
            `${singleSpacing}${fieldName}${signature}(${valueFieldName}: ${valueType}): this {\n` +
            `${doubleSpacing}this.filters.push({\n` +
            `${tripleSpacing}fieldName: '${fieldName}',\n` +
            `${tripleSpacing}fieldValue: { type: "${fieldType}", value: ${valueFieldName}},\n` +
            `${tripleSpacing}type: CKDBQueryFilterType.${operation}\n` +
            `${doubleSpacing}})\n` +
            `${doubleSpacing}return this;\n` +
            `${singleSpacing}}` +
            `\n`;
    });

    return methods.join("");
}

function getCreateFunction(signature: string, formatter: string, isListOperation: boolean): string {
    const augmentedSignature = isListOperation ? `${signature}List` : signature;
    const baseFunction = `createCKDBRecordField${augmentedSignature}Value`;
    return `${baseFunction}({ value: ${formatter} })`;
}

type SortOperation = keyof typeof CKDBQuerySortOrder;
type SortSignature = "Ascending" | "Descending";
const sortOperationToSignature: Record<SortOperation, SortSignature> = {
    "ASC": "Ascending",
    "DESC": "Descending"
};

export function generateSortMethods(fieldType: CKDBSortableFieldType, fieldName: string): string {
    const config = fieldTypeConfig[fieldType];
    if (!config.sortOperations) return "";

    const methods = config.sortOperations.map(operation => {
        const signature = sortOperationToSignature[operation as SortOperation];

        const singleSpacing = ' '.repeat(4);
        const doubleSpacing = ' '.repeat(8);

        return `\n` +
            `${singleSpacing}${fieldName}${signature}(): this {\n` +
            `${doubleSpacing}this.sorts.push({\n` +
            `${doubleSpacing}fieldName: '${fieldName}',\n` +
            `${doubleSpacing}order: CKDBQuerySortOrder.${operation}\n` +
            `${doubleSpacing}})\n` +
            `${doubleSpacing}return this;\n` +
            `${singleSpacing}}` +
            `\n`;
    });

    return methods.join("");
}



export const fieldTypeConfig: Record<CKDBFieldType, FieldTypeConfig> = {
    "INT64": {
        singleValueFormatter: "toInt64(value)",
        listValueFormatter: "values.map(value => toInt64(value))",
        tsType: "number",
        createSignature: "Int64",
        validOperations: [
            'EQUALS', 'NOT_EQUALS',
            'GREATER_THAN', 'LESS_THAN', 'GREATER_THAN_OR_EQUALS', 'LESS_THAN_OR_EQUALS',
            'IN', 'NOT_IN'
        ],
        sortOperations: ['ASC', 'DESC']
    },
    "DOUBLE": {
        singleValueFormatter: "value",
        listValueFormatter: "values",
        tsType: "number",
        createSignature: "Double",
        validOperations: [
            'EQUALS', 'NOT_EQUALS',
            'GREATER_THAN', 'LESS_THAN', 'GREATER_THAN_OR_EQUALS', 'LESS_THAN_OR_EQUALS',
            'IN', 'NOT_IN'
        ],
        sortOperations: ['ASC', 'DESC']
    },
    "STRING": {
        singleValueFormatter: "value",
        listValueFormatter: "values",
        tsType: "string",
        createSignature: "String",
        validOperations: [
            'EQUALS', 'NOT_EQUALS',
            'BEGINS_WITH', 'NOT_BEGINS_WITH',
            'CONTAINS_ALL_TOKENS', 'CONTAINS_ANY_TOKENS',
            'IN', 'NOT_IN'
        ]
    },
    "REFERENCE": {
        singleValueFormatter: "{ recordName: value }",
        listValueFormatter: "values.map(recordName => ({ recordName }))",
        tsType: "string",
        createSignature: "Reference",
        validOperations: [
            'EQUALS', 'NOT_EQUALS',
            'IN', 'NOT_IN'
        ]
    },
    "TIMESTAMP": {
        singleValueFormatter: "value",
        listValueFormatter: "values",
        tsType: "Date",
        createSignature: "Timestamp",
        validOperations:  [
            'EQUALS', 'NOT_EQUALS',
            'GREATER_THAN', 'LESS_THAN', 'GREATER_THAN_OR_EQUALS', 'LESS_THAN_OR_EQUALS',
            'IN', 'NOT_IN'
        ],
        sortOperations: ['ASC', 'DESC']
    }
};

