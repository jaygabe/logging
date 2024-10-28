import { iLogManager } from "./iManager";
import { iLogManagerConfiguration } from "./configuration/iManager";

export interface iLogManagerFactory<TConfig extends iLogManagerConfiguration> {
    createLogManager(config: TConfig): iLogManager;
}