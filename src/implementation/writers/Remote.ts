import { iLogWriter } from "../../interfaces/iWriter";
import { iRemoteLogWriterConfiguration } from "../../interfaces/configuration/iRemote";
import axios from 'axios';

export class RemoteLogWriter implements iLogWriter {
    private endPointUrl: string;
    private apiKey?: string;

    constructor(private config: iRemoteLogWriterConfiguration) {
        this.endPointUrl = config.endPointUrl;
        this.apiKey = config.apiKey;
    }

    async write(message: string): Promise<void> {
        try {
            const headers: any = {
                'Content-Type': 'application/json'
            };

            if (this.apiKey) {
                headers['Authorization'] = `Bearer ${this.apiKey}`;
            }

            await axios.post(
                this.endPointUrl,
                { message },
                { headers }
            );
        } catch (error) {
            console.error(`Error sending log to remote server: ${error.message}`);
        }
    }
}