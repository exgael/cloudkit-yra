import {
    PartialCKDBRecord
} from "../CKModel/PartialCKDBRecord.ts";
import {
    CKDBLookupRecordsResponse,
    CKDBPagedBatchDeleteResponse,
    CKDBQueryFilter,
    CKDBQuerySort, CKDBRecordChangesRequestBody, CKDBRecordChangesResponse,
    CKDBRecordResponse,
    CKDBRecordsResponse
} from "@apple/cktool.database";
import {
    CKDBRecordFieldValue
} from "@apple/cktool.api.database/dist/types/models/CKDBRecordFieldValueCodec";

export interface IRecordManager {

    /**
     * Creates a new record in the specified CloudKit database zone.
     *
     * This method facilitates the creation of a record with detailed attributes specified in the `record` parameter. If the `recordName` property is omitted within the `record` body, the server automatically assigns a UUID to the record. If the record type includes `assetType` fields, assets must be uploaded prior to record creation using the `createAssetUploadUrl` operation. For shared records, setting the `createShortGuid` property to `true` ensures the creation of a globally unique identifier that the server uses when a share participant accepts the shared record.
     *
     * ### Usage
     * - **Standard Record Creation**: Simply pass the record details without a `recordName` to have a UUID assigned automatically.
     * - **Asset Inclusion**: Ensure assets are uploaded prior to record submission if `assetType` fields are involved.
     * - **Shared Records**: Set `createShortGuid` to `true` for records that will be shared.
     *
     * ### Error Handling
     * - **ValidationError**: Thrown if the input parameters to the method are incorrect.
     * - **DocumentedResponseError**: Thrown if the server returns any HTTP status code in the range of 400 to 599 that is not specifically handled.
     * - **FetchError**: Thrown if there is an issue with the network request, with a reference to the request object available for examination.
     *
     * @param record The `ICKRecord` object containing the details of the new record, structured according to the CloudKit's expected format.
     * @param zoneName Optional. Specifies the database zone name where the record should be created. Defaults to the client's default zone if not specified.
     * @returns A promise that, when successful, resolves with an object containing:
     * - `statusCode`: HTTP status code 201, indicating successful creation.
     * - `description`: A descriptive message about the operation result.
     * - `result`: A `CKDBRecordResponse` object detailing the newly created record.
     * If the operation fails, the promise rejects with an error detailing the issue.
     * @throws {Error} Captures any errors related to the operation, enhancing traceability and debuggability.
     */
    createRecord(params: CreateRecordParams): Promise<CreateRecordResponse>;
    /**
     * Retrieves detailed information about a specified record from the CloudKit database.
     * This method allows for granular control over the returned data through the `requestedFields` parameter.
     *
     * ### Usage
     * - **All Fields**: Omit `requestedFields` to retrieve all fields of the record.
     * - **Specific Fields**: Provide an array of field names in `requestedFields` to retrieve specific fields.
     * - **No Field Values**: Set `requestedFields` to an empty array to fetch only the metadata of the record without any field values.
     *
     * ### Responses
     * - If successful, the method returns a `CKDBRecordResponse` object containing the requested record details. The response includes:
     *   - `statusCode`: HTTP status code 200, indicating successful retrieval.
     *   - `description`: A descriptive message about the operation result.
     *   - `result`: A `CKDBRecordResponse` object detailing the fetched record.
     * - The server only includes fields in the response that are specified in the `requestedFields` array.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range 400 to 599 but not documented specifically.
     * - **ValidationError**: Thrown if the input parameters to the method are incorrect.
     * - **FetchError**: Thrown if there is an issue with the network request, with a reference to the request object available for examination.
     *
     * @param recordName The unique name of the record to retrieve.
     * @param requestedFields Optional array of strings specifying which fields to return in the response. If undefined, all fields are returned.
     * @param zoneName Optional zone name within the database from which the record should be retrieved. Defaults to "_defaultZone" if not specified.
     * @returns A promise that, when resolved, provides a detailed response including the status code, a description of the operation, and the record details, or rejects with an error if the operation fails.
     * @throws {Error} Captures any errors related to the operation, enhancing traceability and debuggability.
     */
    getRecord(params: GetRecordParams): Promise<GetRecordResponse>;
    /**
     * Deletes a single record from the specified zone in the CloudKit database.
     *
     * This method attempts to delete a record identified by its unique name. If the operation is successful, the server returns a response indicating the deletion was executed without errors. The method returns a promise that resolves with the response from the server, including any relevant status codes and messages.
     *
     * ### Usage
     * - **Direct Deletion**: Call this method with the record's unique name and, optionally, a specific zone name to delete the record.
     * - **Handling Responses**: The server's response includes a status code that indicates the success or failure of the delete operation.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the server returns an HTTP status code in the range of 400 to 599, indicating various potential errors, including the record not found or access issues.
     * - **FetchError**: Thrown if there is an issue with the network request, with the ability to examine the underlying cause via the request object.
     * - **ValidationError**: Thrown if the input parameters, such as the record name or zone name, are incorrect.
     *
     * @param recordName The unique name of the record to be deleted.
     * @param zoneName Optional. Specifies the database zone from which the record should be deleted. Defaults to the client's default zone if not specified.
     * @returns A promise that, when resolved, provides a detailed response from the server, including status codes and any additional metadata about the deletion process. If the operation fails, the promise rejects with an error detailing the issue encountered.
     * @throws {Error} Represents errors that occurred during the operation, including detailed information for debugging and error handling.
     */
    deleteRecord(params: DeleteRecordParams): Promise<DeleteRecordResponse>;
    /**
     * Deletes records of a specified type that match the provided query filters in the given CloudKit database zone.
     *
     * This operation allows you to delete multiple records of a particular type that match specific filters. If the operation completes successfully, the server returns a `CKDBPagedBatchDeleteResponse` object that details the result of the batch delete operation. The `resultsLimit` parameter ensures that no more than 200 records are deleted in a single operation. If the query matches more records than this limit, the response contains a continuation token to proceed with the next batch of deletions.
     *
     * ### Usage
     * - **Batch Deletion**: Specify the `recordType` and an array of `filters` to identify which records should be deleted.
     * - **Limit Results**: Ensure the `resultsLimit` is set to 200 or less to avoid errors, as CloudKit only allows up to 200 deletions per batch.
     * - **Continuation Token**: If more records match than the specified limit, use the continuation token from the response to delete the next batch.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is in the range of 400 to 599, or other issues such as lack of permissions or invalid queries occur.
     * - **ValidationError**: Thrown if the `resultsLimit` is greater than 200 or if other input parameters are incorrect.
     * - **FetchError**: Thrown if there is a network request problem, with references available for debugging.
     *
     * @param recordType The type of records to be deleted.
     * @param filters An array of `CKDBQueryFilter` objects that specify the criteria for deleting records.
     * @param resultsLimit The maximum number of records to be deleted in a single operation. Must not exceed 200.
     * @param zoneName Optional. Specifies the database zone from which the records should be deleted. Defaults to the client's default zone if not specified.
     * @returns A promise that, when resolved, provides:
     * - `statusCode`: HTTP status code 200, indicating a successful operation.
     * - `description`: Descriptive text summarizing the batch delete result.
     * - `result`: A `CKDBPagedBatchDeleteResponse` object detailing the records deleted and containing any continuation token for further deletions.
     * If the operation fails, the promise rejects with an error detailing the encountered issue.
     * @throws {Error} Captures any errors related to the operation, providing context for debugging and handling.
     */
    deleteRecordsByQuery(params: DeleteRecordsByQueryParams): Promise<DeleteRecordsByQueryResponse>;
    /**
     * Fetches multiple records by their names from the specified zone in the CloudKit database.
     *
     * This method retrieves an array of records specified by their names. If successful, the server returns a `CKDBLookupRecordsResponse` object containing an array of `CKDBRecordResult` objects. These results can indicate existing records, deleted records, or errors associated with specific records.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: If the HTTP status code is in the range of 400 to 599 and not specifically handled otherwise.
     * - **ValidationError**: If input parameters are incorrect, such as invalid record names or incorrect zone configuration.
     * - **FetchError**: If there is an issue with the network request. The underlying request object can be examined for more details.
     *
     * @param recordNames Array of string names of the records to look up.
     * @param zoneName Optional. The database zone name from which the records should be fetched. Defaults to the client's default zone if not specified.
     * @returns A promise that resolves to a `CKDBLookupRecordsResponse` detailing the results of the fetch operation or rejects with an error if the operation fails.
     * @throws {Error} Captures any errors related to the operation, including details for debugging and error handling.
     */
    lookupRecords(params: LookupRecordsParams): Promise<LookupRecordsResponse>;
    /**
     * Returns records that have changed since a specified sync token or since a zone was created.
     *
     * This method is used to fetch changes to records within a specified zone, helping to synchronize local data stores with the server. It can return records that are newly created, updated, or deleted since the last sync token was issued or since the zone's creation if no token is provided.
     *
     * ### Usage
     * - **Initial Sync**: If no sync token is provided, all records from the zone creation are considered.
     * - **Incremental Sync**: Providing a sync token retrieves only records that have changed since that token was issued.
     *
     * ### Responses
     * - If successful, the method returns a `CKDBRecordChangesResponse` object containing an array of `CKDBRecordResult` objects, each representing a record's current state (existing, deleted, or error).
     *   - `statusCode`: HTTP status code 200, indicating successful retrieval.
     *   - `description`: A descriptive message about the operation result.
     *   - `result`: Detailed data about each record's changes, including any errors encountered.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it is in the range 400 to 599 but not specifically handled.
     * - **ValidationError**: Thrown if input parameters, such as the sync token or zone name, are incorrect.
     * - **FetchError**: Thrown if there is an issue with the network request, with a reference to the request object available for examination.
     *
     * @param body The `CKDBRecordChangesRequestBody` object containing details for the record changes query.
     * @param zoneName Optional. Specifies the database zone from which to fetch record changes. Defaults to the client's default zone if not specified.
     * @returns A promise that, when resolved, provides a detailed response including the status code, a description of the operation, and detailed results of the record changes, or rejects with an error if the operation fails.
     * @throws {Error} Captures any errors related to the operation, enhancing traceability and debuggability.
     */
       queryRecordChanges(params: QueryRecordChangesParams): Promise<QueryRecordChangesResponse>;
    /**
     * Fetches a collection of records from the CloudKit database based on a specified query.
     *
     * This method constructs a query using the `recordType`, `filters`, and a `resultsLimit` to fetch records from the specified database zone. If successful, it returns a `CKDBRecordsResponse` object containing an array of records.
     *
     * ### Usage
     * - **Query Setup**: Define the query by specifying record types, conditions in `filters`, and how many results to return.
     * - **Handling Responses**: On success, the method returns a collection of records, potentially including continuation tokens for paging if more records match the query than the `resultsLimit`.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 200, indicating successful retrieval.
     *   - `description`: A descriptive message about the operation result.
     *   - `result`: A `CKDBRecordsResponse` object detailing the fetched records.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421 or in the range of 400 to 599, indicating various potential issues such as authentication required or request errors.
     * - **ValidationError**: Thrown if the input parameters, such as the `resultsLimit` or `filters`, are incorrect or incomplete.
     * - **FetchError**: Thrown if there is an issue with the network request, with detailed information available for debugging.
     *
     * @param recordType The type of the records to be queried.
     * @param filters Array of `CKDBQueryFilter` specifying conditions each record must meet to be included in the result.
     * @param sorts Array of `CKDBQuerySort` specifying how the fetched records should be ordered.
     * @param resultsLimit The maximum number of records to return in one call; cannot exceed a certain limit (e.g., 200).
     * @param zoneName Optional. Specifies the database zone from which the records should be fetched. Defaults to the client's default zone if not specified.
     * @returns A promise that, when resolved, provides a detailed response including the status code, a description of the operation, and the records fetched, or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    queryRecords(params: QueryRecordsParams): Promise<QueryRecordsResponse>;
    /**
     * Updates an existing record in the CloudKit database by modifying specific fields.
     *
     * This method sends updated field values for an existing record specified by `recordName` within a given zone. The updates are applied to the fields specified in the `fields` dictionary. If successful, the server returns a `CKDBRecordResponse` object containing the updated record information.
     *
     * ### Usage
     * - **Specify Fields**: Provide a dictionary where each key represents the field name and the value is of type `CKDBRecordFieldValue`, representing the new value for that field.
     * - **Handling Responses**: On a successful update, the method returns details of the updated record.
     *
     * ### Responses
     * - If successful, the response includes:
     *   - `statusCode`: HTTP status code 200, indicating the record was successfully updated.
     *   - `description`: A descriptive message about the result of the operation.
     *   - `result`: A `CKDBRecordResponse` object detailing the updated record.
     *
     * ### Error Handling
     * - **DocumentedResponseError**: Thrown if the HTTP status code is 421, or if it falls within the range of 400 to 599 and is not specifically documented.
     * - **ValidationError**: Thrown if input parameters, such as the record name or field updates, are incorrect or incomplete.
     * - **FetchError**: Thrown if there is an issue with the network request, with details available for further examination.
     *
     * @param recordName The unique name of the record to be updated.
     * @param recordType The type of the record, which determines the schema to apply the updates.
     * @param recordChangeTag The
     * @param fields Dictionary of field updates where each key is a field name and each value is a `CKDBRecordFieldValue` representing the new value for that field.
     * @param zoneName Optional. Specifies the database zone from which the record should be updated. Defaults to the client's default zone if not specified.
     * @returns A promise that resolves with detailed information about the updated record or rejects with an error if the operation fails.
     * @throws {Error} Represents errors that occurred during the operation, providing detailed information for debugging and error handling.
     */
    updateRecord(params: UpdateRecordParams): Promise<UpdateRecordResponse>;
}

