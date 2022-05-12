import { parse, Source } from 'graphql';
import { readFileSync } from 'fs';
export async function loadFromGqlFile(filePath, skipGraphQLImport = false) {
    const content = readFileSync(filePath, 'utf-8').trim();
    if (content && content !== '') {
        if (!skipGraphQLImport && /^\#.*import /i.test(content.trimLeft())) {
            const { importSchema } = await eval(`require('graphql-import')`);
            const importedSchema = importSchema(filePath);
            return parse(importedSchema);
        }
        else {
            return parse(new Source(content, filePath));
        }
    }
    return null;
}
//# sourceMappingURL=load-from-gql-file.js.map