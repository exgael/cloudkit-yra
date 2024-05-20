// CKRecordBuilder.ts
import {
    createCKDBRecordFieldStringValue,
    createCKDBRecordFieldInt64Value,
    createCKDBRecordFieldDoubleValue,
    createCKDBRecordFieldTimestampValue,
    createCKDBRecordFieldStringListValue,
    createCKDBRecordFieldAssetValue,
    createCKDBRecordFieldLocationValue,
    createCKDBRecordFieldReferenceValue,
    createCKDBRecordFieldAssetListValue,
    createCKDBRecordFieldBytesListValue,
    createCKDBRecordFieldBytesValue,
    createCKDBRecordFieldDoubleListValue,
    createCKDBRecordFieldInt64ListValue,
    createCKDBRecordFieldEmptyListValue,
    toInt64, createCKDBRecordFieldTimestampListValue
} from "@apple/cktool.database";

import {PartialCKDBRecord} from "../CKModel/PartialCKDBRecord";

const typeToFieldFunctionMap: Record<string, Function> = {
    'string': createCKDBRecordFieldStringValue,
    'number': createCKDBRecordFieldInt64Value,
    'Date': createCKDBRecordFieldTimestampValue,
    'string[]': createCKDBRecordFieldStringListValue,
    'number[]': createCKDBRecordFieldInt64ListValue,
    'Date[]': createCKDBRecordFieldTimestampListValue,
};

class CKRecordBuilder<T extends Partial<PartialCKDBRecord>> {
    private readonly recordType: string;
    private fields: any = {};

    constructor(recordType: string) {
        this.recordType = recordType;
    }

    fromModel(model: any): this {
        Object.keys(model).forEach(key => {
            const value = model[key];
            const typeFunction = this.determineFieldFunction(value);
            if (!typeFunction) {
                throw new Error(`No CK field function for type ${typeof value} or specific object type`);
            }
            this.fields[key] = typeFunction({ value });
        });
        return this;
    }

    build(): T {
        if (!this.recordType) {
            throw new Error("Record type must be set before building the record.");
        }
        return {
            recordType: this.recordType,
            fields: this.fields
        } as T;
    }

    private determineFieldFunction(value: any): Function | undefined {
        if (Array.isArray(value)) {
            // Handle arrays by checking the type of the first element (assuming homogeneous arrays)
            const elemType = value[0] instanceof Date ? 'Date[]' : typeof value[0] + '[]';
            return typeToFieldFunctionMap[elemType];
        } else if (value instanceof Date) {
            // Handle Date objects
            return typeToFieldFunctionMap['Date'];
        } else {
            // Handle primitive types
            return typeToFieldFunctionMap[typeof value];
        }
    }
}


export default CKRecordBuilder;
