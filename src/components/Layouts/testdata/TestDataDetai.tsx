"use client";

import { getTestDataDetail, saveTestData } from "@/api/TestDataApi";
import { ErrorMessage } from "@/components/Elements/Error";
import { Loading } from "@/components/Elements/Loading";
import { TestDataDetailProps } from "@/interfaces/TestDataDetailProps";
import { TestDataResponse } from "@/interfaces/api/TestDataResponse";
import { stringify } from "json5";
import React, { FormEvent, Fragment, MouseEventHandler, useEffect, useState } from "react";

export const TestDataPage: React.FC<TestDataDetailProps> = ({ params }) => {
    const [testDataRes, setTestDataRes] = useState<TestDataResponse>({
        id: 0,
        endpoint: "",
        is_saved: false,
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

    // const onClick = async (e : MouseEventHandler<HTMLIn>) => {
        // console.log(savedRes.message)
    // }

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

    let methodClass = ""
    if(testDataRes.method == "GET"){
        methodClass = "text-white bg-green-500 ml-4 px-2 py-2 rounded"
    }else if(testDataRes.method == "POST"){
        methodClass = "text-white bg-yellow-500 ml-4 px-2 py-2 rounded"
    }else if(testDataRes.method == "PUT"){
        methodClass = "text-white bg-blue-500 ml-4 px-2 py-2 rounded"
    }else {
        methodClass = "text-white bg-red-500 ml-4 px-2 py-2 rounded"
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
                    <p className="text-l">Method: <span className={methodClass}>{testDataRes?.method}</span> </p>
                </div>
                {testDataRes?.is_saved == false ? (
                    <div>
                        <form method="GET">
                            <input type="button" className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600" value="Save" onClick={async () => {
                                const savedRes = await saveTestData(testDataRes?.id)
                                console.log(savedRes)
                            }}/>
                        </form>
                    </div>
                ) : (
                    <div>
                        <form method="GET">
                            <input type="button" className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600" value="Deleted"/>
                        </form>
                    </div>) 
                }
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
                                <td className="border border-black">{`${value}`}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="my-2">
                    <h1 className="text-xl font-bold">Request Header</h1>
                    <table className="w-full border border-black text-center">
                        <tr className="border border-black">
                            <th className="border border-black">Expected Response Code</th>
                            <th className="border border-black">Actual Response Code</th>
                        </tr>
                        <tr className="border border-black">
                            <td className="border border-black">{testDataRes?.expected_response?.response_code}</td>
                            <td className="border border-black">{testDataRes?.actual_response?.response_code}</td>
                        </tr>
                    </table>
                </div>
                <div className="my-2">
                    <h1 className="text-xl font-bold">Request Body</h1>
                    <pre className="bg-gray-200 py-2 px-2 border border-black">{JSON.stringify(JSON.parse(JSON.stringify(testDataRes?.request_body)), null, 2)}</pre>
                </div>
                
                <div className="my-2 grid grid-cols-2 px-2">
                    <div className="mx-2">
                        <p>Actual response:</p>
                        <pre className="bg-gray-200 py-2 px-2 border border-black">{JSON.stringify(JSON.parse(JSON.stringify(testDataRes?.actual_response?.response_body)), null, 2)}</pre>
                    </div>
                    <div className="mx-2">
                        <p>Expected respose</p>
                        <pre className="bg-gray-200 py-2 px-2 border border-black">{JSON.stringify(JSON.parse(JSON.stringify(testDataRes?.expected_response?.response_body)), null, 2)}</pre>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
