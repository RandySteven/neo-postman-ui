"use client";

import { getTestDataDetail } from "@/api/TestDataApi";
import { ErrorMessage } from "@/components/Elements/Error";
import { Loading } from "@/components/Elements/Loading";
import { TestDataDetailProps } from "@/interfaces/TestDataDetailProps";
import { TestDataResponse } from "@/interfaces/api/TestDataResponse";
import React, { Fragment, useEffect, useState } from "react";

export const TestDataPage: React.FC<TestDataDetailProps> = ({ params }) => {
    const [testDataRes, setTestDataRes] = useState<TestDataResponse>({
        id: 0,
        endpoint: "",
        method: "",
        description: "",
        result_status: "",
        request_body: null,
        request_header: null,
        actual_response: null,
        expected_response: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestDataRes = async () => {
            try {
                const results = await getTestDataDetail(params.id);
                setTestDataRes(results.data.record);
                console.log(testDataRes.result_status)
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchTestDataRes();

    }, [params.id]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage error={error} />;
    }

    let resultStatusClass = ""
    if(testDataRes.result_status == "expected") {
        resultStatusClass=("text-white bg-green-500 ml-4 px-2 py-2 rounded")
    }else if(testDataRes.result_status == "unexpected") {
        resultStatusClass=("text-white bg-yellow-500 ml-4 px-2 py-2 rounded")
    }

    return (
        <Fragment>
            <div className="grid">
                <div className="my-2">
                    <h1 className="text-xl font-bold">Test Data ID: {testDataRes?.id}</h1>
                </div>
                <div className="my-2">
                    <p className="text-l">Status: <span className={resultStatusClass}>{testDataRes?.result_status}</span> </p>
                </div>
                <div className="my-2">
                    <h1 className="text-xl font-bold">Request Header</h1>
                    <table className="w-full border border-black text-center">
                        <tr className="border border-black">
                            <th className="border border-black">Key</th>
                            <th className="border border-black">Value</th>
                        </tr>
                        {Object.entries(testDataRes?.request_header || {}).map(([key, value])  => (
                            <tr className="border border-black">
                                <td className="border border-black">{key}</td>
                                <td className="border border-black">{value}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="my-2">
                    <h1 className="text-xl font-bold">Request Body</h1>
                    <pre className="bg-gray-200 py-2 px-2 border border-black">{JSON.stringify(JSON.parse(JSON.stringify(testDataRes?.request_body)), null, 2)}</pre>
                </div>
                
                <div className="my-2 grid grid-cols-2 px-2">
                    <div className="mx-2">
                        <p>Actual response:</p>
                        <pre className="bg-gray-200 py-2 px-2 border border-black">{JSON.stringify(JSON.parse(JSON.stringify(testDataRes?.actual_response)), null, 2)}</pre>
                    </div>
                    <div className="mx-2">
                        <p>Expected respose</p>
                        <pre className="bg-gray-200 py-2 px-2 border border-black">{JSON.stringify(JSON.parse(JSON.stringify(testDataRes?.expected_response)), null, 2)}</pre>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
