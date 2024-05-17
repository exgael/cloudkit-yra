// CloudKitClient.ts
import { createConfiguration } from "@apple/cktool.target.nodejs";
import {CKDatabaseType, CKEnvironment, PromisesApi} from "@apple/cktool.database";

interface ICloudKitDefaults {
    teamId: string;
    containerId: string;
    environment: CKEnvironment;
    databaseType: CKDatabaseType
}

export interface CKToolClientInitParams {
    containerId: string;
    databaseType: CKDatabaseType;
    environment: CKEnvironment;
    teamId: string;
    managementToken: string;
    userTokenAuth?: string;
}

class CKToolClient {

    readonly #api: PromisesApi;
    readonly #defaultParams: ICloudKitDefaults;

    constructor(initParams: CKToolClientInitParams) {

        this.#api = new PromisesApi({
            configuration: createConfiguration(),
            security: {
                "ManagementTokenAuth": initParams.managementToken,
                "UserTokenAuth": initParams.userTokenAuth
            }
        });

        // Set up the default parameters object
        this.#defaultParams = {
            teamId: initParams.teamId,
            containerId: initParams.containerId,
            environment:initParams.environment,
            databaseType: initParams.databaseType
        };
    }

    get api() {
        return this.#api;
    }

    get defaultParams() {
        return this.#defaultParams;
    }
}

export default CKToolClient;
