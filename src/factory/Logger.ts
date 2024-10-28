import { iLoggerFactory } from "../interfaces/iLoggerFactory";
import { iLogger } from "../interfaces/iLogger";
import { Logger } from "../implementation/Logger";
import { FactoryRegistry } from "./Registry";
import { iLoggerConfiguration } from "../interfaces/configuration/iLogger";
import { iLogManager } from "../interfaces/iManager";

export class LoggerFactory implements iLoggerFactory {
    constructor(private registry: FactoryRegistry) {}
    
    createLogger(config: iLoggerConfiguration): iLogger {
        const writerFactory = this.registry.getLogWriterFactory(config.writerConfig.type);
        const writer = writerFactory.createLogWriter(config.writerConfig);

        const formatterFactory = this.registry.getLogFormatterFactory(config.formatterConfig.formatType);
        const formatter = formatterFactory.createLogFormatter(config.formatterConfig);

        let manager: iLogManager | undefined = undefined;
        if (config.managerConfig) {
            const managerFactory = this.registry.getLogManagerFactory(config.managerConfig.rotatePolicy);
            manager = managerFactory.createLogManager(config.managerConfig);
        }

        return new Logger(writer, formatter, manager);
    }
}