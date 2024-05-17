// YraGenerator.ts
import fs from 'fs';
import path from 'path';
import { readSchemaFile, parseCKDBSchema } from './schemaParser';
import { generateImportStatement } from "./importGenerator";

// Function to generate the complete TypeScript definition file
function generateTypeScriptDefinitions(schemaFilePath: string, outputPath: string): void {
    // Read the schema file
    const fileContent = readSchemaFile(schemaFilePath);
    if (!fileContent) {
        console.error("Failed to read or parse the schema file.");
        return;
    }

    // Parse the schema to get TypeScript definitions
    const tsDefinitions = parseCKDBSchema(fileContent);
    if (!tsDefinitions) {
        console.log("No TypeScript definitions generated.");
        return;
    }

    // TypeScript imports from CKTool database
    let tsImports = generateImportStatement(tsDefinitions);

    if (!tsImports) {
        console.log("No types to import.");
        return;
    }

    // Combine the imports with the generated TypeScript definitions
    const fullOutput = `${tsImports}\n\n\n${tsDefinitions}`;

    // Write the full output to the specified TypeScript output file
    fs.writeFileSync(outputPath, fullOutput, 'utf8');
    console.log(`TypeScript definitions saved to: ${outputPath}`);
}

function yraGenerateTypes(pathToSchema: string, to: string) {
    const schemaPath = path.join(process.cwd(), pathToSchema);
    const outputTsPath = path.join(process.cwd(), to);
    generateTypeScriptDefinitions(schemaPath, outputTsPath);
}

export default yraGenerateTypes;