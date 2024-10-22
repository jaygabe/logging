import { LoggerFactory } from "./LoggerFactory";
import { Logger } from "./Logger";
import { RemoteLogger } from "./RemoteLogger";

export class RemoteLoggerFactory implements LoggerFactory {
    createLogger(): Logger {
        return new RemoteLogger();
    }
}