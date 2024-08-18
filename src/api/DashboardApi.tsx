import { ApiLink } from "./ApiLink";

export async function ResultCount() {
    let link = ApiLink + "/dashboard/result-count"
    const res = await fetch(link)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data
}