"use client";

import { createTestData } from "@/api/TestDataApi";
import JsonTextarea from "@/components/Elements/TextArea";
import { TestDataRequest } from "@/interfaces/api/TestDataRequest";
import { FormEvent, Fragment, useState, ChangeEvent, useEffect } from "react"


export const TestDataForm = () => {
    const [testDataRequest, setTestDataRequest] = useState<TestDataRequest>({
        method: "POST",
        path: "",
        description: "test",
        request_header: "",
        request_body: "",
        expected_response_code: 200,
        expected_response: "",
    })
    const [bgColor, setBgColor] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      // const selectedTarget = e.target as HTMLSelectElement;
      // const selectedOption = selectedTarget.options[selectedTarget.selectedIndex] 
      // const color = selectedOption.getAttribute('data-bg-color');
      // setBgColor(color || '');  
      const { name, value } = e.target;
        setTestDataRequest(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
      // Set initial background color based on the first option
      const select = document.getElementById('method') as HTMLSelectElement;
      const initialSelectedOption = select.options[select.selectedIndex];
      setBgColor(initialSelectedOption.getAttribute('data-bg-color') || '');
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const requestData : TestDataRequest = {
            ...testDataRequest,
            expected_response_code: Number(testDataRequest.expected_response_code),
            request_header: testDataRequest.request_header!=""?JSON.parse(testDataRequest.request_header):null,
            request_body: testDataRequest.request_body!=""?JSON.parse(testDataRequest.request_body):null,
            expected_response: testDataRequest.expected_response!=""?JSON.parse(testDataRequest.expected_response):null
        }
        console.log(JSON.stringify(requestData))
        const res = await createTestData(requestData)
        console.log(res)
        localStorage.setItem("resultStatus", res.data.test_result.result_status)
        if(res.data.test_result.actual_response_code != null){
          localStorage.setItem("actualResponseCode", res.data.test_result.actual_response_code)
        }
        if(res.data.test_result.actual_response != null) {
          localStorage.setItem("actualResponse", res.data.test_result.actual_response)
        }
    }

    return <Fragment>
          <form 
          className="h-full w-full my-5 grid content-center border border-blue-500 py-2 pt-6 px-5" 
            method="POST" 
            onSubmit={handleSubmit}
            >
            <div className="flex mb-1">
              <select 
                id="method"
                className="mr-3 flex w-36 py-2 bg-gray-400 text-white border rounded" 
                name="method"
                value={testDataRequest.method}
                onChange={handleChange}
                style={{backgroundColor: bgColor}}
            >
                <option value="POST" data-bg-color="orange">POST</option>
                <option value="GET" data-bg-color="green">GET</option>
                <option value="PUT" data-bg-color="blue">PUT</option>
                <option value="DELETE" data-bg-color="red">DELETE</option>
              </select>
              <input
                name="path"
                type="text"
                className="flex w-36 w-full py-2 px-2 border border-black"
                placeholder="/endpoint"
                value={testDataRequest.path}
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
              <JsonTextarea 
                              name="expected_response"
                              className="w-full border border-blue-500 px-3 py-2"
                              rows={8}
                              value={testDataRequest.expected_response}
                              onChange={handleChange}
              />
              {/* <textarea name="expected_response"
                              className="w-full border border-blue-500 px-3 py-2"
                              rows={8}
                              value={testDataRequest.expected_response}
                              onChange={handleChange}></textarea> */}
            </div>
            <div className="my-2">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded" type="submit">
                Send
              </button>
            </div>
          </form>
    </Fragment>
}