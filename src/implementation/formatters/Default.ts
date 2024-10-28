import { iLogFormatter } from "../../interfaces/iFormatter";

export class DefaultLogFormatter implements iLogFormatter {
    format(level: string, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    }
}