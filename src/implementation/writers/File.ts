import { iLogWriter } from "../../interfaces/iWriter";
import * as fs from 'fs';

export class FileLogWriter implements iLogWriter {
    private filePath: string;
    private stream: fs.WriteStream;

    constructor(filePath: string) {
        this.filePath = filePath;

        this.stream = fs.createWriteStream(this.filePath, { flags: 'a' });
        this.stream.on('error', (error) => {
            console.error(`Error writing to log file: ${error.message}`);
        });
    }

    write(message: string): void {
        this.stream.write(message + '\n');
    }
}

// import { ILogWriter } from '../../interfaces/iLogWriter';
// import * as fs from 'fs';
// import * as path from 'path';

// export interface FileLoggerOptions {
//     filePath: string;
//     maxFileSize?: number; // bytes
//     maxDirectorySize?: number;
//     retentionPeriodDays?: number;
//     encoding?: BufferEncoding;
//     logLevels?: string[];
//     format?: (level: string, message: string) => string;
// }

// export class FileLogWriter implements ILogWriter {
//     private stream: fs.WriteStream;
//     private logStream: fs.WriteStream;
//     private filePath: string;
//     private maxFileSize: number;
//     private maxDirectorySize: number;
//     private retentionPeriodDays: number;
//     private encoding: BufferEncoding;
//     private logLevels: Set<string>;
//     private format: (level: string, message: string) => string;

//     constructor(options: FileLoggerOptions) {
//         this.filePath = options.filePath;
//         this.maxFileSize = options.maxFileSize || 10 * 1024 * 1024; // Default 10MB
//         this.maxDirectorySize = options.maxDirectorySize || 100 * 1024 * 1024; // 100MB
//         this.retentionPeriodDays = options.retentionPeriodDays || 30;
//         this.encoding = options.encoding || 'utf8';
//         this.logLevels = new Set(options.logLevels || ['info', 'warning', 'error']);
//         this.format = options.format || this.defaultFormat;

//         this.ensureLogFile();

//         this.logStream = fs.createWriteStream(this.filePath, { flags: 'a', encoding: this.encoding });
    
//         this.logStream.on('error', (error) => {
//             console.error(`Stream error: ${this.getErrorMessage(error)}`);
//         });

//         this.stream = fs.createWriteStream(this.filePath, { flags: 'a' });
//     }

//     async logInfo(message: string): Promise<void> {
//         await this.write('info', message);
//     }

//     async logWarning(message: string): Promise<void> {
//       await this.write('warning', message);
//     }

//     async logError(message: string): Promise<void> {
//         await this.write('error', message);
//     }

//     private defaultFormat(level: string, message: string): string {
//         const timestamp = new Date().toISOString();
//         return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
//     }

//     private ensureLogFile(): void {
//         const dir = path.dirname(this.filePath);
//         if (!fs.existsSync(dir)) {
//             fs.mkdirSync(dir, { recursive: true });
//         }

//         if (!fs.existsSync(this.filePath)) {
//             fs.writeFileSync(this.filePath, '', { encoding: this.encoding });
//         }
//     }

//     private async rotateLogFile(): Promise<void> {
//         try {
//             const { size } = fs.statSync(this.filePath);
//             if (size >= this.maxFileSize) {
//                 const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//                 const rotatedFilePath = `${this.filePath}.${timestamp}`;
                
//                 this.logStream.end();
                
//                 fs.renameSync(this.filePath, rotatedFilePath);
                
//                 this.logStream = fs.createWriteStream(this.filePath, { flags: 'a', encoding: this.encoding });

//                 this.logStream.on('error', (error) => {
//                     console.error(`Stream error: ${this.getErrorMessage(error)}`);
//                 });

//                 await this.enforceDirectorySizeLimit();
//             }
//         } catch (error) {
//             console.error(`Failed to rotate log file: ${this.getErrorMessage(error)}`);
//         }
//     }

//     private async enforceDirectorySizeLimit(): Promise<void> {
//         try {
//             const dir = path.dirname(this.filePath);
//             const files = fs.readdirSync(dir);
//             let totalSize = 0;
//             const fileInfos: { name: string; size: number; mtime: Date }[] = [];

//             const now = Date.now();
//             const retentionPeriodMs = this.retentionPeriodDays * 24 * 60 * 60 * 1000;

//             // Collect file information
//             for (const file of files) {
//                 const filePath = path.join(dir, file);

//                 // Skip if not a file
//                 if (!fs.statSync(filePath).isFile()) {
//                     continue;
//                 }

//                 const stats = fs.statSync(filePath);
//                 totalSize += stats.size;

//                 const fileAge = now - stats.mtime.getTime();

//                 // Delete files older than retention period
//                 if (fileAge > retentionPeriodMs && filePath !== this.filePath) {
//                     fs.unlinkSync(filePath);
//                     totalSize -= stats.size;
//                     continue;
//                 }

//                 fileInfos.push({
//                     name: file,
//                     size: stats.size,
//                     mtime: stats.mtime
//                 });
//             }

//             // Proceed with size-based deletion if necessary
//             // Check if total size exceeds maxDirectorySize
//             if (totalSize > this.maxDirectorySize) {
//                 // Sort files by modification time (oldest first)
//                 fileInfos.sort((a, b) => a.mtime.getTime() - b.mtime.getTime());

//                 // Delete oldest files until total size is under limit
//                 for (const fileInfo of fileInfos) {
//                     const filePath = path.join(dir, fileInfo.name);

//                     // Skip the current log file
//                     if (filePath === this.filePath) {
//                         continue;
//                     }

//                     fs.unlinkSync(filePath);
//                     totalSize -= fileInfo.size;

//                     if (totalSize <= this.maxDirectorySize) {
//                         break;
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error(`Failed to enforce directory size limit: ${this.getErrorMessage(error)}`);
//         }
//     }

//     private async write(level:string, message: string): Promise<void> {
//         if (!this.logLevels.has(level.toLowerCase())) {
//             return;
//         }

//         const formattedMessage = this.format(level, message) + '\n';

//         try {
//             await this.rotateLogFile();

//             const canWrite = this.logStream.write(formattedMessage);

//             if (!canWrite) {
//                 await new Promise((resolve) => this.logStream.once('drain', resolve));
//             }
//         } catch (error) {
//             if (error instanceof Error) {
//                 console.error(`Failed to write log: ${this.getErrorMessage(error)}`);
//             }     
//         }
//     }

//     private getErrorMessage(error: unknown): string {
//         if (error instanceof Error) {
//             return error.message;
//         } else {
//             return String(error);
//         }
//     }
// }