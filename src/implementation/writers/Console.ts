import { iLogWriter } from "../../interfaces/iWriter";

export class ConsoleLogWriter implements iLogWriter {
    write(message: string): void {
        console.log(message);
    }
}