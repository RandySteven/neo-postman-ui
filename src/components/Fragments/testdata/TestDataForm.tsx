"use client";

import { createTestData } from "@/api/TestDataApi";
import { TestDataRequest } from "@/interfaces/api/TestDataRequest";
import { FormEvent, Fragment, useState } from "react"


export const TestDataForm = () => {
    const [testDataRequest, setTestDataRequest] = useState<TestDataRequest>({
        method: "POST",
        endpoint: "",
        request_header: "",
        request_body: "",
        expected_response_code: 200,
        expected_response: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTestDataRequest(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const requestData : TestDataRequest = {
            ...testDataRequest,
            request_header: testDataRequest.request_header!=""?JSON.parse(testDataRequest.request_header):null,
            request_body: testDataRequest.request_body!=""?JSON.parse(testDataRequest.request_body):null,
            expected_response: testDataRequest.expected_response!=""?JSON.parse(testDataRequest.expected_response):null
        }
        console.log(requestData)
        const res = await createTestData(requestData)
        console.log(res)
    }

    return <Fragment>
          <form 
          className="h-full w-full my-5 grid content-center border border-blue-500 py-2 pt-6 px-5" 
            method="POST" 
            onSubmit={handleSubmit}
            >
            <div className="flex mb-1">
              <select 
                className="mr-3 flex w-36 py-2 bg-gray-400 text-white border rounded" 
                name="method"
                value={testDataRequest.method}
                onChange={handleChange}
            >
                <option value="POST">POST</option>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input
                name="endpoint"
                type="text"
                className="flex w-36 w-full py-2 px-2 border border-black"
                placeholder="/endpoint"
                value={testDataRequest.endpoint}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <label>Request Header</label>
              <textarea 
                name="request_header" 
                className="w-full border border-blue-500"
                value={testDataRequest.request_header}
                onChange={handleChange}
            ></textarea>
            </div>
            <div className="my-2">
              <label>Request Body</label>
              <textarea
                name="request_body"
                className="w-full border border-blue-500 px-3 py-2"
                rows={8}
                value={testDataRequest.request_body}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex my-2">
              <label className="w-36 py-2">Expected RC</label>
              <input
                name="expected_response_code"
                className="w-full py-2 border border-blue-500 px-2 rounded"
                type="text"
                placeholder="Ex. 200, 400, 500"
                value={testDataRequest.expected_response_code}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <label>Expected Response</label>
              <textarea
                name="expected_response"
                className="w-full border border-blue-500 px-3 py-2"
                rows={8}
                value={testDataRequest.expected_response}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="my-2">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded" type="submit">
                Send
              </button>
            </div>
          </form>
    </Fragment>
}