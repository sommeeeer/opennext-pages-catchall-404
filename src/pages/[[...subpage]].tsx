import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';

export function getServerSideProps(context: GetServerSidePropsContext) {
  // Access the subpage parameter from context.params
  const subpage = context.params?.subpage || [];

  return {
    props: {
      subpage,
    },
  };
}

export default function Page({
  subpage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>We are inside a dynamic optional catch all route: {Array.isArray(subpage) ? subpage.join(', ') : subpage}</div>;
}
