import { iLogManagerFactory } from "../../interfaces/iManagerFactory";
import { iLogManager } from "../../interfaces/iManager";
import { SizeBasedLogManager, iSizeBasedLogManagerConfiguration } from "../../implementation/managers/SizeBased";

export class SizeBasedFactory implements iLogManagerFactory<iSizeBasedLogManagerConfiguration> {
    createLogManager(config: iSizeBasedLogManagerConfiguration): iLogManager {
        return new SizeBasedLogManager(config);
    }
}