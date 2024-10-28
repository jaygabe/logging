import { iLogFormatterConfiguration } from "./iFormatter";

export interface iDefaultLogConfiguration extends iLogFormatterConfiguration {
    formatType: 'default';
    // Add additional properties if needed
}