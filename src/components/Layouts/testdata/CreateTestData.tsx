import { TestDataForm } from "@/components/Fragments/testdata/TestDataForm";
import { TestDataResponse } from "@/components/Fragments/testdata/TestDataResponse";
import { Fragment } from "react";

export const CreateTestData = () => {
  return (
    <>
      <Fragment>
        <div className="grid grid-cols-2 px-2">
          <div className="mx-2">
            <TestDataForm />
          </div>
          <div className="mx-2">
            <TestDataResponse />
          </div>
        </div>
      </Fragment>
    </>
  );
};
