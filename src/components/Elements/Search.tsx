import { Fragment } from "react"

export const Search = () => {
    return <>
        <Fragment>
            <div className="w-full px-2 py2 ">
                <form className="w-full flex mx-2 content-center">
                    <input className="w-2/3 rounded px-2 py-4 border border-black bg-gray-300 text-black mr-2" type="text" />
                    <button type="submit" className="1/3 bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600 ml-4">Search</button>
                </form>
            </div>
        </Fragment>
    </>
}