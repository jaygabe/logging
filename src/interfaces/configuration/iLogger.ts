import { iLogWriterConfiguration } from "./iWriter";
import { iLogFormatterConfiguration } from "./iFormatter";
import { iLogManagerConfiguration } from "./iManager";

export interface iLoggerConfiguration {
  writerConfig: iLogWriterConfiguration;
  formatterConfig: iLogFormatterConfiguration;
  managerConfig?: iLogManagerConfiguration;
}