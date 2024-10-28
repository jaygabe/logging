import { iLogManagerFactory } from "../../interfaces/iManagerFactory";
import { iLogManager } from "../../interfaces/iManager";
import { NoOpLogManager } from "../../implementation/managers/NoOp";
import { iNoOpLogManagerConfiguration } from "../../interfaces/configuration/iNoOpManagerConfiguration";

export class NoOpFactory implements iLogManagerFactory<iNoOpLogManagerConfiguration> {
    createLogManager(config: iNoOpLogManagerConfiguration): iLogManager {
        return new NoOpLogManager();
    }
}