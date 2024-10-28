import { iLogWriter } from "./iWriter";
import { iLogWriterConfiguration } from "./configuration/iWriter";

export interface iLogWriterFactory<TConfig extends iLogWriterConfiguration> {
    createLogWriter(config: TConfig): iLogWriter;
}