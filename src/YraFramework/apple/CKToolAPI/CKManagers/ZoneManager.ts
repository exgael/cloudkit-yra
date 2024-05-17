// ZoneManager.ts
import CKToolClient from '../CKToolClient';
import {
    CKDBCreateZoneRequestBody,
    CKDBZoneResponse,
    CKDBZonesResponse
} from "@apple/cktool.database";

class ZonedManager {
    private client: CKToolClient;

    constructor(client: CKToolClient) {
        this.client = client;
    }
    /**
     * Creates a new zone in the CloudKit database.
     *
     * This method allows for the creation of a new zone specified by the provided parameters. If successful, the server returns a `CKDBZoneResponse` object containing details of the newly created zone.
     *
     * ### Usage
     * - **Zone Creation**: Provide necessary details in the `body` parameter to define the characteristics of the new zone.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 201, indicating the zone was successfully created.
     *   - `result`: A `CKDBZoneResponse` object detailing the created zone.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or in the range of 400 to 599, indicating various potential issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as the zone details, are incorrect or incomplete.
     * - **FetchError**: Thrown if there is an issue with the network request, with the request object available for further examination.
     *
     * @param zoneDetails Details of the new zone to create, structured as a `CKDBCreateZoneRequestBody`.
     * @returns A promise that resolves with the details of the newly created zone or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    async createZone(
        zoneDetails: CKDBCreateZoneRequestBody
    ): Promise<{
        statusCode: number,
        description: string,
        result: CKDBZoneResponse
    }> {
        try {
            return await this.client.api.createZone({
                ...this.client.defaultParams,
                body: zoneDetails
            });
        } catch (error) {
            console.error('Failed to create zone:', error);
            throw error;
        }
    }
    /**
     * Deletes a specific zone from the CloudKit database.
     *
     * This method removes a zone identified by `zoneName` from the specified database environment. It returns a success response if the deletion is completed without errors.
     *
     * ### Usage
     * - **Zone Deletion**: Provide the name of the zone to be deleted. This operation is irreversible and should be used with caution.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 204, indicating that the zone was successfully deleted with no content to return.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range of 400 to 599, indicating various potential issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as the zone name or environment settings, are incorrect or incomplete.
     * - **FetchError**: Thrown if there is an issue with the network request. The request object can be examined for further details.
     *
     * @param zoneName The name of the zone to be deleted.
     * @returns A promise that resolves with a success status code if the operation is successful, or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    async deleteZone(
        zoneName: string
    ): Promise<{
        statusCode: number
    }> {
        try {
            return await this.client.api.deleteZone({
                ...this.client.defaultParams,
                zoneName: zoneName
            });
        } catch (error) {
            console.error('Failed to delete zone:', error);
            throw error;
        }
    }
    /**
     * Retrieves details for a specific zone from the CloudKit database.
     *
     * This method fetches the details of a zone identified by `zoneName` from the specified database environment. If successful, it returns a `CKDBZoneResponse` object containing the details of the requested zone.
     *
     * ### Usage
     * - **Zone Retrieval**: Provide the name of the zone to retrieve its current configuration and status.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 200, indicating that the zone details were successfully retrieved.
     *   - `result`: A `CKDBZoneResponse` object detailing the retrieved zone.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range of 400 to 599, indicating various potential issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as the zone name, are incorrect or incomplete.
     * - **FetchError**: Thrown if there is an issue with the network request. The request object can be examined for further details.
     *
     * @param zoneName The name of the zone whose details are to be retrieved.
     * @returns A promise that resolves with the details of the zone or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    async getZone(
        zoneName: string
    ): Promise<{
        statusCode: number,
        description: string,
        result: CKDBZoneResponse
    }> {
        try {
            return await this.client.api.getZone({
                ...this.client.defaultParams,
                zoneName: zoneName
            });
        } catch (error) {
            console.error('Failed to retrieve zone details:', error);
            throw error;
        }
    }
    /**
     * Retrieves a collection of zones from the CloudKit database.
     *
     * This method fetches details of multiple zones from the specified database environment. If successful, it returns a `CKDBZonesResponse` object containing an array of zone details. Optionally, a continuation token can be used to paginate through large collections of zones.
     *
     * ### Usage
     * - **Pagination**: If a continuation token is provided in the response, it can be used here to fetch subsequent pages of zones.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 200, indicating that the zone details were successfully retrieved.
     *   - `result`: A `CKDBZonesResponse` object detailing the retrieved zones, potentially including a continuation token for further pagination.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range of 400 to 599, indicating various potential issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as the environment settings, are incorrect or incomplete.
     * - **FetchError**: Thrown if there is an issue with the network request. The request object can be examined for further details.
     *
     * @param continuationToken Optional. A token to continue fetching zones from where the last query stopped.
     * @returns A promise that resolves with the details of the zones or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    async getZones(
        continuationToken?: string
    ): Promise<{
        statusCode: number,
        description: string,
        result: CKDBZonesResponse
    }> {
        try {
            return await this.client.api.getZones({
                ...this.client.defaultParams,
                continuationToken: continuationToken
            });
        } catch (error) {
            console.error('Failed to retrieve zones:', error);
            throw error;
        }
    }
}

export default ZonedManager;