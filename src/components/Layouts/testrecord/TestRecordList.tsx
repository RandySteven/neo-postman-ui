"use client";

import { getTestRecords } from "@/api/TestRecordApi";
import { Loading } from "@/components/Elements/Loading";
import { TestRecordsCard } from "@/components/Fragments/testrecord/TestRecordsCard";
import { TestRecords } from "@/interfaces/api/TestRecords";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";

export const TestRecordList = () => {
    const [records, setRecords] = useState<TestRecords[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                let results = await getTestRecords();
                setRecords(results.data.records);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    if (loading) return <div className="content-center"><Loading /></div>;
    if (error) return <div>{error}</div>;

    return (
        <Fragment>
            <div className="grid content-center">
                {records == null ? ( // Check for empty array using length
                    <p>No records found. {}
                    <Link href="/testdata/create" className="text-blue-500 hover:text-blue-600">
                        create one
                    </Link></p> // Display a placeholder message
                ) : (
                records.map((record: TestRecords) => (
                    <TestRecordsCard
                        key={record.id}
                        id={record.id}
                        description={record.description}
                        links={record.links}
                        endpoint={record.endpoint}
                    />
                    ))
                )}
            </div>
        </Fragment>
    );
};
