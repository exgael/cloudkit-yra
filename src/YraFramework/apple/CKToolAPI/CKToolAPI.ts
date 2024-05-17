// CloudKitAPI.ts
import CKToolClient, {CKToolClientInitParams} from './CKToolClient.ts';
import CKToolRecordManager from './CKManagers/CKToolRecordManager.ts';
import ZoneManager from "./CKManagers/ZoneManager.ts";
import DatabaseManager from "./CKManagers/DatabaseManager.ts";

// For importation and exportation
import fs from "fs/promises";
import { File } from "@apple/cktool.target.nodejs";
import path from "path";
import CKToolAssetManager from "./CKManagers/CKToolAssetManager.ts";

class CKToolAPI {
    private readonly client: CKToolClient;
    private readonly recordManager: CKToolRecordManager;
    private readonly zoneManager: ZoneManager;
    private readonly databaseManager: DatabaseManager;
    private readonly assetManager: CKToolAssetManager;

    constructor(initParams: CKToolClientInitParams) {
        this.client = new CKToolClient(initParams);
        this.recordManager = new CKToolRecordManager(this.client);
        this.zoneManager = new ZoneManager(this.client);
        this.databaseManager = new DatabaseManager(this.client);
        this.assetManager = new CKToolAssetManager(this.client);
    }

    get recordOp() {
        return this.recordManager;
    }

    get zoneOp() {
        return this.zoneManager;
    }

    get databaseOp() {
        return this.databaseManager;
    }

    get assetOp() {
        return this.assetManager;
    }

    async validateSchema(fileName: string) {
        try {
            const srcPath = path.join(process.cwd(), fileName);
            const buffer = await fs.readFile(srcPath);
            const file = new File([buffer], fileName);
            return await this.databaseOp.validateSchema(file)
        } catch (ex) {
            console.error("Failed to validate schema:", ex);
        }
    }

    // Uploads a new schema file to define or update the schema for a specified CloudKit container.
    async importSchema(fileName: string) {
        try {
            // FYI - process.cwd(), return the root of the project ( since process started there ).
            const srcPath = path.join(process.cwd(), fileName);
            const buffer = await fs.readFile(srcPath);
            const file = new File([buffer], fileName);
            await this.databaseOp.importSchema(file);
            console.log("Schema imported successfully.");
        } catch (ex) {
            console.error("Failed to import schema:", ex);
        }
    }

    // Downloads the schema of a container from the CloudKit database.
    async exportSchema(fileName: string) {
        try {
            const response = await this.databaseOp.exportSchema();
            const destPath = path.join(process.cwd(), fileName);
            const arrayBuffer = await response.result.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            await fs.writeFile(destPath, buffer);
            console.log("Schema exported to", destPath);
        } catch (ex) {
            console.error("Failed to export schema:", ex);
        }
    }
}

export default CKToolAPI;
