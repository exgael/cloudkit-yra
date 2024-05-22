# Yra Generator

Early-stage TypeScript utility for generating TypeScript definitions from a CKTool schema.

Yra Generator is a TypeScript utility for generating TypeScript definitions from a CKTool schema. It reads a schema file, parses the content to extract necessary information, generates TypeScript type definitions, and saves them to a specified output file. It is designed to facilitate the creation and management of TypeScript models based on CloudKit database schemas.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the required packages using npm or yarn:

```bash
npm install cloudkit-yra
```

## Usage

To generate TypeScript definitions, use the `yraGenerateTypes` function. Provide the path to your schema file and the output path for the TypeScript definitions.

Example usage:

```ts
// To generate TypeScript definitions

// Define paths
const schemaFilePath = 'path/to/your/schema/file';
const outputPath = 'path/to/output/types.ts';

// Generate TypeScript definitions
yraGenerateTypes(schemaFilePath, outputPath);
```

From the example folder, you can use generated TypeScript definitions to interact with CloudKit database models.

To set up the necessary configuration for the CloudKit API, use the `YraAPI` class. Provide the required parameters, such as the container ID, database type, environment, management token, team ID, and user token authentication.

Example usage:
```ts
import { YraAPI, yraGenerateTypes } from "cloudkit-yra";
import apple from "@apple/cktool.api.base";

// It will handle the necessary configuration for the CloudKit API
let api = new YraAPI({
    containerId: "23232323",
    databaseType: apple.CKDatabaseType.PUBLIC,
    environment: apple.CKEnvironment.DEVELOPMENT,
    managementToken: "23232323",
    teamId: "23232323",
    userTokenAuth: "23232323"
});
```

Here is an example of how to use the generated TypeScript definitions to interact with CloudKit database models:

```ts

// Import the generated TypeScript definitions
import { UserModel } from "example/genOutput";

// Create a new User object ( static method )
let userModel = await UserModel.create({ /* User object */ })

// Query based on queryable and sortable fields ( static method )
let userModels = await UserModel.query()
    .allTimeStarsGreaterThan(100) // Queryable field
    .experienceAscending() // Sortable field
    .displayNameContainsAllTokens(["John", "Doe"])
    .execute()

// Update the User object ( instance )
userModel.fields.experience.value = 100
await userModel.save()

// Delete the User object ( instance )
await userModel.delete()
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
The project is still in the early stages of development, and there are many opportunities for enhancements.

## License

This project is licensed under the MIT License.