export interface iLogWriterConfiguration {
    type: string; // 'console', 'file', 'remote'
    [key: string]: any; // Allows for additional properties specific to each writer
}