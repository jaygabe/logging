import { LoggerFactory } from "./LoggerFactory";
import { Logger } from "./Logger";
import { ConsoleLogger } from "./ConsoleLogger";

export class ConsoleLoggerFactory implements LoggerFactory {
    createLogger(): Logger {
        return new ConsoleLogger();
    }
}