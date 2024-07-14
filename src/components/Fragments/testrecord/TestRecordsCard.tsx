import { TestRecords } from "@/interfaces/api/TestRecords";
import { Fragment } from "react";

export const TestRecordsCard = (record : TestRecords) => {
    return (
        <Fragment>
            <div className="border border-green-500 rounded w-1/2 mx-2 my-2 py-5 px-2">
                {record.id}. <b>{record.description}</b>
            </div>
        </Fragment>
    )
}