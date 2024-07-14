import { TestRecords } from "@/interfaces/api/TestRecords";
import { Fragment } from "react";

export const TestRecordsCard = (record : TestRecords) => {
    return (
        <Fragment>
            <div>
                {record.id}
            </div>
        </Fragment>
    )
}