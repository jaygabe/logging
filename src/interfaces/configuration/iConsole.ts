import { iLogWriterConfiguration } from "./iWriter";

export interface iConsoleLogWriterConfiguration extends iLogWriterConfiguration {
    type: 'console';
}