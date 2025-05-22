import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPathsResult,
} from 'next';

const validRootPages = ['reklamation', 'about', 'contact'];

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const rootPaths = validRootPages.map(page => ({
    params: { subpage: [page] }
  }));
  
  const paths = [
    { params: { subpage: [] } }, 
    ...rootPaths,
  ];

  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const subpage = context.params?.subpage as string[] || [];

  if (subpage.length === 0) {
    // Handle the root page
    return {
      props: {
        subpage: [],
        pageType: 'home',
      },
    };
  }
  if (subpage.length === 1 && validRootPages.includes(subpage[0])) {
    // Handle the root page with a valid subpage
    return {
      props: {
        subpage,
        pageType: 'root',
      },
    };
  }
  
  return { notFound: true };
}

export default function Page({
  subpage,
  pageType,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>{pageType === 'home' ? 'Homepage' : `Root page: ${subpage}`}</h1>
      <p>Path: {subpage.join('/')}</p>
    </div>
  );
}
