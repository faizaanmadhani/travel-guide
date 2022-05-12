import { buildASTSchema } from 'graphql';
import { debugLog } from './debugging';
export function tryToBuildSchema(schema) {
    try {
        return buildASTSchema(schema);
    }
    catch (e) {
        debugLog(`Unable to build AST schema from DocumentNode, will try again later...`, e);
        return null;
    }
}
//# sourceMappingURL=try-to-build-schema.js.map