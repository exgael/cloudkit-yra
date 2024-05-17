// Assuming CKDBQueryFilter and CKDBRecordFieldValue are defined elsewhere
import {CKDBQueryFilter, CKDBQueryFilterType, CKDBRecordFieldValue, toDouble} from "@apple/cktool.database";

class CKDBQueryFilterBuilder {
    private fieldName?: string;
    private fieldValue?: CKDBRecordFieldValue;
    private type?: CKDBQueryFilterType;
    private radiusInKilometers?: number;

    setFieldName(fieldName: string) {
        this.fieldName = fieldName;
        return this;
    }

    setFieldValue(type: string) {
        this.fieldValue = { type: type };
        return this;
    }

    setType(type: CKDBQueryFilterType) {
        this.type = type;
        return this;
    }

    setRadius(radiusInKilometers: number) {
        this.radiusInKilometers = radiusInKilometers;
        return this;
    }

    build(): CKDBQueryFilter {
        if (!this.fieldName || !this.fieldValue || !this.type) {
            throw new Error("Missing required fields to build CKDBQueryFilter");
        }

        let filter: CKDBQueryFilter = {
            fieldName: this.fieldName,
            fieldValue: this.fieldValue,
            type: this.type
        };

        // Optional field
        if (this.radiusInKilometers !== undefined) {
            filter.radiusInKilometers = toDouble(this.radiusInKilometers);
        }

        return filter;
    }
}

export default CKDBQueryFilterBuilder;
