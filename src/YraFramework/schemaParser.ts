import fs from 'fs';
import {
    CKDBFieldType, CKDBSortableFieldType, fieldTypeConfig,
    generateQueryMethods, generateSortMethods,
} from "./modelGenerator";
import {CKDBQuerySortOrder} from "@apple/cktool.api.database/dist/types/models/CKDBQuerySortOrderCodec";

export function readSchemaFile(schemaFilePath: string): string | null {
    try {
        const fileContent = fs.readFileSync(schemaFilePath, 'utf8').trim();
        if (!fileContent) {
            console.error("File is empty:", schemaFilePath);
            return null;
        }
        return fileContent;
    } catch (error: any) {
        console.error("Error reading the schema file:", error.message);
        return null;
    }
}

export function parseCKDBSchema(fileContent: string): string | null {
    const recordTypeRegex = /RECORD TYPE (\w+) \(([\s\S]+?)\)\s*;/g;
    let match: RegExpExecArray | null;
    let typeScriptDefinitions = '';
    let modelClassDefinitions = '';

    while ((match = recordTypeRegex.exec(fileContent)) !== null) {
        const typeName = match[1]!;
        if (typeName === 'Users') continue;  // Optionally skip certain types

        const fieldsBlock = match[2]!;
        const { tsTypeDefinitions, yraTypeDefinitions, ckdbTypeDefinitions, modelDefinitions } = parseFields(fieldsBlock, typeName);

        if (ckdbTypeDefinitions) {
            typeScriptDefinitions += `export type CKDB${typeName} = {\n${ckdbTypeDefinitions}};\n\n`;
            modelClassDefinitions += modelDefinitions + '\n\n';
        } else {
            console.warn(`No fields parsed for ${typeName}.`);
        }

        if (tsTypeDefinitions) {
            typeScriptDefinitions += `export type ${typeName} = {\n${tsTypeDefinitions}};\n\n`;
        } else {
            console.warn(`No fields parsed for ${typeName}.`);
        }

        if (yraTypeDefinitions) {
            typeScriptDefinitions += `export type Yra${typeName} = {\n${yraTypeDefinitions}};\n\n`;
        } else {
            console.warn(`No fields parsed for ${typeName}.`);
        }
    }

    return typeScriptDefinitions && modelClassDefinitions ?
        typeScriptDefinitions + modelClassDefinitions : null;
}


export function parseFields(
    fieldsBlock: string,
    typeName: string
): {
    tsTypeDefinitions: string;
    ckdbTypeDefinitions: string,
    yraTypeDefinitions: string,
    modelDefinitions: string
} {
    const fieldRegex = /^\s*(\w+)\s+(\w+)(<\w+>)?(\s+QUERYABLE)?(\s+SORTABLE)?,/gm;
    let fieldMatch: RegExpExecArray | null;
    let yraTypeDefinitions = '';
    let ckdbTypeDefinitions = '';
    let tsTypeDefinitions = '';
    let filterMethods = '';
    let sortMethods = '';

    while ((fieldMatch = fieldRegex.exec(fieldsBlock)) !== null) {
        const fieldName = fieldMatch[1]!;
        const fieldType = fieldMatch[2]!;
        const listType = fieldMatch[3];
        const isQueryable = fieldMatch[4] ? 'true' : 'false';
        const isSortable = fieldMatch[5] ? 'true' : 'false';

        // If GRANT skip

        if (fieldName === 'GRANT') {
            continue;
        }

        const ckdbFieldType = mapSchemaTypeToCKDBFieldType(fieldType, listType);
        const tsFieldType = mapSchemaTypeToUsageType(fieldType, listType);
        yraTypeDefinitions += `    ${fieldName}: ${ckdbFieldType} & { queryable: ${isQueryable}, sortable: ${isSortable} };\n`;
        ckdbTypeDefinitions += `    ${fieldName}: ${ckdbFieldType};\n`;
        tsTypeDefinitions += `    ${fieldName}: ${tsFieldType};\n`;

        if (isQueryable === 'true') {
            //console.log(methods)
            switch (fieldType) {
                case CKDBFieldType.STRING:
                    filterMethods += generateQueryMethods(CKDBFieldType.STRING, fieldName);
                    break;
                case CKDBFieldType.INT64:
                    filterMethods += generateQueryMethods(CKDBFieldType.INT64, fieldName);
                    break;
                case CKDBFieldType.DOUBLE:
                    filterMethods += generateQueryMethods(CKDBFieldType.DOUBLE, fieldName);
                    break;
                case CKDBFieldType.TIMESTAMP:
                    filterMethods += generateQueryMethods(CKDBFieldType.TIMESTAMP, fieldName);
                    break;
                case CKDBFieldType.REFERENCE:
                    filterMethods += generateQueryMethods(CKDBFieldType.REFERENCE, fieldName);
                    break;
                default:
                    break;
            }
        }

        if (isSortable === 'true') {
            switch (fieldType) {
                case CKDBSortableFieldType.INT64:
                    sortMethods += generateSortMethods(CKDBSortableFieldType.INT64, fieldName);
                    break;
                case CKDBSortableFieldType.DOUBLE:
                    sortMethods += generateSortMethods(CKDBSortableFieldType.DOUBLE, fieldName);
                    break;
                case CKDBSortableFieldType.TIMESTAMP:
                    sortMethods += generateSortMethods(CKDBSortableFieldType.TIMESTAMP, fieldName);
                    break;
                default:
                    break;
            }
        }
    }

    const singleSpacing = ' '.repeat(4);
    const doubleSpacing = ' '.repeat(8);

    const typeNameField = typeName.charAt(0).toLowerCase() + typeName.slice(1);

    let modelDefinitions = `class ${typeName}QueryBuilder {\n` +
        `${singleSpacing}private filters: QueryFilter[] = [];\n` +
        `${singleSpacing}private sorts: CKDBQuerySort[] = [];\n` +
        `${singleSpacing}#recordType: string;\n` +
        `${singleSpacing}#queryFunc: (recordType: string, filters: QueryFilter[], sorts: CKDBQuerySort[], limit?: number) => Promise<${typeName}Model[]>;\n` +
        `${singleSpacing}#limit: number = 200;\n\n` +
        `${singleSpacing}constructor(recordType: string, queryFunc: any) {\n` +
        `${doubleSpacing}this.#recordType = recordType;\n` +
        `${doubleSpacing}this.#queryFunc = queryFunc;\n` +
        `${singleSpacing}}\n` +
        `\n` +
        `${singleSpacing}async execute() {\n` +
        `${doubleSpacing}return await this.#queryFunc(this.#recordType, this.filters, this.sorts, this.#limit);\n` +
        `${singleSpacing}}\n` +
        `\n` +
        `${singleSpacing}limit(limit: number) {\n` +
        `${doubleSpacing}this.#limit = limit;\n` +
        `${doubleSpacing}return this;\n` +
        `${singleSpacing}}` +

        // Query methods
        filterMethods +
        sortMethods +

        `}\n` +
        `\n` +
        // Query
        `export class ${typeName}Model extends CKModel<CKDB${typeName}> {\n` +
        `${singleSpacing}static query() {\n` +
        `${doubleSpacing}return new ${typeName}QueryBuilder('${typeName}', ${typeName}Model._query);\n` +
        `${singleSpacing}}\n` +

         // Create
        `${singleSpacing}static create(${typeNameField}: ${typeName}) {\n` +
        `${doubleSpacing}return ${typeName}Model._create('${typeName}', ${typeNameField}) \n` +
        `${singleSpacing}}\n` +

        `}\n`;

    return { tsTypeDefinitions, yraTypeDefinitions, ckdbTypeDefinitions, modelDefinitions };
}

