import { iLogFormatter } from "../../interfaces/iFormatter";
import { iJsonLogFormatterConfiguration } from "../../interfaces/configuration/iJson";

export class JsonLogFormatter implements iLogFormatter {
    private indent?: number;
    private includeTimestamp: boolean;

    constructor(private config: iJsonLogFormatterConfiguration) {
        this.indent = config.indent;
        this.includeTimestamp = config.includeTimestamp ?? true;
    }
    
    format(level: string, message: string): string {
        const logEntry = {
            level: level.toUpperCase(),
            message: message,
            timestamp: ''
        };

        if (this.includeTimestamp) {
            logEntry.timestamp = new Date().toISOString();
        }

        return JSON.stringify(logEntry, null, this.indent);
    }
}