import { ResultCount } from "@/api/DashboardApi";
import { Chart } from "chart.js"
import { Fragment, useEffect, useState } from "react"

export const TestResultCountChart = () => {
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    const [result, setResult] = useState<TestResultResponse>({
        expected: 0,
        unexpected: 0
    })
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTestResultResponse = async () => {
            try {
                let result = await ResultCount()
                setResult(result.data)
            }catch(error) {
                setError('Failed to fetch data')
            }finally {
                setLoading(false)
            }
        }
    })

    let data = new Chart(
        ctx, {
            type: "doughnut",
            data: result
        }        
    )
    return <>
        <Fragment>
            <canvas id="myChart"></canvas>
        </Fragment>
    </>
}