import { iLogWriterFactory } from "../../interfaces/iWriterFactory";
import { iLogWriter } from "../../interfaces/iWriter";
import { iLogWriterConfiguration } from "../../interfaces/configuration/iWriter";
import { ConsoleLogWriter } from "../../implementation/writers/Console";
import { iConsoleLogWriterConfiguration } from "../../interfaces/configuration/iConsole";

export class ConsoleLogWriterFactory implements iLogWriterFactory<iConsoleLogWriterConfiguration> {
    createLogWriter(config: iLogWriterConfiguration): iLogWriter {
        return new ConsoleLogWriter();
    }
}