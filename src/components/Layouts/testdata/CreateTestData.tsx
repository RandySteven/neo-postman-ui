import { TestDataForm } from "@/components/Fragments/testdata/TestDataForm";
import { TestDataResponse } from "@/components/Fragments/testdata/TestDataResponse";
import { TestProvider } from "@/interfaces/context/TestContext";
import { FC, Fragment, ReactNode } from "react";
 
interface TitleProps {
  children?: ReactNode;
}

const TestDataTitle: FC<TitleProps> = (props: TitleProps) => {
  return(
    <Fragment>
      <div className="text-center">
        <span className="font-bold text-xl">{props.children}</span>
      </div>
    </Fragment>
  )
}

export const CreateTestData = () => {
  return (
    <>
      <Fragment>
        <TestProvider>
          <div className="grid grid-cols-2 px-2">
            <div className="mx-2">
              <TestDataTitle>
                Test Data Request
              </TestDataTitle>
              <TestDataForm />
            </div>
            <div className="mx-2">
              <TestDataTitle>
                Test Response
              </TestDataTitle>
              <TestDataResponse />
            </div>
          </div>
        </TestProvider>
      </Fragment>
    </>
  );
};
