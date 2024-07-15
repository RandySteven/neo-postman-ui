import { GetServerSideProps } from 'next';
import { getTestRecordDetail } from "@/api/TestRecordApi";
import { Fragment } from "react";
import { TestRecordDetail } from '@/components/Layouts/testrecord/TestRecordDetail';

interface PageProps {
  id: string;
  testRecordDetail: string;
}

const Page: React.FC<PageProps> = ({ id, testRecordDetail }) => {
  return (
    <Fragment>
      <div className="px-5 py-2">
        <TestRecordDetail id={id} detail={testRecordDetail} />
      </div>
    </Fragment>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  
  try {
    const testRecordJson = await getTestRecordDetail(id as string);
    const testRecordDetail = testRecordJson.record.test_data;

    return {
      props: {
        id: id as string,
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
