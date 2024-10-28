import { iLogger } from "./iLogger";
import { iLoggerConfiguration } from "./configuration/iLogger";

export interface iLoggerFactory {
    createLogger(config: iLoggerConfiguration): iLogger;
}