export interface iLogger {
    log(level: string, message: string): Promise<void>;
    logInfo(message: string): Promise<void>;
    logWarning(message: string): Promise<void>;
    logError(message: string): Promise<void>;
}