import { TestAvgResponseTimeChart } from "@/components/Fragments/dashboard/AvgResponseTimeAPIChart"
import { CountMethodChart } from "@/components/Fragments/dashboard/CountMethodChart"
import { TestResultCountChart } from "@/components/Fragments/dashboard/ResultCountChart"
import { Fragment } from "react"

export const Dashboard = () => {
    return <>
        <Fragment>
            <div>
                <div className="flex-grow p-6 overflow-auto bg-gray-200">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 bg-white border border-gray-300">
                            <TestAvgResponseTimeChart />
                        </div>
                        <div className="col-span-1 bg-white border border-gray-300">
                            <CountMethodChart />
                        </div>
                        <div className="col-span-2 bg-white border border-gray-300">
                            <TestResultCountChart />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    </>
}