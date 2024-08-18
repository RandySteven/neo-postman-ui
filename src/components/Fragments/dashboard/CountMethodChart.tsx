'use client'
import { CountMethodAPI } from "@/api/DashboardApi";
import { Loading } from "@/components/Elements/Loading";
import { Fragment, useEffect, useState } from "react"
import Plot from "react-plotly.js";

export const CountMethodChart = () => {
    const [countMethod, setCountMethod] = useState<CountMethodResponse>(
        {
        post: 0,
        get: 0,
        put: 0,
        patch: 0,
        delete: 0
        }
    )   
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
       const fetchCountMethod = async () => {
            try {
                const response = await CountMethodAPI()
                setCountMethod(response.data.results)
            }catch(error) {
                setError('Failed to fetch data');
            }finally {
                setLoading(false)
            }
       }

       fetchCountMethod()
    }, [])

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
    
    return <>
        <Fragment>
        <div style={{ height: '400px' }}>
                <Plot
                    data= {
                        [
                            {
                                x: [countMethod.post],
                                y: ['POST'],
                                marker: {
                                    color: 'yellow'
                                },
                                name: 'POST',
                                type: 'bar',
                                orientation: 'h'
                            },
                            {
                                x: [countMethod.get],
                                y: ['GET'],
                                marker: {
                                    color: 'green'
                                },
                                name: 'GET',
                                type: 'bar',
                                orientation: 'h'
                            },
                            {
                                x: [countMethod.patch],
                                y: ['PATCH'],
                                marker: {
                                    color: 'purple'
                                },
                                name: 'PATCH',
                                type: 'bar',
                                orientation: 'h'
                            },
                            {
                                x: [countMethod.put],
                                y: ['PUT'],
                                marker: {
                                    color: 'blue',
                                },
                                name: 'PUT',
                                type: 'bar',
                                orientation: 'h'
                            },
                            {
                                x: [countMethod.delete],
                                y: ['DELETE'],
                                marker: {
                                    color: 'red'
                                },
                                name: 'DELETE',
                                type: 'bar',
                                orientation: 'h'
                            }
                        ]
                    }
                    layout={{
                        title: 'Count Method',
                        xaxis: {
                            title: 'Count',
                            automargin: true
                        },
                        yaxis: {
                            title: 'Method',
                            automargin: true
                        }
                    }}
                    style={{ width: '100%', height: '100%' }}
                    useResizeHandler={true}
                />
            </div>
        </Fragment>
    </>
}