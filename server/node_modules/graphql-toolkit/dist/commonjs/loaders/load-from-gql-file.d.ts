import { DocumentNode } from 'graphql';
export declare function loadFromGqlFile(filePath: string, skipGraphQLImport?: boolean): Promise<DocumentNode>;
