import { iLogFormatter } from "./iFormatter";
import { iLogFormatterConfiguration } from "./configuration/iFormatter";

export interface iLogFormatterFactory<TConfig extends iLogFormatterConfiguration> {
    createLogFormatter(config: TConfig): iLogFormatter;
}