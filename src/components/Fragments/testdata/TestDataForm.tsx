import { Fragment } from "react"

export const TestDataForm = () => {
    return <Fragment>
          <form className="h-full w-full my-5 grid content-center border border-blue-500 py-2 pt-6 px-5">
            <div className="flex mb-1">
              <select className="mr-3 flex w-36 py-2 bg-gray-400 text-white border rounded">
                <option value="POST">POST</option>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input
                type="text"
                className="flex w-36 w-full py-2 px-2 border border-black"
                placeholder="/endpoint"
              />
            </div>
            <div className="my-2">
              <label>Request Header</label>
              <textarea className="w-full border border-blue-500"></textarea>
            </div>
            <div className="my-2">
              <label>Request Body</label>
              <textarea
                className="w-full border border-blue-500 px-3 py-2"
                rows={8}
              ></textarea>
            </div>
            <div className="flex my-2">
              <label className="w-36 py-2">Expected RC</label>
              <input
                className="w-full py-2 border border-blue-500 px-2 rounded"
                type="text"
                placeholder="Ex. 200, 400, 500"
              />
            </div>
            <div className="my-2">
              <label>Expected Response</label>
              <textarea
                className="w-full border border-blue-500 px-3 py-2"
                rows={8}
              ></textarea>
            </div>
            <div className="my-2">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded">
                Send
              </button>
            </div>
          </form>
    </Fragment>
}