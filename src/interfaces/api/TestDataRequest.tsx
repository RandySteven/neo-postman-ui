export interface TestDataRequest {
    method: string;
    endpoint: string;
    request_header: any;
    request_body: any;
    expected_response_code: number;
    expected_response: any;
}
