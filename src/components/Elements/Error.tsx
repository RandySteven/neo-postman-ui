import { Fragment } from "react"

interface ErrorMessage {
    error: string
}

export const ErrorMessage = (errMessage: ErrorMessage) => {
    return <>
        <Fragment>
            <div className="bg-red-200 text-red-600 px-6 py-2 text-center">
                {errMessage.error}
            </div>
        </Fragment>
    </>
}