import { iLogWriterConfiguration } from "./iWriter";

export interface iRemoteLogWriterConfiguration extends iLogWriterConfiguration {
    type: 'remote';
    endPointUrl: string;
    apiKey?: string;
}