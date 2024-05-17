# Yra Generator

Early-stage TypeScript utility for generating TypeScript definitions from a CKTool schema.

Yra Generator is a TypeScript utility for generating TypeScript definitions from a CKTool schema. It reads a schema file, parses the content to extract necessary information, generates TypeScript type definitions, and saves them to a specified output file. It is designed to facilitate the creation and management of TypeScript models based on CloudKit database schemas.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
  - [generateTypeScriptDefinitions](#generateTypeScriptDefinitions)
  - [yraGenerateTypes](#yraGenerateTypes)
  - [readSchemaFile](#readSchemaFile)
  - [parseCKDBSchema](#parseCKDBSchema)
  - [parseFields](#parseFields)
  - [mapSchemaTypeToCKDBFieldType](#mapSchemaTypeToCKDBFieldType)
  - [mapSchemaTypeToUsageType](#mapSchemaTypeToUsageType)
  - [generateImportStatement](#generateImportStatement)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the required packages using npm or yarn:

```bash
npm install
```

## Usage

To generate TypeScript definitions, use the `yraGenerateTypes` function. Provide the path to your schema file and the output path for the TypeScript definitions.

Example usage:

```ts
import yraGenerateTypes from './YraGenerator';

// Define paths
const schemaFilePath = 'path/to/your/schema/file';
const outputPath = 'path/to/output/types.ts';

// Generate TypeScript definitions
yraGenerateTypes(schemaFilePath, outputPath);
```

## Functions

### generateTypeScriptDefinitions

Generates TypeScript definitions from a CKTool schema file.

**Parameters:**
- `schemaFilePath`: string - The path to the schema file.
- `outputPath`: string - The path to save the generated TypeScript definitions.

**Usage:**

```ts
generateTypeScriptDefinitions('schema.ckdb', 'output.ts');
```

### yraGenerateTypes

Wrapper function that calls `generateTypeScriptDefinitions` with the provided schema file and output paths.

**Parameters:**
- `pathToSchema`: string - The path to the schema file relative to the project root.
- `to`: string - The path to save the generated TypeScript definitions relative to the project root.

**Usage:**

```ts
yraGenerateTypes('schema.ckdb', 'output.ts');
```

### readSchemaFile

Reads the content of a schema file.

**Parameters:**
- `schemaFilePath`: string - The path to the schema file.

**Returns:**
- `string | null` - The content of the schema file or `null` if an error occurs.

**Usage:**

```ts
const fileContent = readSchemaFile('schema.ckdb');
```

### parseCKDBSchema

Parses the content of a CKTool schema file to extract TypeScript definitions.

**Parameters:**
- `fileContent`: string - The content of the schema file.

**Returns:**
- `string | null` - The generated TypeScript definitions or `null` if parsing fails.

**Usage:**

```ts
const tsDefinitions = parseCKDBSchema(fileContent);
```

### parseFields

Parses the fields of a schema type to generate TypeScript, CKDB, and Yra definitions.

**Parameters:**
- `fieldsBlock`: string - The block of fields to parse.
- `typeName`: string - The name of the type.

**Returns:**
- An object containing TypeScript, CKDB, Yra type definitions, and model definitions.

**Usage:**

```ts
const { tsTypeDefinitions, yraTypeDefinitions, ckdbTypeDefinitions, modelDefinitions } = parseFields(fieldsBlock, 'ExampleType');
```

### mapSchemaTypeToCKDBFieldType

Maps a schema field type to a CKDB field type.

**Parameters:**
- `fieldType`: string - The field type from the schema.
- `listType`: string (optional) - The list type if the field is a list.

**Returns:**
- `string` - The CKDB field type.

**Usage:**

```ts
const ckdbFieldType = mapSchemaTypeToCKDBFieldType('STRING');
```

### mapSchemaTypeToUsageType

Maps a schema field type to a TypeScript type.

**Parameters:**
- `fieldType`: string - The field type from the schema.
- `listType`: string (optional) - The list type if the field is a list.

**Returns:**
- `string` - The TypeScript type.

**Usage:**

```ts
const tsFieldType = mapSchemaTypeToUsageType('STRING');
```

### generateImportStatement

Generates an import statement for the necessary types extracted from the input string.

**Parameters:**
- `input`: string - The input string to search for types.

**Returns:**
- `string` - The generated import statement.

**Usage:**

```ts
const importStatement = generateImportStatement(tsDefinitions);
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
The project is still in the early stages of development, and there are many opportunities for enhancements.

## License

This project is licensed under the MIT License.