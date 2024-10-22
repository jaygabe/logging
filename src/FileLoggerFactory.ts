import { LoggerFactory } from "./LoggerFactory";
import { Logger } from "./Logger";
import { FileLogger, FileLoggerOptions } from "./FileLogger";

export class FileLoggerFactory implements LoggerFactory {
    private options: FileLoggerOptions;

    constructor(options: FileLoggerOptions) {
        this.options = options;
    }
    
    createLogger(): Logger {
        return new FileLogger(this.options);
    }
}