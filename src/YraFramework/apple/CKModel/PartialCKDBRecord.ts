
// PartialCKDBRecord.ts
import {CKDBRecord} from "@apple/cktool.api.database/dist/types/models/CKDBRecordCodec";

export type PartialCKDBRecord = Pick<CKDBRecord, 'recordType' | 'fields'>;
