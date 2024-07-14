"use client";

import { TestDataRequest } from "@/interfaces/api/TestDataRequest";
import { FormEvent, Fragment, useState } from "react"


export const TestDataForm = () => {
    const [testDataRequest, setTestDataRequest] = useState<TestDataRequest>({
        method: "POST",
        endpoint: "",
        requestHeader: "",
        requestBody: "",
        expectedResponseCode: 200,
        expectedResponse: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTestDataRequest(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(testDataRequest)
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
                name="requestHeader" 
                className="w-full border border-blue-500"
                value={testDataRequest.requestHeader}
                onChange={handleChange}
            ></textarea>
            </div>
            <div className="my-2">
              <label>Request Body</label>
              <textarea
                name="requestBody"
                className="w-full border border-blue-500 px-3 py-2"
                rows={8}
                value={testDataRequest.requestBody}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex my-2">
              <label className="w-36 py-2">Expected RC</label>
              <input
                name="expectedResponseCode"
                className="w-full py-2 border border-blue-500 px-2 rounded"
                type="text"
                placeholder="Ex. 200, 400, 500"
                value={testDataRequest.expectedResponseCode}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <label>Expected Response</label>
              <textarea
                name="expectedResponse"
                className="w-full border border-blue-500 px-3 py-2"
                rows={8}
                value={testDataRequest.expectedResponse}
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