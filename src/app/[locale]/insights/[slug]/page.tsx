import HeadingSection from './_components/headingSection';
import Breadcrumb from '@/_components/breadcrumb';
import ContentSection from './_components/contentSection';
import Loading from '../loading';
import { performRequest } from '@/lib/datocms';
import { GET_FULL_POST_QUERY } from '@/graphql/getFullPost';

type PostPageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

async function getData(slug: string, locale: string) {
  try {
    const { data } = await performRequest({
      query: GET_FULL_POST_QUERY,
      variables: {
        slug,
        locale,
      },
    });

    return { pageContent: data.postPage, post: data.post };
  } catch (error) {
    console.error('An error occurred while retrieving a post or page content:', error);
    throw error;
  }
}

const PostPage = async ({ params: { slug, locale } }: PostPageProps) => {
  const { pageContent, post } = await getData(slug, locale);

  if (!pageContent) {
    return <Loading />;
  }

  return (
    <main>
      <Breadcrumb />
      <HeadingSection
        backButtonText={pageContent.backButtonText}
        title={post.title}
        timeToRead={post.timeToRead}
        publishDate={post.publishDate}
      />
      <ContentSection
        pageContent={pageContent}
        content={post.content}
        industries={post.industries}
        products={post.products}
        tags={post.allTags}
        authors={post.authors}
      />
    </main>
  );
};

export default PostPage;
