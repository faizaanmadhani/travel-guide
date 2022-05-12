export const DEFAULT_DECLARATION_KINDS = {
    scalar: 'type',
    input: 'type',
    type: 'type',
    interface: 'type',
    arguments: 'type',
};
export function normalizeDeclarationKind(declarationKind) {
    if (typeof declarationKind === 'string') {
        return {
            scalar: declarationKind,
            input: declarationKind,
            type: declarationKind,
            interface: declarationKind,
            arguments: declarationKind,
        };
    }
    return {
        ...DEFAULT_DECLARATION_KINDS,
        ...declarationKind,
    };
}
//# sourceMappingURL=declaration-kinds.js.map