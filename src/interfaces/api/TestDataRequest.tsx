export interface TestDataRequest {
    method: string;
    path: string;
    description: string;
    request_header: any;
    request_body: any;
    expected_response_code: number;
    expected_response: any;
}
