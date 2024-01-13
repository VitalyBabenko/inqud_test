import HeadingSection from './_components/headingSection';
import Breadcrumb from '@/_components/breadcrumb';
import ContentSection from './_components/contentSection';
import { useLocale } from 'next-intl';

type PostPageProps = {
  params: {
    slug: string;
  };
};

const PostPage = async ({ params: { slug } }: PostPageProps) => {
  const locale = useLocale();

  async function getData() {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${URL}/api/insights/${slug}?locale=${locale}`);
    return await response.json();
  }

  const { pageContent, post } = await getData();

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
