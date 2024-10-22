import { Logger } from "./Logger";

export class RemoteLogger implements Logger {
    logInfo(message: string): void {
        // Write info to remote server
    }

    logWarning(message: string): void {
        // Write warning to remote server
    }

    logError(message: string): void {
        // Write error to remote server
    }
}