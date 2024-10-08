import { TestRecords } from "@/interfaces/api/TestRecords";
import Link from "next/link";
import { Fragment } from "react";

export const TestRecordsCard = (record : TestRecords) => {
    return (
        <Fragment>
            <div className="border border-green-500 rounded w-1/2 mx-2 my-2 py-5 px-5">
                {record.id}. <b>{record.endpoint}</b>
                <div className="text-bold">
                    {record.description}
                </div>
                <div className="my-2">
                    <Link href={`/testrecord/${record.id}`} className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600">See detail</Link>
                </div>
            </div>
        </Fragment>
    )
}