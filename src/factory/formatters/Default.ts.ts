export interface LogFormatterFactory {
    createLogFormatter(config: LogFormatterConfiguration): ILogFormatter;
}