import { TestDataRequest } from "@/interfaces/api/TestDataRequest"
import { ApiLink } from "./ApiLink"

export async function getTestDatas() {
    let baseHos = ApiLink + "/testdata"
    const res = await fetch(baseHos)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = res.json()
    return data
}

export async function createTestData(request:TestDataRequest) {
    let baseHost = ApiLink + "/testdata"

    const res = await fetch(baseHost, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'content-type': 'application/json'
        }
    })

    return res.json()
}