export interface TestDataRequest {
    method: string;
    url_key: string;
    path: string;
    description: string;
    request_header: any;
    request_body: any;
    expected_response_code: number;
    expected_response: any;
}
