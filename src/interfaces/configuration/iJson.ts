import { iLogFormatterConfiguration } from "./iFormatter";

export interface iJsonLogFormatterConfiguration extends iLogFormatterConfiguration {
    formatType: 'json';
    // Add any additional properties, such as indentation level
    indent?: number; // Number of spaces for indentation
    includeTimestamp?: boolean;
}