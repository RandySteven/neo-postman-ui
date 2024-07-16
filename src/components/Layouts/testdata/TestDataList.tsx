"use client";

import { Fragment, useEffect, useState } from "react"
import { TestDataResponse } from "@/interfaces/api/Record"
import { TestDataCard } from "@/components/Fragments/testdata/TestDataCard"
import { getTestDatas } from "@/api/TestDataApi"

export const TestDataList = () => {
    const [testDataResponses, setTestDataResponses] = useState<TestDataResponse[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestResponses = async () => {
            try {
                let results = await getTestDatas()
                setTestDataResponses(results.data.records)
            }catch(error) {
                setError('Failed to fetch data')
            }finally {
                setLoading(false)
            }
        }

        fetchTestResponses();
    }, []);

    if (loading) return <div className="content-center">Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Fragment>
            <div className="grid">
                {testDataResponses.map((record: TestDataResponse) => (
                    <TestDataCard 
                        id={record.id} 
                        description={record.description} 
                        result_status={record.result_status} 
                        is_saved={record.is_saved} 
                        links={record.links}/>
                ))}
            </div>
        </Fragment>
    )
}