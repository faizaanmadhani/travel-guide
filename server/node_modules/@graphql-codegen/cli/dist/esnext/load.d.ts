import { Types } from '@graphql-codegen/plugin-helpers';
import { DocumentNode } from 'graphql';
export declare const loadSchema: (schemaDef: Types.Schema, config: Types.Config) => Promise<DocumentNode>;
export declare const loadDocuments: (documentsDef: Types.InstanceOrArray<Types.OperationDocument>, config: Types.Config) => Promise<Types.DocumentFile[]>;
