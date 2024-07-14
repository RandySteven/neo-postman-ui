import { getTestRecords } from "@/api/TestRecordApi"
import { TestRecordsCard } from "@/components/Fragments/testrecord/TestRecordsCard"
import { TestRecords } from "@/interfaces/api/TestRecords"
import { Fragment } from "react"

export default async function Page() {
    let results = await getTestRecords()
    let records = results.data.records
    return (
        <Fragment>
            <div className="grid">
                {records.map((record: TestRecords) => (
                    <TestRecordsCard 
                        id={record.id}
                        description={record.description}
                        links={record.links} endpoint={record.endpoint}                    
                    />
                ))}
            </div>
        </Fragment>
    )
}