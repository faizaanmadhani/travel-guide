import { getLogger } from './logger';
let queue = [];
export function debugLog(message, ...meta) {
    if (!process.env.GQL_CODEGEN_NODEBUG && process.env.DEBUG !== undefined) {
        queue.push({
            message,
            meta,
        });
    }
}
export function printLogs() {
    if (!process.env.GQL_CODEGEN_NODEBUG && process.env.DEBUG !== undefined) {
        queue.forEach(log => {
            getLogger().info(log.message, ...log.meta);
        });
        resetLogs();
    }
}
export function resetLogs() {
    queue = [];
}
//# sourceMappingURL=debugging.js.map