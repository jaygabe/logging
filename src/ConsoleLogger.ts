import { Logger } from "./Logger";

export class ConsoleLogger implements Logger {
    logInfo(message: string): void {
        try {
            console.log(`INFO: ${message}`);
        } catch (error) {
            console.error(`Failed to log warning message" ${this.getErrorMessage(error)}`);
        }
        
    }

    logWarning(message: string): void {
        try {
            console.warn(`WARNING: ${message}`);
        } catch(error) {
            console.error(`Failed to log warning message: ${this.getErrorMessage(error)}`);
        }
        
    }

    logError(message: string): void {
        try {
            console.error(`ERROR: ${message}`);
        } catch (error) {
            console.error(`Failed to log error message" ${this.getErrorMessage(error)}`);
        }
        
    }

    private getErrorMessage(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        } else {
            return String(error);
        }
    }
}