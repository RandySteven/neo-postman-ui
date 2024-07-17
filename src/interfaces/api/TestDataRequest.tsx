export interface TestDataRequest {
    method: string;
    base_url: string;
    path: string;
    description: string;
    request_header: any;
    request_body: any;
    expected_response_code: number;
    expected_response: any;
}
