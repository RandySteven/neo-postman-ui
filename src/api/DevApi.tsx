import { ApiLink } from "./ApiLink";

export async function getBaseHostList() {
    let baseHost = ApiLink + "/dev/listurl"
    const res = await fetch(baseHost)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data
} 