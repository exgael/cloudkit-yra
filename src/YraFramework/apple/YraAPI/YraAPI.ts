import CKToolAPI from "../CKToolAPI/CKToolAPI";
import {CKDatabaseType, CKEnvironment} from "@apple/cktool.database";
import {CKToolClientInitParams} from "../CKToolAPI/CKToolClient";
import {CKModel} from "../CKModel/CKModel";

export interface YraInitParams {

    // General InitParams
    containerId: string;
    environment: CKEnvironment;
    databaseType: CKDatabaseType;

    // CKToolClient InitParams
    teamId: string;
    managementToken: string;
    userTokenAuth?: string;
}

class YraAPI {
    ckToolAPI: CKToolAPI;

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
        CKModel.setRecordManager(this.ckToolAPI.recordOp);
    }
}

export default YraAPI;
