import { TestAvgResponseTimeChart } from "@/components/Fragments/dashboard/AvgResponseTimeAPIChart";
import { TestResultCountChart } from "@/components/Fragments/dashboard/ResultCountChart";
import { Fragment } from "react";

export default function Page() {
    return (
        <Fragment>
            <TestResultCountChart />
            <TestAvgResponseTimeChart />
        </Fragment>
    )
}