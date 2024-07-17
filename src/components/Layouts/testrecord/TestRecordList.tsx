"use client";

import { getTestRecords } from "@/api/TestRecordApi";
import { Loading } from "@/components/Elements/Loading";
import { TestRecordsCard } from "@/components/Fragments/testrecord/TestRecordsCard";
import { TestRecords } from "@/interfaces/api/TestRecords";
import { Fragment, useEffect, useState } from "react";

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
                {records.map((record: TestRecords) => (
                    <TestRecordsCard
                        key={record.id} // Adding a key for each component
                        id={record.id}
                        description={record.description}
                        links={record.links}
                        endpoint={record.endpoint}
                    />
                ))}
            </div>
        </Fragment>
    );
};
