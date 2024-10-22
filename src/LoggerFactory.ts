import { Logger } from "./Logger";

export interface LoggerFactory {
    createLogger(): Logger;
}