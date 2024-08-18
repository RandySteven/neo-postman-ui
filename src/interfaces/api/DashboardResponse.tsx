interface TestResultResponse {
    expected: number,
    unexpected: number
}

interface AvgResponeTimePerAPIsResponse {
    uri: string,
    avg_time: number
}

interface CountMethodResponse {
    post: number
    get: number
    patch: number
    put: number
    delete: number
}