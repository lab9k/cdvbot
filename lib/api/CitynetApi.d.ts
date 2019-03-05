/// <reference types="node" />
import QueryResponse from '../models/QueryResponse';
export default class CitynetApi {
    token: {
        value: string;
        date: any;
    };
    baseUrl: string;
    constructor();
    query(question: string): Promise<QueryResponse>;
    login(): Promise<{
        value: string;
        date: string;
    }>;
    private getCredentials;
    private isTokenValid;
    downloadFile(resourceUri: string, filename: string): Promise<Buffer>;
}
