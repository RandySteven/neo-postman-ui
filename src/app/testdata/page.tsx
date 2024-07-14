import { Fragment } from "react"
import { Records } from "@/interfaces/api/Record"
import { TestDataCard } from "@/components/Fragments/testdata/TestDataCard"
import { getTestDatas } from "@/api/TestDataApi"

export default async function Page() {
    let results = await getTestDatas()
    let records = results.data.records
    return (
        <Fragment>
            <div className="grid">
                {records.map((record: Records) => (
                    <TestDataCard 
                        id={record.id} 
                        description={record.description} 
                        result_status={record.result_status} 
                        is_saved={record.is_saved} 
                        links={record.links}/>
                ))}
            </div>
        </Fragment>
    )
}