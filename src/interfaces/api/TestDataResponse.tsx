export interface TestDataResponse {
    id: number;
    is_saved: boolean;
    endpoint: string;
    method: string;
    description: string;
    request_header: any | null;
    request_body: any | null;
    expected_response: any | null;
    actual_response: any | null;
    result_status: string
}