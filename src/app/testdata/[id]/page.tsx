"use client";

import { TestDataPage } from "@/components/Layouts/testdata/TestDataDetai";
import { TestDataDetailProps } from "@/interfaces/TestDataDetailProps";
import { Fragment } from "react";

export default function TestDataDetailPage({ params }: TestDataDetailProps) {
    
    return <>
        <Fragment>
            <TestDataPage params={params} />
        </Fragment>
    </>
}