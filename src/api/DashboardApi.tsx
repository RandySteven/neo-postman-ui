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

export async function AvgResponseTimeAPI() {
    let link = ApiLink + "/dashboard/avg-response-time"
    const res = await fetch(link)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data
}

export async function CountMethodAPI() {
    let link = ApiLink + "/dashboard/count-method"
    const res = await fetch(link)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data
}

export async function GetActiveService() {
    let link = ApiLink + "/dashboard/active-services"
    const res = await fetch(link)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data
}