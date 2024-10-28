import { iLogManager } from "../../interfaces/iManager";
import * as fs from 'fs';

export interface iSizeBasedLogManagerConfiguration extends iLogManager {
    rotatePolicy: 'size';
    maxFileSize: number;
    filePath: string;
}

export class SizeBasedLogManager implements iLogManager {
    constructor(private config: iSizeBasedLogManagerConfiguration) {}

    manage(): void {
        try {
            const stats = fs.statSync(this.config.filePath);
            if (stats.size >= this.config.maxFileSize) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const rotatedFilePath = `${this.config.filePath}.${timestamp}`;
                fs.renameSync(this.config.filePath, rotatedFilePath);
                fs.writeFileSync(this.config.filePath, '');
            }
        } catch (error) {
            console.error(`Error managing log file: ${error.message}`);
        }
    }
}