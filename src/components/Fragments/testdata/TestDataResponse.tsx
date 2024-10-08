"use client";

import { useTestContext } from "@/interfaces/context/TestContext";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";

export const TestDataResponse = () => {
  const { testResponse } = useTestContext();
  const [resultStatusColor, setResultStatusColor] = useState('')
  const [testRecordRequest, setTestRecordRequest] = useState()
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target instanceof HTMLSelectElement) {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const color = selectedOption.getAttribute('data-bg-color');
      setResultStatusColor(color || '');
    }
  };

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()

  } 

  return (
    <Fragment>
      <form className="h-full w-full my-5 grid content-center border border-green-500 py-2 pt-6 px-5">
        <input type="hidden" name="test_data_id" value={testResponse?.id || ''} />
        <div className="flex mb-1">
          <label className="flex w-36 py-2">Result Status</label>
          <input
            type="text"
            className='flex w-64 w-full py-2 px-2 border border-green-500 rounded'
            placeholder="Expected, Unexpected, Error"
            value={testResponse?.resultStatus || ''}
            readOnly
          />
        </div>
        <div className="flex mb-1">
          <label className="flex w-36 py-2">Response Time</label>
          <input
            type="text"
            className='flex w-64 w-full py-2 px-2 border border-green-500 rounded'
            placeholder="Response time in m.s"
            value={testResponse?.responseTime || ''}
            readOnly
          />
        </div>
        <div className="flex my-2">
          <label className="w-36 py-2">Actual RC</label>
          <input
            className="w-full py-2 border border-green-500 px-2 rounded"
            type="text"
            readOnly
            placeholder="Ex. 200, 400, 500"
            value={testResponse?.actualResponseCode || ''}
          />
        </div>
        <div className="my-2">
          <label>Actual Response</label>
          <div className="my-2 w-full bg-gray-200">
            {/* {testResponse?.actualResponseBody || ''} */}
          </div>
        </div>
        <div className="my-2">
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded">
            Save
          </button>
        </div>
      </form>
    </Fragment>
  );
};
