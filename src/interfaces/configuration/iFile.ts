import { iLogWriterConfiguration } from "./iWriter";

export interface iFileLogWriterConfiguration extends iLogWriterConfiguration {
    type: 'file';
    filePath: string;
}