export interface Logger {
    logInfo(message: string): void;
    logWarning(message: string): void;
    logError(message: string): void;
}