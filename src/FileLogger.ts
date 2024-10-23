import { Logger } from "./Logger";
import * as fs from 'fs';
import * as path from 'path';

export interface FileLoggerOptions {
    filePath: string;
    maxFileSize?: number; // bytes
    encoding?: BufferEncoding;
    logLevels?: string[];
    format?: (level: string, message: string) => string;
}

export class FileLogger implements Logger {
    private filePath: string;
    private maxFileSize: number;
    private encoding: BufferEncoding;
    private logLevels: Set<string>;
    private format: (level: string, message: string) => string;

    constructor(options: FileLoggerOptions) {
        this.filePath = options.filePath;
        this.maxFileSize = options.maxFileSize || 10 * 1024 * 1024; // Default 10MB
        this.encoding = options.encoding || 'utf8';
        this.logLevels = new Set(options.logLevels || ['info', 'warning', 'error']);
        this.format = options.format || this.defaultFormat;

        this.ensureLogFile();
    }

    async logInfo(message: string): Promise<void> {
        await this.writeLog('info', message);
    }

    async logWarning(message: string): Promise<void> {
      await this.writeLog('warning', message);
    }

    async logError(message: string): Promise<void> {
        await this.writeLog('error', message);
    }

    private defaultFormat(level: string, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }

    private ensureLogFile(): void {
        const dir = path.dirname(this.filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '', { encoding: this.encoding });
        }
    }

    private async rotateLogFile(): Promise<void> {
        try {
            const { size } = fs.statSync(this.filePath);
            if (size >= this.maxFileSize) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const rotatedFilePath = `${this.filePath}.${timestamp}`;
                fs.renameSync(this.filePath, rotatedFilePath);
                fs.writeFileSync(this.filePath, '', { encoding: this.encoding });
            }
        } catch (error) {
            console.error(`Failed to rotate log file: ${this.getErrorMessage(error)}`);
        }
    }

    private async writeLog(level:string, message: string): Promise<void> {
        if (!this.logLevels.has(level.toLowerCase())) {
            return;
        }

        const formattedMessage = this.format(level, message) + '\n';

        try {
            await this.rotateLogFile();
            fs.appendFileSync(this.filePath, formattedMessage, { encoding: this.encoding });
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to write log: ${this.getErrorMessage(error)}`);
            }     
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