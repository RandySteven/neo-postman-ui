"use client";

import { createTestData } from "@/api/TestDataApi";
import { TestDataRequest } from "@/interfaces/api/TestDataRequest";
import { useTestContext } from "@/interfaces/context/TestContext";
import { FormEvent, Fragment, useState, ChangeEvent, useEffect } from "react";

interface KeyValue {
  key: string;
  value: string;
  isJson: boolean;
}

export const TestDataForm = () => {
  const [testDataRequest, setTestDataRequest] = useState<TestDataRequest>({
    method: "POST",
    path: "",
    description: "",
    request_header: "",
    request_body: "",
    expected_response_code: 200,
    expected_response: "",
  });

  const { setTestResponse } = useTestContext();

  const [requestHeaders, setRequestHeaders] = useState<KeyValue[]>([]);
  const [requestBody, setRequestBody] = useState<KeyValue[]>([]);
  const [expectedResponse, setExpectedResponse] = useState<KeyValue[]>([]);
  const [bgColor, setBgColor] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestDataRequest(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (e.target instanceof HTMLSelectElement) {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const color = selectedOption.getAttribute('data-bg-color');
      setBgColor(color || '');
    }
  };

  useEffect(() => {
    const select = document.getElementById('method') as HTMLSelectElement;
    const initialSelectedOption = select.options[select.selectedIndex];
    setBgColor(initialSelectedOption.getAttribute('data-bg-color') || '');
  }, [testDataRequest.method]);

  const handleTableChange = (index: number, type: string, key: string, value: string, isJson: boolean) => {
    const updateTableData = (data: KeyValue[], setData: (data: KeyValue[]) => void) => {
      const newData = [...data];
      newData[index] = { key, value, isJson };
      setData(newData);
    };

    if (type === 'requestHeader') {
      updateTableData(requestHeaders, setRequestHeaders);
    } else if (type === 'requestBody') {
      updateTableData(requestBody, setRequestBody);
    } else if (type === 'expectedResponse') {
      updateTableData(expectedResponse, setExpectedResponse);
    }
  };

  const addRow = (type: string) => {
    const addToTableData = (data: KeyValue[], setData: (data: KeyValue[]) => void) => {
      setData([...data, { key: "", value: "", isJson: false }]);
    };

    if (type === 'requestHeader') {
      addToTableData(requestHeaders, setRequestHeaders);
    } else if (type === 'requestBody') {
      addToTableData(requestBody, setRequestBody);
    } else if (type === 'expectedResponse') {
      addToTableData(expectedResponse, setExpectedResponse);
    }
  };

  const removeRow = (index: number, type: string) => {
    const removeFromTableData = (data: KeyValue[], setData: (data: KeyValue[]) => void) => {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
    };

    if (type === 'requestHeader') {
      removeFromTableData(requestHeaders, setRequestHeaders);
    } else if (type === 'requestBody') {
      removeFromTableData(requestBody, setRequestBody);
    } else if (type === 'expectedResponse') {
      removeFromTableData(expectedResponse, setExpectedResponse);
    }
  };

  const convertTableDataToJson = (data: KeyValue[]) => {
    const jsonObject: { [key: string]: any } = {};
    data.forEach(({ key, value, isJson }) => {
      jsonObject[key] = isJson ? JSON.parse(value) : value;
    });
    return jsonObject;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestData: TestDataRequest = {
      ...testDataRequest,
      expected_response_code: Number(testDataRequest.expected_response_code),
      request_header: requestHeaders.length ? convertTableDataToJson(requestHeaders) : null,
      request_body: requestBody.length ? convertTableDataToJson(requestBody) : null,
      expected_response: expectedResponse.length ? convertTableDataToJson(expectedResponse) : null,
    };
    console.log(JSON.stringify(requestData));
    const res = await createTestData(requestData);
    console.log(res);

    const response = res.data.test_result;
    setTestResponse({
      resultStatus: response.result_status,
      actualResponseCode: response.actual_response_code || '',
      actualResponse: response.actual_response || '',
    });

    localStorage.setItem("resultStatus", response.result_status);
    if (response.actual_response_code != null) {
      localStorage.setItem("actualResponseCode", response.actual_response_code);
    }
    if (response.actual_response != null) {
      localStorage.setItem("actualResponse", response.actual_response);
    }
  };

  const renderTable = (data: KeyValue[], type: string) => (
    <table className="w-full border border-blue-500">
      <thead>
        <tr>
          <th className="border border-blue-500 p-2">Key</th>
          <th className="border border-blue-500 p-2">Value</th>
          <th className="border border-blue-500 p-2">Is JSON</th>
          <th className="border border-blue-500 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td className="border border-blue-500 p-2">
              <input
                placeholder="key"
                type="text"
                className="w-full p-1 border border-black rounded"
                value={row.key}
                onChange={(e) => handleTableChange(index, type, e.target.value, row.value, row.isJson)}
              />
            </td>
            <td className="border border-blue-500 p-2">
              <input
                type="text"
                className="w-full p-1 border border-black rounded"
                value={row.value}
                onChange={(e) => handleTableChange(index, type, row.key, e.target.value, row.isJson)}
              />
            </td>
            <td className="border border-blue-500 p-2 text-center">
              <input
                type="checkbox"
                checked={row.isJson}
                onChange={(e) => handleTableChange(index, type, row.key, row.value, e.target.checked)}
              />
            </td>
            <td className="border border-blue-500 p-2 text-center">
              <button type="button" onClick={() => removeRow(index, type)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded">
                Remove
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={4} className="text-center p-2">
            <button type="button" onClick={() => addRow(type)} className="bg-blue-500 text-white hover:bg-blue-600 px-2 py-2 rounded">
              Add Row
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <Fragment>
      <form className="h-full w-full my-5 grid content-center border border-blue-500 py-2 pt-6 px-5" method="POST" onSubmit={handleSubmit}>
        <div className="flex mb-1">
          <select
            id="method"
            className="mr-3 flex w-36 py-2 bg-gray-400 text-white border rounded"
            name="method"
            value={testDataRequest.method}
            onChange={handleChange}
            style={{ backgroundColor: bgColor }}
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
          <label>Description</label>
          <textarea
            name="description"
            className="w-full border border-blue-500 px-3 py-2"
            rows={4}
            value={testDataRequest.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="my-2">
          <label>Request Header</label>
          {renderTable(requestHeaders, "requestHeader")}
        </div>
        <div className="my-2">
          <label>Request Body</label>
          {renderTable(requestBody, "requestBody")}
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
          {renderTable(expectedResponse, "expectedResponse")}
        </div>
        <div className="my-2">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded" type="submit">
            Send
          </button>
        </div>
      </form>
    </Fragment>
  );
};
