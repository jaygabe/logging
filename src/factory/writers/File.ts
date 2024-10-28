import { iLogWriterFactory } from "../../interfaces/iWriterFactory";
import { iLogWriter } from "../../interfaces/iWriter";
import { FileLogWriter } from "../../implementation/write/FileLogWriter";
import { iFileLogWriterConfiguration } from "../../interfaces/configuration/iFile";

export class FileLogWriterFactory implements iLogWriterFactory<iFileLogWriterConfiguration> {
    createLogWriter(config: iFileLogWriterConfiguration): iLogWriter {
        return new FileLogWriter(config.filePath);
    }
}