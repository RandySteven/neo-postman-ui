'use client';
import { ResultCount } from "@/api/DashboardApi";
import { Loading } from "@/components/Elements/Loading";
import { Fragment, useEffect, useState } from "react";
import Plot from 'react-plotly.js';

export const TestResultCountChart = () => {
    const [result, setResult] = useState<TestResultResponse>({
        expected: 0,
        unexpected: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                <Plot
                    data={[
                        {
                            values: [result.expected, result.unexpected],
                            labels: ["Expected", "Unexpected"],
                            type: 'pie',
                            hole: 0.4, // This makes it a doughnut chart
                            marker: {
                                colors: ['green', 'yellow'],
                            },
                        },
                    ]}
                    layout={{
                        title: 'Test Result Count',
                        showlegend: true,
                        margin: {
                            l: 20,
                            r: 20,
                            b: 20,
                            t: 40,
                            pad: 4
                        },
                        height: 400,
                        width: 400,
                    }}
                    style={{ width: '100%', height: '100%' }}
                    useResizeHandler={true}
                />
            </div>
        </Fragment>
    );
};
