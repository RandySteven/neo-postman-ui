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