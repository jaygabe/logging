import { iLogWriterFactory } from "../../interfaces/iWriterFactory";
import { iLogWriter } from "../../interfaces/iWriter";
// RemoteLogWriter
import { iRemoteLogWriterConfiguration } from "../../interfaces/configuration/iRemote";

export class RemoteLoggerFactory implements iLogWriterFactory<iRemoteLogWriterConfiguration> {
    createLogger(config: iRemoteLogWriterConfiguration): iLoggerWriter {
        return new RemoteLogWriter(config);
    }
}