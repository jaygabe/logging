export interface iLogWriter {
    write(message: string): void | Promise<void>;
}