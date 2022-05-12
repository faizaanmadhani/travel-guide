"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const fs_1 = require("fs");
async function loadFromGqlFile(filePath, skipGraphQLImport = false) {
    const content = fs_1.readFileSync(filePath, 'utf-8').trim();
    if (content && content !== '') {
        if (!skipGraphQLImport && /^\#.*import /i.test(content.trimLeft())) {
            const { importSchema } = await eval(`require('graphql-import')`);
            const importedSchema = importSchema(filePath);
            return graphql_1.parse(importedSchema);
        }
        else {
            return graphql_1.parse(new graphql_1.Source(content, filePath));
        }
    }
    return null;
}
exports.loadFromGqlFile = loadFromGqlFile;
//# sourceMappingURL=load-from-gql-file.js.map