// Interface for creating a record
export interface CreateRecordParams {
    record: PartialCKDBRecord;
    zoneName?: string;
}

export interface CreateRecordResponse {
    statusCode: 201;
    description: string;
    result: CKDBRecordResponse;
}

// Interface for retrieving a record
export interface GetRecordParams {
    recordName: string;
    requestedFields?: string[];
    zoneName?: string;
}

export interface GetRecordResponse {
    statusCode: 200;
    description: string;
    result: CKDBRecordResponse;
}

// Interface for deleting a record
export interface DeleteRecordParams {
    recordName: string;
    zoneName?: string;
}

export interface DeleteRecordResponse {
    statusCode: 204;
    description: string;
}

// Interface for deleting records by query
export interface DeleteRecordsByQueryParams {
    recordType: string;
    filters: CKDBQueryFilter[];
    resultsLimit?: number;
    zoneName?: string;
}

export interface DeleteRecordsByQueryResponse {
    statusCode: 200;
    description: string;
    result: CKDBPagedBatchDeleteResponse;
}

// Interface for looking up records
export interface LookupRecordsParams {
    recordNames: string[];
    zoneName?: string;
}

export interface LookupRecordsResponse {
    statusCode: 200;
    description: string;
    result: CKDBLookupRecordsResponse;
}

// Interface for querying record changes

export interface QueryRecordChangesParams{
    body: CKDBRecordChangesRequestBody;
    zoneName?: string;
}

export interface QueryRecordChangesResponse {
    statusCode: 200;
    description: string;
    result: CKDBRecordChangesResponse;
}

export interface QueryFilter {
    type: string;
    fieldName: string;
    fieldValue: any;
}

// Interface for querying records
export interface QueryRecordsParams {
    recordType: string;
    filters: QueryFilter[];
    sorts: CKDBQuerySort[];
    resultsLimit?: number;
    zoneName?: string;
}

export interface QueryRecordsResponse {
    statusCode: 200;
    description: string;
    result: CKDBRecordsResponse;
}

// Interface for updating a record
export interface UpdateRecordParams {
    recordName: string;
    recordType: string;
    recordChangeTag: string;
    fields: { [key: string]: CKDBRecordFieldValue };
    zoneName?: string;
}

export interface UpdateRecordResponse {
    statusCode: 200;
    description: string;
    result: CKDBRecordResponse;
}
