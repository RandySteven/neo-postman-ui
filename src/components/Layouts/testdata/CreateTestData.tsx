import { TestDataForm } from "@/components/Fragments/testdata/TestDataForm";
import { TestDataResponse } from "@/components/Fragments/testdata/TestDataResponse";
import { TestProvider } from "@/interfaces/context/TestContext";
import { Fragment } from "react";

export const CreateTestData = () => {
  return (
    <>
      <Fragment>
        <TestProvider>
          <div className="grid grid-cols-2 px-2">
            <div className="mx-2">
              <div className="text-center">
                <span className="font-bold text-xl">Test Request</span>
              </div>
              <TestDataForm />
            </div>
            <div className="mx-2">
              <div className="text-center">
                <span className="font-bold text-xl">Final Response</span>
              </div>
              <TestDataResponse />
            </div>
          </div>
        </TestProvider>
      </Fragment>
    </>
  );
};
