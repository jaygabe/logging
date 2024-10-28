import { iLogManagerConfiguration } from "./iManager";

export interface iNoOpLogManagerConfiguration extends iLogManagerConfiguration {
    rotationPolicy: 'none';
}