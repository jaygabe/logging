import { Logger } from "./Logger";

export class ConsoleLogger implements Logger {
    logInfo(message: string): void {
        console.log(`INFO: ${message}`);
    }

    logWarning(message: string): void {
        console.warn(`WARNING: ${message}`);
    }

    logError(message: string): void {
        console.error(`ERROR: ${message}`);
    }
}