import {CKDatabaseType, CKEnvironment} from "@apple/cktool.database";

export class UrlBuilder {
    readonly #versionNumber = 1
    readonly #containerName: string
    readonly #environment: CKEnvironment
    readonly #database: CKDatabaseType

    constructor(containerId: string, environment: CKEnvironment, databaseType: CKDatabaseType) {
        this.#containerName = containerId
        this.#environment = environment
        this.#database = databaseType
    }

    #getBasePath() {
        return [
            `/database`,
            this.#versionNumber,
            this.#containerName,
            this.#environment.toLowerCase(),
            this.#database.toLowerCase()
        ].join('/')
    }

    public getModifyRecordsPath() {
        return `${this.#getBasePath()}/records/modify`
    }

    public getQueryRecordsPath() {
        return `${this.#getBasePath()}/records/query`
    }

    public getLookupRecordsPath() {
        return `${this.#getBasePath()}/records/lookup`
    }

    public getResolveRecordsPath() {
        return `${this.#getBasePath()}/records/resolve`
    }

    public getShareAcceptPath() {
        return `${this.#getBasePath()}/records/shares/accept`
    }

    public getUploadAssetsPath() {
        return `${this.#getBasePath()}/assets/upload`
    }
}