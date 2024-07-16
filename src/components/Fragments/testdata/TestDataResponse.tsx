"use client";

import { useTestContext } from "@/interfaces/context/TestContext";
import { Fragment } from "react";

export const TestDataResponse = () => {
  const { testResponse } = useTestContext();

  return (
    <Fragment>
      <form className="h-full w-full my-5 grid content-center border border-green-500 py-2 pt-6 px-5">
        <div className="flex mb-1">
          <label className="flex w-36 py-2">Result Status</label>
          <input
            type="text"
            className="flex w-64 w-full py-2 px-2 border border-green-500 rounded"
            placeholder="Expected, Unexpected, Error"
            value={testResponse?.resultStatus || ''}
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
          <textarea
            className="w-full border border-green-500 px-3 py-2"
            rows={8}
            readOnly
            value={testResponse?.actualResponse || ''}
          ></textarea>
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
