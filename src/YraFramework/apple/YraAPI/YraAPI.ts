import CKToolAPI from "../CKToolAPI/CKToolAPI";
import {CKWebServiceAPI, CKWebServiceInitParams} from "../CKWebServiceAPI/CKWebServiceAPI";
import {CKDatabaseType, CKEnvironment} from "@apple/cktool.database";
import {CKToolClientInitParams} from "../CKToolAPI/CKToolClient";

export interface YraInitParams {

    // General InitParams
    containerId: string;
    environment: CKEnvironment;
    databaseType: CKDatabaseType;

    // CKToolClient InitParams
    teamId: string;
    managementToken: string;
    userTokenAuth?: string;

    // CKWebServiceAPI InitParams
    keyId: string;
    privateKeyPath?: string;
    privateKeyContents?: Buffer;
}

class YraAPI {
    ckToolAPI: CKToolAPI;
    ckWebServiceAPI: CKWebServiceAPI;

    constructor(initParams: YraInitParams) {
        let ckToolClientInitParams: CKToolClientInitParams = {
            containerId: initParams.containerId,
            databaseType: initParams.databaseType,
            environment: initParams.environment,
            teamId: initParams.teamId,
            managementToken: initParams.managementToken,
            userTokenAuth: initParams.userTokenAuth
        };
        this.ckToolAPI = new CKToolAPI(ckToolClientInitParams);

        let ckWebServiceAPIInitParams: CKWebServiceInitParams = {
            containerId: initParams.containerId,
            keyId: initParams.keyId,
            privateKeyPath: initParams.privateKeyPath,
            privateKeyContents: initParams.privateKeyContents,
            environment: initParams.environment,
            databaseType: initParams.databaseType
        }
        this.ckWebServiceAPI = new CKWebServiceAPI(ckWebServiceAPIInitParams);
    }
}

export default YraAPI;
