import { iLogWriterFactory } from "../interfaces/iWriterFactory";
import { iLogFormatterFactory } from "../interfaces/iFormatterFactory";
import { iLogManagerFactory } from "../interfaces/iManagerFactory";
import { iLogWriterConfiguration } from "../interfaces/configuration/iWriter";
import { iLogFormatterConfiguration } from "../interfaces/configuration/iFormatter";
import { iLogManagerConfiguration } from "../interfaces/configuration/iManager";

export class FactoryRegistry {
    private logWriterFactories = new Map<string, iLogWriterFactory<any>>();
    private logFormatterFactories = new Map<string, iLogFormatterFactory<any>>();
    private logManagerFactories = new Map<string, iLogManagerFactory<any>>();
  
    // Registration methods
    registerLogWriterFactory<TConfig extends iLogWriterConfiguration>(
      type: string,
      factory: iLogWriterFactory<TConfig>
    ): void {
      this.logWriterFactories.set(type, factory);
    }
  
    registerLogFormatterFactory<TConfig extends iLogFormatterConfiguration>(
      formatType: string,
      factory: iLogFormatterFactory<TConfig>
    ): void {
      this.logFormatterFactories.set(formatType, factory);
    }
  
    registerLogManagerFactory<TConfig extends iLogManagerConfiguration>(
      policy: string,
      factory: iLogManagerFactory<TConfig>
    ): void {
      this.logManagerFactories.set(policy, factory);
    }
  
    // Retrieval methods
    getLogWriterFactory<TConfig extends iLogWriterConfiguration>(
      type: string
    ): iLogWriterFactory<TConfig> {
      const factory = this.logWriterFactories.get(type);
      if (!factory) {
        throw new Error(`No LogWriterFactory registered for type: ${type}`);
      }
      return factory as iLogWriterFactory<TConfig>;
    }
  
    getLogFormatterFactory<TConfig extends iLogFormatterConfiguration>(
      formatType: string
    ): iLogFormatterFactory<TConfig> {
      const factory = this.logFormatterFactories.get(formatType);
      if (!factory) {
        throw new Error(`No LogFormatterFactory registered for formatType: ${formatType}`);
      }
      return factory as iLogFormatterFactory<TConfig>;
    }
  
    getLogManagerFactory<TConfig extends iLogManagerConfiguration>(
      policy: string
    ): iLogManagerFactory<TConfig> {
      const factory = this.logManagerFactories.get(policy);
      if (!factory) {
        throw new Error(`No LogManagerFactory registered for policy: ${policy}`);
      }
      return factory as iLogManagerFactory<TConfig>;
    }
  }