import CKToolClient from "../CKToolClient.ts";
import {CKDBAssetUploadUrlResponse, CKDBCreateAssetUploadUrlRequestBody} from "@apple/cktool.database";

class CKToolAssetManager {
    private client: CKToolClient;

    #defaultZoneName: string = "_defaultZone";

    constructor(client: CKToolClient) {
        this.client = client;
    }

    async createAssetUploadUrl(
        body: CKDBCreateAssetUploadUrlRequestBody
    ):  Promise<{
        statusCode: 201,
        description: string,
        result: CKDBAssetUploadUrlResponse
    }> {
        try {
            return await this.client.api.createAssetUploadUrl({
                ...this.client.defaultParams,
                zoneName: this.#defaultZoneName,
                body: body
            });
        } catch (error) {
            console.error('Failed to create record:', error);
            throw error;
        }
    }
}

export default CKToolAssetManager;
