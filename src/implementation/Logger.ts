import { iLogger } from "../interfaces/iLogger";
import { iLogWriter } from "../interfaces/iWriter";
import { iLogFormatter } from "../interfaces/iFormatter";
import { iLogManager } from "../interfaces/iManager";

export class Logger implements iLogger {
    constructor(
        private writer: iLogWriter,
        private formatter: iLogFormatter,
        private manager?: iLogManager
    ) {}

    async log(level: string, message: string): Promise<void> {
        const formattedMessage = this.formatter.format(level, message);
        this.writer.write(formattedMessage);
        this.manager?.manage();
    }

    async logInfo(message: string): Promise<void> {
      this.log('info', message);
    }
    
    async logWarning(message: string): Promise<void> {
      this.log('warning', message);
    }
    
    async logError(message: string): Promise<void> {
      this.log('error', message);
    }
}