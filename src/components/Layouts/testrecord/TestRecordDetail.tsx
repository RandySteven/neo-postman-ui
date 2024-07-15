import { GetServerSideProps } from 'next';
import { getTestRecordDetail } from "@/api/TestRecordApi"
import { Fragment } from "react"

export interface TestRecordDetailProps {  
    id: string;
    detail: string;
}

export const TestRecordDetail: React.FC<TestRecordDetailProps> = ({ id, detail }) => {
    return (
      <Fragment>
        <h2>Test Record Detail for ID: {id}</h2>
        <p>{detail}</p>
      </Fragment>
    );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    
    try {
      const testRecordJson = await getTestRecordDetail(id as string);
      const testRecordDetail = testRecordJson.record.test_data;
  
      return {
        props: {
          testRecordDetail,
        },
      };
    } catch (error) {
      // Handle error, e.g., return a 404 page or an error message
      return {
        notFound: true,
      };
    }
  };
  