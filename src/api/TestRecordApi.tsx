import { ApiLink } from "./ApiLink"

export async function getTestRecords() {
    let baseHos = ApiLink + "/testrecord"
    const res = await fetch(baseHos)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = res.json()
    return data
}

export async function saveTestDataToRecord(url : string) {
    const res = await fetch(url)
    if(!res.ok) {
        throw new Error('failed to save')
    }
    const data = res.json()
    return data
}