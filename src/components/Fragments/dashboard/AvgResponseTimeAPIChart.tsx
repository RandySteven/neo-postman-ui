'use client'
import { AvgResponseTimeAPI } from "@/api/DashboardApi";
import { Loading } from "@/components/Elements/Loading";
import { Chart, ArcElement, Tooltip, Legend, BarController, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Fragment, useEffect, useState, useRef } from "react";

Chart.register(BarController, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const TestAvgResponseTimeChart = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [result, setResult] = useState<AvgResponeTimePerAPIsResponse[]>([]);
    const [listUri, setListUri] = useState<string[]>([]);
    const [listAvgTime, setListAvgTime] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [chartInstance, setChartInstance] = useState<Chart | null>(null);

    useEffect(() => {
        const fetchAvgResponseTimeAPI = async () => {
            try {
                const response = await AvgResponseTimeAPI();
                setResult(response.data.results);

                const uris: string[] = [];
                const avgTimes: number[] = [];

                response.data.results.forEach(res => {
                    uris.push(res.uri);
                    avgTimes.push(res.avg_time);
                });

                setListUri(uris);
                setListAvgTime(avgTimes);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchAvgResponseTimeAPI();
    }, []);

    useEffect(() => {
        if (!loading && !error && canvasRef.current) {
            if (chartInstance) {
                chartInstance.destroy();
            }
            const newChartInstance = new Chart(canvasRef.current, {
                type: "bar",
                data: {
                    labels: listUri,
                    datasets: [
                        {
                            label: 'Average Response Time',
                            data: listAvgTime,
                            backgroundColor: 'blue',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
            setChartInstance(newChartInstance);
        }
    }, [loading, error, listUri, listAvgTime]);

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
