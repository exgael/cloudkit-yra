import fs from 'fs'
import {SignService} from "./sign";
import {RequestService} from "./request";
import {UrlBuilder} from "./url";
import {CKDatabaseType, CKDBQuerySortOrder, CKDBRecordResponse, CKEnvironment, toInt64} from "@apple/cktool.database";
import {CKDBFields} from "../CKModel/CKModel";
import {CKDBRecord} from "@apple/cktool.api.database/dist/types/models/CKDBRecordCodec";
import {CKWebServiceRecordResponse} from "./CKWebServiceRecordResponse";
import {
    CreateRecordParams,
    CreateRecordResponse,
    DeleteRecordParams,
    DeleteRecordResponse, DeleteRecordsByQueryParams,
    DeleteRecordsByQueryResponse,
    GetRecordParams,
    GetRecordResponse,
    IRecordManager, LookupRecordsParams,
    LookupRecordsResponse, QueryRecordChangesParams,
    QueryRecordChangesResponse, QueryRecordsParams,
    QueryRecordsResponse,
    UpdateRecordParams,
    UpdateRecordResponse
} from "../YraAPI/IRecordManager";

enum OperationType  {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    FORCE_UPDATE = "forceUpdate",
    FORCE_DELETE = "forceDelete"
}

export interface CKWebServiceInitParams {
    containerId: string;
    keyId: string;
    privateKeyPath?: string;
    privateKeyContents?: Buffer;
    environment: CKEnvironment;
    databaseType: CKDatabaseType;
}

// Create fields with factory functions.

const {
    makeRecordFieldValue
} = require("@apple/cktool.database");

const value3 = makeRecordFieldValue.int64(2007);

export class CKWebServiceAPI implements IRecordManager {
    protected readonly requestService: RequestService
    protected readonly urlBuilder: UrlBuilder

    #defaultZoneName: string = "_defaultZone";

    constructor(initParams: CKWebServiceInitParams) {
        if (!initParams.privateKeyContents && !initParams.privateKeyPath) {
            throw new Error("You must specify either privateKeyPath or privateKeyContents")
        }

        const signService = new SignService(
            initParams.privateKeyContents || fs.readFileSync(initParams.privateKeyPath!),
            initParams.keyId
        )

        this.requestService = new RequestService(signService)

        this.urlBuilder = new UrlBuilder(
            initParams.containerId,
            initParams.environment,
            initParams.databaseType
        )
    }

    async createRecord(params: CreateRecordParams): Promise<CreateRecordResponse> {

        const recordPayload = {
            operations: [{
                operationType: OperationType.CREATE,
                record: {
                    recordType: params.record.recordType,
                    fields:  params.record.fields,
                }
            }]
        }

        let res = await this.requestService.makeRequest(
            this.urlBuilder.getModifyRecordsPath(),
            recordPayload
        ) as CKWebServiceRecordResponse

        if (res.records.length != 1) {
            throw new Error("No record found")
        }

        // Safe
        let ckdbRecord = res.records.pop() as CKDBRecord

        return {
            statusCode: 201,
            description: "The record was created successfully",
            result: {record: ckdbRecord}
        }
    }

    async getRecord(params: GetRecordParams): Promise<GetRecordResponse> {

        // https://developer.apple.com/library/archive/documentation/DataManagement/Conceptual/CloudKitWebServicesReference/QueryingRecords.html#//apple_ref/doc/uid/TP40015240-CH5-SW4
        let payload = {
            zoneID: {
                zoneName: params.zoneName || this.#defaultZoneName
            },
            resultsLimit: 200,
            records: {
                recordName: params.recordName,
                desiredKeys: params.requestedFields
            },
            zoneWide: false,
        }

        let res = await this.requestService.makeRequest(
            this.urlBuilder.getLookupRecordsPath(),
            payload
        ) as CKWebServiceRecordResponse

        if (res.records.length != 1) {
            throw new Error("No record found")
        }

         // Safe
        let ckdbRecord = res.records.pop() as CKDBRecord

        console.log(`YraAPI - Get operation -Insights :\n ${res}`)

        return {
            statusCode: 200,
            description: "Fetched record successfully.",
            result: {
                record: ckdbRecord
            }
        }
    }

