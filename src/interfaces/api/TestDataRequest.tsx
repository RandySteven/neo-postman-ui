export interface TestDataRequest {
    method: string;
    endpoint: string;
    requestHeader: any;
    requestBody: string;
    expectedResponseCode: number;
    expectedResponse: string;
}
