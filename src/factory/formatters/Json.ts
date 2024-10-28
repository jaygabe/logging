import { iLogFormatterFactory } from "../../interfaces/iFormatterFactory";
import { iLogFormatter } from "../../interfaces/iFormatter";
import { JsonLogFormatter } from "../../implementation/formatters/Json";
import { iJsonLogFormatterConfiguration } from "../../interfaces/configuration/iJson";

export class JsonFactory implements iLogFormatterFactory<iJsonLogFormatterConfiguration> {
    createLogFormatter(config: iJsonLogFormatterConfiguration): iLogFormatter {
        return new JsonLogFormatter(config);
    }
}