export function mapSchemaTypeToCKDBFieldType(fieldType: string, listType?: string): string {
    const typeMapping: { [key: string]: any } = {
        'STRING': 'CKDBRecordFieldStringValue',
        'INT64': 'CKDBRecordFieldInt64Value',
        'DOUBLE': 'CKDBRecordFieldDoubleValue',
        'TIMESTAMP': 'CKDBRecordFieldTimestampValue',
        'REFERENCE': 'CKDBRecordFieldReferenceValue',
        'ASSET': 'CKDBRecordFieldAssetValue',
        'LOCATION': 'CKDBRecordFieldLocationValue',
        'BYTES': 'CKDBRecordFieldBytesValue',
        'LIST': {
            'STRING': 'CKDBRecordFieldStringListValue',
            'INT64': 'CKDBRecordFieldInt64ListValue',
            'DOUBLE': 'CKDBRecordFieldDoubleListValue',
            'TIMESTAMP': 'CKDBRecordFieldTimestampListValue',
            'ASSET': 'CKDBRecordFieldAssetListValue',
            'LOCATION': 'CKDBRecordFieldLocationListValue',
            'REFERENCE': 'CKDBRecordFieldReferenceListValue',
            'BYTES': 'CKDBRecordFieldBytesListValue',
        }
    };

    if (listType) {
        listType = listType.replace(/[<>]/g, '');
        return typeMapping['LIST'][listType] || 'any';
    } else {
        return typeMapping[fieldType] || 'any';
    }
}


export function mapSchemaTypeToUsageType(fieldType: string, listType?: string): string {
    const typeMapping: { [key: string]: any } = {
        'STRING': 'string',
        'INT64': 'number',
        'DOUBLE': 'number',
        'TIMESTAMP': 'Date',
        'REFERENCE': 'string',
        'ASSET': 'ConvertibleToCKDBAsset',
        'LOCATION': 'string',
        'BYTES': 'string',
        'LIST': {
            'STRING': 'string[]',
            'INT64': 'number[]',
            'DOUBLE': 'number[]',
            'TIMESTAMP': 'Date[]',
            'ASSET': 'ConvertibleToCKDBAsset[]',
            'LOCATION': 'string[]',
            'REFERENCE': 'string[]',
            'BYTES': 'string[]',
        }
    };

    if (listType) {
        listType = listType.replace(/[<>]/g, '');
        return typeMapping['LIST'][listType] || 'any';
    } else {
        return typeMapping[fieldType] || 'any';
    }
}




















