export interface TestRecords {
    id: number,
    endpoint: string,
    description: string,
    links: any
}

export interface TestRecordRequest {
    testDataId: number;
}