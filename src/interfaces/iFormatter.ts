export interface iLogFormatter {
    format(level: string, message: string): string;
}