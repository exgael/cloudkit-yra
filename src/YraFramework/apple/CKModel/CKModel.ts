// CKModel.ts
import {CKDBRecord} from "@apple/cktool.api.database/dist/types/models/CKDBRecordCodec";
import {CKDBRecordFieldValue} from "@apple/cktool.api.database/dist/types/models/CKDBRecordFieldValueCodec";
import CKRecordBuilder from "../Builders/CKRecordBuilder.ts";
import {PartialCKDBRecord} from "./PartialCKDBRecord.ts";
import {CKDBQueryFilter, CKEnvironment, CKDatabaseType, CKDBRecordResponse} from "@apple/cktool.database";
import {CKDBQuerySort} from "@apple/cktool.api.database/dist/types/models/CKDBQuerySortCodec";
import {IRecordManager, QueryFilter} from "../YraAPI/IRecordManager.ts";
import YraAPI from "../YraAPI/YraAPI.ts";
import config from "../../../../config";

export type CKDBFields = Record<string, CKDBRecordFieldValue>;

export class CKModel<F extends CKDBFields = CKDBFields> {
    #record: CKDBRecord<F>

    static #api: IRecordManager = new YraAPI({
        containerId: config.containerId,
        environment: config.environment === "DEVELOPMENT" ? CKEnvironment.DEVELOPMENT : CKEnvironment.PRODUCTION,
        databaseType: CKDatabaseType.PUBLIC,
        teamId: config.teamId,
        managementToken: config.managementToken,
        userTokenAuth: config.userTokenAuth,
        keyId: config.keyId,
        privateKeyPath: `${process.cwd()}/eckey.pem`
    }).ckWebServiceAPI;

    constructor(record: CKDBRecord<F>) {
        this.#record = record;
    }

    get fields(): F {
        return this.#record.fields;
    }

    protected static async _create<F extends CKDBFields = CKDBFields>(recordType: string, data: any): Promise<CKModel<F>> {
        const builder = new CKRecordBuilder<PartialCKDBRecord>(recordType);
        let record = builder.fromModel(data).build();
        let res = await CKModel.#api.createRecord({ record: record })
        return new CKModel<F>(res.result.record as CKDBRecord<F>)
    }

    protected static async _query<F extends CKDBFields = CKDBFields>(recordType: string, query: QueryFilter[], sorts:  CKDBQuerySort[], limit: number = 200): Promise<CKModel<F>[]> {
        let res = await CKModel.#api.queryRecords({
            recordType: recordType,
            filters: query,
            sorts: sorts,
            resultsLimit: limit
        })
        return res.result.records.map((record) => new CKModel<F>(record as CKDBRecord<F>))
    }

    static async fetch<F extends CKDBFields = CKDBFields>(recordName: string): Promise<CKModel<F>> {
        let res = await CKModel.#api.getRecord({ recordName: recordName })
        return new CKModel<F>(res.result.record as CKDBRecord<F>)
    }

    async save(): Promise<CKModel<F>> {
        let res = await CKModel.#api.updateRecord({
            recordName: this.#record.recordName,
            recordType: this.#record.recordType,
            recordChangeTag: this.#record.recordChangeTag,
            fields: this.#record.fields
        })
        return new CKModel<F>(res.result.record as CKDBRecord<F>)
    }

    async delete() {
        return await CKModel.#api.deleteRecord({
            recordName: this.#record.recordName
        })
    }
}

