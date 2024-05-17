// DatabaseManager.ts
import CKToolClient from '../CKToolClient.ts';
import {CKDBValidateSchemaResponse, ContainersResponse, GetContainersParams} from "@apple/cktool.database";

class DatabaseManager {
    private client: CKToolClient;

    constructor(client: CKToolClient) {
        this.client = client;
    }
    /**
     * Downloads the schema of a container from the CloudKit database.
     *
     * This method retrieves the schema definition for a specified environment and container. If successful, it returns the schema in CloudKit Schema Language as a Blob.
     *
     * ### Usage
     * - **Schema Download**: Fetches the current database schema for backup or review purposes.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 200, indicating the schema was successfully retrieved.
     *   - `result`: A Blob containing the schema data.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range of 400 to 599, indicating various potential issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as the container or team identifiers, are incorrect.
     * - **FetchError**: Thrown if there is an issue with the network request. The request object can be examined for further details.
     *
     * @returns A promise that resolves with the schema data as a Blob or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    async exportSchema(): Promise<{
        statusCode: 200,
        description: string,
        result: Blob
    }> {
        try {
            return await this.client.api.exportSchema({
                ...this.client.defaultParams
            });
        } catch (error) {
            console.error('Failed to download schema:', error);
            throw error;
        }
    }
    /**
     * Uploads a new schema file to define or update the schema for a specified CloudKit container.
     *
     * This method uploads a schema file in the CloudKit Schema Language to update the container's schema. This operation is typically used in a development environment. If successful, the server acknowledges the update without returning any object.
     *
     * ### Usage
     * - **Schema Upload**: Use this method to upload a new schema file to modify or define the database schema.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 202, indicating the schema was accepted for processing.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range of 400 to 599, indicating issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as the file format or container identifiers, are incorrect.
     * - **FetchError**: Thrown if there is a problem with the network request. The request object can be examined for further details.
     *
     * @param file A `File` object containing the new schema in CloudKit Schema Language.
     * @returns A promise that resolves with the status code of the operation or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    async importSchema(
        file: File
    ): Promise<{
        statusCode: 202
    }> {
        try {
            return await this.client.api.importSchema({
                ...this.client.defaultParams,
                file: file
            });
        } catch (error) {
            console.error('Failed to upload schema:', error);
            throw error;
        }
    }
    /**
     * Fetches containers associated with a specific team in the CloudKit database.
     *
     * This method retrieves a list of containers for a given team, with optional parameters for filtering, sorting, and pagination. It supports both forward and backward pagination through `startingAfterKey` and `endingBeforeKey`.
     *
     * ### Usage
     * - **List Containers**: Fetches a list of containers, optionally applying filters such as visibility, sort order, or search queries.
     * - **Pagination**: Utilize `startingAfterKey` or `endingBeforeKey` to navigate through large lists of containers.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 200, indicating successful retrieval.
     *   - `result`: A `ContainersResponse` object detailing the fetched containers.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range of 400 to 599, indicating issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as pagination keys or team identifier, are incorrect.
     * - **FetchError**: Thrown if there is an issue with the network request. The request object can be examined for further details.
     *
     * @param options An object containing optional parameters for limit, pagination, sort, and filtering.
     * @returns A promise that resolves with the containers data or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    async getContainers(
        options: GetContainersParams
    ): Promise<{
        statusCode: 200,
        description: string,
        result: ContainersResponse
    }> {
        try {
            return await this.client.api.getContainers({
                ...this.client.defaultParams,
                ...options
            });
        } catch ( error ) {
            console.error('Failed to fetch containers:', error);
            throw error;
        }
    }
    /**
     * Resets the configuration of a specified CloudKit container to match the production environment.
     *
     * This method is used to revert any development configuration changes back to the production configuration for the specified container. This operation is crucial for maintaining consistency between development tests and production conditions.
     *
     * ### Usage
     * - **Configuration Reset**: Useful for scenarios where the development changes need to be discarded to revert back to stable production settings.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 202, indicating the configuration reset was accepted for processing.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range of 400 to 599, indicating issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as the container identifier or team ID, are incorrect.
     * - **FetchError**: Thrown if there is an issue with the network request. The request object can be examined for further details.
     *
     * @returns A promise that resolves with the status code of the operation or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    async resetConfigToProduction(): Promise<{
        statusCode: 202
    }> {
        try {
            return await this.client.api.resetConfigToProduction({
                ...this.client.defaultParams
            });
        } catch (error) {
            console.error('Failed to reset container configuration to production:', error);
            throw error;
        }
    }
    /**
     * Resets the schema of the specified environment to its production configuration.
     *
     * This method resets the schema of a given container within the specified environment back to its production settings. This can be crucial for reverting experimental or developmental changes to ensure stability in production environments.
     *
     * ### Usage
     * - **Schema Reset**: Useful for reverting the environment schema back to the production standard after testing or development phases.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 202, indicating the reset request was accepted for processing.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range of 400 to 599, indicating issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as the environment settings, container identifier, or team ID, are incorrect.
     * - **FetchError**: Thrown if there is an issue with the network request. The request object can be examined for further details.
     *
     * @returns A promise that resolves with the status code of the operation or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    async resetToProduction(): Promise<{
        statusCode: 202,
        description: string
    }> {
        try {
            return await this.client.api.resetToProduction({
                ...this.client.defaultParams
            });
        } catch (error) {
            console.error('Failed to reset schema to production:', error);
            throw error;
        }
    }
    /**
     * Validates the uploaded schema file for a specified container in the CloudKit database.
     *
     * This method uploads a schema file and validates it against the container's current configuration. It checks for syntax correctness and compatibility with the CloudKit Schema Language. If successful, it returns details about the validation process.
     *
     * ### Usage
     * - **Schema Validation**: Useful for verifying schema changes before applying them to the production environment.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 200, indicating successful validation.
     *   - `result`: A `CKDBValidateSchemaResponse` object detailing the validation outcome.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range of 400 to 599, indicating various potential issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as the schema file or container settings, are incorrect.
     * - **FetchError**: Thrown if there is a problem with the network request. The request object can be examined for further details.
     *
     * @param file A `File` object containing the schema in CloudKit Schema Language.
     * @returns A promise that resolves with the validation results or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    async validateSchema(
        file: File
    ): Promise<{
        statusCode: 200,
        description: string,
        result: CKDBValidateSchemaResponse
    }> {
        try {
            return await this.client.api.validateSchema({
                ...this.client.defaultParams,
                file: file,
            });
        } catch (error) {
            console.error('Failed to validate schema:', error);
            throw error;
        }
    }
}

export default DatabaseManager;