    async queryRecords(params: QueryRecordsParams): Promise<QueryRecordsResponse> {

        let convertedFilters = params.filters.map((filter) => {
            return {
                comparator: filter.type,
                fieldName: filter.fieldName,
                fieldValue: filter.fieldValue
            }
        })

        let convertedSorts = params.sorts.map((sort) => {
            let isAscending = sort.order === CKDBQuerySortOrder.ASC
            return {
                fieldName: sort.fieldName,
                ascending: isAscending
            }
        })

        const payload = {
           zoneID: {
               zoneName: params.zoneName || this.#defaultZoneName
           },
            query: {
                recordType: params.recordType,
                filterBy: convertedFilters,
                sortBy: convertedSorts
            },
        }

        let res = await this.requestService.makeRequest(
            this.urlBuilder.getQueryRecordsPath(),
            payload
        ) as CKWebServiceRecordResponse

        console.log(res)

        return {
            statusCode: 200,
            description: "Queried record successfully.",
            result: {
                records: res.records
            }
        }
    }

    private convertType(type: string) {
        switch (type) {
            case "string":
                return "STRING"
            case "Int64Type":
                return "INT64"
            case "boolean":
                return "BOOLEAN"
            case "object":
                return "REFERENCE"
            default:
                return "STRING"
        }
    }

    async updateRecord(params: UpdateRecordParams): Promise<UpdateRecordResponse> {
        const payload = {
            operations: [{
                operationType: OperationType.UPDATE,
                record: {
                    recordName: params.recordName,
                    recordType: params.recordType,
                    recordChangeTag: params.recordChangeTag,
                    fields: params.fields
                }
            }]
        }

        let res = await this.requestService.makeRequest(
            this.urlBuilder.getLookupRecordsPath(),
            payload
        ) as CKWebServiceRecordResponse

        if (res.records.length != 1) {
            throw new Error("No record found")
        }

        // Safe
        let ckdbRecord = res.records.pop() as CKDBRecord

        return {
            statusCode: 200,
            description: "Updated record successfully.",
            result: {
                record: ckdbRecord
            }
        }
    }

    async deleteRecord(params: DeleteRecordParams): Promise<DeleteRecordResponse> {
        const payload = {
            operations: [{
                operationType: OperationType.DELETE,
                record: {
                    recordName: params.recordName,
                }
            }]
        }

        let res = await this.requestService.makeRequest(
            this.urlBuilder.getLookupRecordsPath(),
            payload
        )

        console.log(`YraAPI - Delete operation -Insights :\n ${res}`)

        return {
            statusCode: 204,
            description: "Updated record successfully."
        }
    }

    deleteRecordsByQuery(params: DeleteRecordsByQueryParams): Promise<DeleteRecordsByQueryResponse> {
        throw new Error("deleteRecordsByQuery - not implemented")
    }

    lookupRecords(params: LookupRecordsParams): Promise<LookupRecordsResponse> {
        throw new Error("lookupRecords - not implemented")
    }

    queryRecordChanges(params: QueryRecordChangesParams): Promise<QueryRecordChangesResponse> {
        throw new Error("queryRecordChanges - not implemented")
    }

    // public async createRecords(records: CreateRecordOptions[]) {
    //     const payload = JSON.stringify({
    //         operations: records.map(record => ({
    //             operationType: OperationType.CREATE,
    //             record: {
    //                 recordType: record.recordType,
    //                 fields: record.fields,
    //                 recordName: record.recordName,
    //             }
    //         }))
    //     })
    //
    //     return this.requestService.makeRequest(
    //         this.urlBuilder.getModifyRecordsPath(),
    //         payload
    //     )
    // }

    // public async uploadAssetFromUrl(recordType: string, fieldName: string, fileUrl: string, recordName: string) {
    //     // Download the asset from fileUrl
    //     const buffer = await (await fetch(fileUrl)).blob()
    //
    //     return this.uploadAsset(
    //         recordType,
    //         fieldName,
    //         buffer,
    //         recordName
    //     )
    // }

