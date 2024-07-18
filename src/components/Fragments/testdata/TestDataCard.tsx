'use client'

import { TestDataResponse } from "@/interfaces/api/Record";
import Link from "next/link";
import { Fragment, useState } from "react";

export const TestDataCard = (record : TestDataResponse) => {
   let resultStatusClass = ""
    if(record.result_status == "expected") {
        resultStatusClass=("text-white bg-green-500 ml-4 px-2 py-2 rounded")
    }else if(record.result_status == "unexpected") {
        resultStatusClass=("text-white bg-yellow-500 ml-4 px-2 py-2 rounded")
    }
    return <Fragment>
        <div className="border border-blue-200 hover:border-blue-300 rounded w-1/2 my-2 py-4 content-center px-3">
            <Link href={`/testdata/${record.id}`}>
                {record.id}. {record.description} <span className={resultStatusClass}>{record.result_status}</span>
            </Link>
        </div>
    </Fragment>
}