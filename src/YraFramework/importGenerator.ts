// This function extracts the necessary types from the input string
// and generates an import statement
export function generateImportStatement(input: string): string {
    const typePrefix = "CKDBRecordField";
    const creationTypePrefix = "createCKDBRecordField"
    const allTypes = [
        "StringValue",
        "Int64Value",
        "AssetValue",
        "ReferenceValue",
        "TimestampValue",
        "BytesValue",
        "DoubleValue",
        "LocationValue",
        "AssetListValue",
        "BytesListValue",
        "DoubleListValue",
        "Int64ListValue",
        "LocationListValue",
        "ReferenceListValue",
        "StringListValue",
        "TimestampListValue"
    ];

    // Set to hold unique types found in the input
    const foundTypes = new Set<string>();

    // Regex to match all possible CKDBRecordField types in the input string
    const regex = new RegExp(`\\b${typePrefix}(\\w+)\\b`, 'g');
    let match;
    while ((match = regex.exec(input)) !== null) {
        // Check if the matched type is in the list of all types
        if (allTypes.includes(match[1]!)) {
            foundTypes.add(match[0]); // Add the full type name to the set
            foundTypes.add(`${creationTypePrefix}${match[1]}`); // Add the corresponding creation function
        }
    }

    // Create the import statement only if we have found any types
    if (foundTypes.size > 0) {
        const importTypes = Array.from(foundTypes).sort().join(",\n    ");
        return `import {\n` +
            `    CKDBQuerySort,\n` +
            `    CKDBQuerySortOrder,\n` +
            `    toInt64,\n` +
            `    CKDBQueryFilter,\n` +
            `    CKDBQueryFilterType,\n` +
            `    ${importTypes}\n` +
            `} from "@apple/cktool.database";\n` +
            `\n`+
            `import {\n`+
            `    CKModel\n` +
            `} from "cloudkit-yra";` +
            `\n`+
            `import {\n`+
            `    ConvertibleToCKDBAsset\n` +
            `} from "@apple/cktool.database/dist/types/field-values/functions/utils";` +
            `\n`+
            `import {QueryFilter} from from "cloudkit-yra";`;
    } else {
        return "No types to import.";
    }
}
