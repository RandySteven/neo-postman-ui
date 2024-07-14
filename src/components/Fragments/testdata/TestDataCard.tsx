'use client'

import { Records } from "@/interfaces/api/Record";
import { Fragment, useState } from "react";

export const TestDataCard = (record : Records) => {
    // let [resultStatusClass, setResultStatusClass] = useState<string>("bg-blue-500")
    // if(record.result_status == "expected") {
    //     setResultStatusClass("text-white bg-green-500")
    // }else if(record.result_status == "unexpected") {
    //     setResultStatusClass("text-white bg-yellow-500")
    // }
    let resultStatusClass = ""
    if(record.result_status == "expected") {
        resultStatusClass=("text-white bg-green-500")
    }else if(record.result_status == "unexpected") {
        resultStatusClass=("text-white bg-yellow-500")
    }
    return <Fragment>
        <div className="border border-blue-200 hover:border-blue-300 rounded w-1/2 my-2 py-4 content-center">
            {record.id}. {record.description} <span className={resultStatusClass}>{record.result_status}</span>
        </div>
    </Fragment>
}