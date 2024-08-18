'use client';
import { AvgResponseTimeAPI } from "@/api/DashboardApi";
import { Loading } from "@/components/Elements/Loading";
import { Fragment, useEffect, useState } from "react";
import Plot from 'react-plotly.js';

export const TestAvgResponseTimeChart = () => {
    const [listUri, setListUri] = useState<string[]>([]);
    const [listAvgTime, setListAvgTime] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvgResponseTimeAPI = async () => {
            try {
                const response = await AvgResponseTimeAPI();
                const uris: string[] = [];
                const avgTimes: number[] = [];

                response.data.results.forEach((resu: { uri: string; avg_time: number; }) => {
                    uris.push(resu.uri);
                    avgTimes.push(resu.avg_time);
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
            <div style={{ height: '600px' }}>
                <Plot
                    data={[
                        {
                            x: listUri,
                            y: listAvgTime,
                            type: 'bar',
                            marker: { color: 'blue' },
                        },
                    ]}
                    layout={{
                        title: 'Average Response Time per API',
                        xaxis: {
                            title: 'API URI',
                            automargin: true,
                        },
                        yaxis: {
                            title: 'Average Response Time',
                            automargin: true,
                            zeroline: true,
                        },
                        margin: {
                            l: 10,
                            r: 50,
                            b: 40,
                            t: 50,
                            pad: 4
                        },
                    }}
                    style={{ width: '100%', height: '100%' }}
                    useResizeHandler={true}
                />
            </div>
        </Fragment>
    );
};
