import { iLogManager } from "../../interfaces/iManager";

export class NoOpLogManager implements iLogManager {
    manage(): void {
        // No operation performed
    }
}