    // public async uploadAsset(recordType: string, fieldName: string, fileContents: Blob, recordName: string) {
    //     const payload = JSON.stringify({
    //         tokens: [{
    //             recordName,
    //             recordType,
    //             fieldName
    //         }]
    //     })
    //
    //     const resp = await this.requestService.makeRequest(
    //         this.urlBuilder.getUploadAssetsPath(),
    //         payload
    //     )
    //
    //     const uploadUrl = (resp as any).tokens[0].url
    //
    //     const assetResp = await fetch(uploadUrl, {
    //         method: "POST",
    //         body: fileContents
    //     })
    //
    //     const imageResp = await assetResp.json()
    //
    //     // Now we need to update the record with the asset
    //     return this.updateRecord(
    //         recordName,
    //         recordType,
    //         {
    //             [fieldName]: {
    //                 value: imageResp.singleFile
    //             }
    //         }
    //     )
    // }

    // public async forceUpdateRecord(recordName: string, recordType: string, fields: { [index in string]: any }) {
    //     const payload = JSON.stringify({
    //         operations: [{
    //             operationType: "forceUpdate",
    //             record: {
    //                 recordName,
    //                 recordType,
    //                 fields
    //             }
    //         }]
    //     })
    //
    //     return this.requestService.makeRequest(
    //         this.urlBuilder.getModifyRecordsPath(),
    //         payload
    //     )
    // }

    // public async forceDeleteRecord(deleteRecordOptions: DeleteRecordOptions) {
    //     const payload = JSON.stringify({
    //         operations: [{
    //             operationType: "forceDelete",
    //             record: {
    //                 recordName: deleteRecordOptions.recordName,
    //                 recordType: deleteRecordOptions.recordType,
    //             }
    //         }]
    //     })
    //
    //     return this.requestService.makeRequest(
    //         this.urlBuilder.getModifyRecordsPath(),
    //         payload
    //     )
    // }

    // public async forceDeleteRecords(recordType: string, recordNames: string[]) {
    //     const payload = JSON.stringify({
    //         operations: recordNames.map(recordName => ({
    //             operationType: "forceDelete",
    //             record: {
    //                 recordName,
    //                 recordType,
    //             }
    //         }))
    //     })
    //
    //     return this.requestService.makeRequest(
    //         this.urlBuilder.getModifyRecordsPath(),
    //         payload
    //     )
    // }

    // public async saveRecord(recordName: string, recordType: string, recordChangeTag: string, fields: CKDBFields): Promise<CKDBRecordResponse> {
    //     let payload = {
    //         operations: [{
    //             operationType: "update",
    //             record: {
    //                 recordName,
    //                 recordType,
    //                 recordChangeTag,
    //                 fields
    //             }
    //         }]
    //     }
    //
    //     let res = await this.requestService.makeRequest(
    //         this.urlBuilder.getModifyRecordsPath(),
    //         payload
    //     ) as YraRecordResponse
    //
    //     if (res.records.length != 1) {
    //         throw new Error("No record found")
    //     }
    //
    //     // Safe
    //     return {
    //         record: res.records.pop() as CKDBRecord
    //     } as CKDBRecordResponse
    // }
}


// export interface SortBy {
//     fieldName: string;
//     ascending: boolean;
// }
//
// export interface QueryFilter {
//     comparator: string;
//     fieldName: string;
//     fieldValue: any;
// }
//
// export interface FilterBy {
//     comparator: string;
//     fieldName: string;
//     fieldValue: any;
// }
//
// export interface QueryDictionary {
//     recordType: string;
//     filterBy?: FilterBy;
//     sortBy?: SortBy;
//     resultsLimit?: number;
//     desiredKeys?: string[];
//     zoneID?: string;
//     zoneWide?: boolean;
//     cursor?: string;
//     queryFilters?: QueryFilter[];
// }
//
// export interface QueryRecordOptions {
//     zoneID?: string;
//     resultsLimit?: number;
//     query: QueryDictionary;
//     continuationMarker?: string;
//     desiredKeys?: string[];
//     zoneWide?: boolean;
//     numbersAsStrings?: boolean;
// }
//
// export interface CreateRecordOptions {
//     recordName?: string
//     recordType: string;
//     recordChangeTag?: string;
//     fields: CKDBFields
// }
//
// export interface DeleteRecordOptions {
//     recordName: string
//     recordType: string;
//     recordChangeTag: string;
// }

// let a: CKDBRecord