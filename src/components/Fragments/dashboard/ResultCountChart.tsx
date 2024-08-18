'use client'
import { ResultCount } from "@/api/DashboardApi";
import { Loading } from "@/components/Elements/Loading";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";
import { Fragment, useEffect, useState, useRef } from "react";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export const TestResultCountChart = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [result, setResult] = useState<TestResultResponse>({
        expected: 0,
        unexpected: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [chartInstance, setChartInstance] = useState<Chart | null>(null);

    useEffect(() => {
        const fetchTestResultResponse = async () => {
            try {
                const response = await ResultCount();
                setResult(response.data.results);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchTestResultResponse();
    }, []);

    useEffect(() => {
        if (!loading && !error && canvasRef.current) {
            if (chartInstance) {
                chartInstance.destroy();
            }
            const newChartInstance = new Chart(canvasRef.current, {
                type: "doughnut",
                data: {
                    labels: ["expected", "unexpected"],
                    datasets: [
                        {
                            data: [result.expected, result.unexpected],
                            backgroundColor: ['green', 'yellow'],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
            setChartInstance(newChartInstance);
        }
    }, [loading, error, result]);

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        );
    }

    return (
        <Fragment>
            <div style={{ height: '400px' }}>
                <canvas ref={canvasRef} id="myChart"></canvas>
            </div>
        </Fragment>
    );
};
