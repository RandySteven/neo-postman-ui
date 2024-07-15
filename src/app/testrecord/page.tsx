import { getTestRecords } from "@/api/TestRecordApi"
import { TestRecordsCard } from "@/components/Fragments/testrecord/TestRecordsCard"
import { TestRecordList } from "@/components/Layouts/testrecord/TestRecordList"
import { TestRecords } from "@/interfaces/api/TestRecords"
import { Fragment } from "react"

export default async function Page() {
    return (
        <Fragment>
            <div className="px-5 py-2">
                <TestRecordList />
            </div>
        </Fragment>
    )
}