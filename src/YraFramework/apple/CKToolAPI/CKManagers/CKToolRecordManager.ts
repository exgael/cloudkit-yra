// RecordManager.ts
import CKToolClient from '../CKToolClient';
import {
    CKDBRecordFieldValue,
    CKDBRecordResponse,
    toInt32
} from "@apple/cktool.database";
import {
    CKDBRecord
} from "@apple/cktool.api.database/dist/types/models/CKDBRecordCodec";
import {
    CreateRecordParams,
    CreateRecordResponse,
    DeleteRecordParams,
    DeleteRecordResponse,
    DeleteRecordsByQueryParams,
    DeleteRecordsByQueryResponse,
    GetRecordParams,
    GetRecordResponse,
    IRecordManager,
    LookupRecordsParams,
    LookupRecordsResponse,
    QueryRecordChangesParams,
    QueryRecordChangesResponse,
    QueryRecordsParams,
    QueryRecordsResponse,
    UpdateRecordParams,
    UpdateRecordResponse
} from "../../YraAPI/IRecordManager";

class CKToolRecordManager implements IRecordManager {
    private client: CKToolClient;

    #defaultZoneName: string = "_defaultZone";

    constructor(client: CKToolClient) {
        this.client = client;
    }

    async createRecord(params: CreateRecordParams): Promise<CreateRecordResponse> {
        try {
            return await this.client.api.createRecord({
                ...this.client.defaultParams,
                zoneName: params.zoneName || this.#defaultZoneName,
                body: params.record
            });
        } catch (error) {
            console.error('Failed to create record:', error);
            throw error;
        }
    }

    async getRecord(params: GetRecordParams): Promise<GetRecordResponse> {
        try {
            return await this.client.api.getRecord({
                ...this.client.defaultParams,
                zoneName: params.zoneName || this.#defaultZoneName,
                recordName: params.recordName,
                requestedFields: params.requestedFields
            });
        } catch (error) {
            console.error('Failed to get record:', error);
            throw error;
        }
    }

    async deleteRecord(params: DeleteRecordParams): Promise<DeleteRecordResponse> {
        try {
            return await this.client.api.deleteRecord({
                ...this.client.defaultParams,
                zoneName: params.zoneName || this.#defaultZoneName,
                recordName: params.recordName
            });
        } catch (error) {
            console.error('Failed to delete record:', error);
            throw error;
        }
    }

    async deleteRecordsByQuery(params: DeleteRecordsByQueryParams): Promise<DeleteRecordsByQueryResponse> {
        try {
            return await this.client.api.deleteRecordsByQuery({
                ...this.client.defaultParams,
                zoneName: params.zoneName || this.#defaultZoneName,
                body: {
                    recordType: params.recordType,
                    filters: params.filters,
                    resultsLimit: toInt32(params.resultsLimit || 200)
                }
            });
        } catch (error) {
            console.error('Failed to delete records by query:', error);
            throw error;
        }
    }

    async lookupRecords(params: LookupRecordsParams): Promise<LookupRecordsResponse> {
        try {
            return await this.client.api.lookupRecords({
                ...this.client.defaultParams,
                zoneName: params.zoneName || this.#defaultZoneName,
                body: {
                    recordNames: params.recordNames
                }
            });
        } catch (error) {
            console.error('Failed to lookup records:', error);
            throw error;
        }
    }

    async queryRecordChanges(params: QueryRecordChangesParams): Promise<QueryRecordChangesResponse> {
        try {
            return await this.client.api.queryRecordChanges({
                ...this.client.defaultParams,
                zoneName: params.zoneName || this.#defaultZoneName,
                body: params.body
            });
        } catch (error) {
            console.error('Failed to query record changes:', error);
            throw error;
        }
    }

    async queryRecords(params: QueryRecordsParams): Promise<QueryRecordsResponse> {
        try {
            return await this.client.api.queryRecords({
                ...this.client.defaultParams,
                zoneName: params.zoneName || this.#defaultZoneName,
                body: {
                    query: {
                        recordType: params.recordType,
                        filters: params.filters as any,
                        sorts: params.sorts
                    },
                    resultsLimit: toInt32(params.resultsLimit || 200)
                }
            });
        } catch (error) {
            console.error('Failed to query records:', error);
            throw error;
        }
    }

    async updateRecord(params: UpdateRecordParams): Promise<UpdateRecordResponse> {
        try {
            return await this.client.api.updateRecord({
                ...this.client.defaultParams,
                zoneName: params.zoneName || this.#defaultZoneName,
                recordName: params.recordName,
                body: {
                    recordChangeTag: params.recordChangeTag,
                    recordType: params.recordType,
                    fields: params.fields
                }
            });
        } catch (error) {
            console.error('Failed to update record:', error);
            throw error;
        }
    }

    async updateRecordBy(
        record: CKDBRecord,
        fields: { [key: string]: CKDBRecordFieldValue },
        zoneName: string = this.#defaultZoneName
    ): Promise<{
        statusCode: number,
        description: string,
        result: CKDBRecordResponse
    }> {
        try {
            return await this.client.api.updateRecord({
                ...this.client.defaultParams,
                zoneName: zoneName,
                recordName: record.recordName,
                body: {
                    recordChangeTag: record.recordChangeTag,
                    recordType: record.recordType,
                    fields: fields
                }
            });
        } catch (error) {
            console.error('Failed to update record:', error);
            throw error;
        }
    }
}

export default CKToolRecordManager;