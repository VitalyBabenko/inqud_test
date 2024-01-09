import HeadingSection from './_components/headingSection';
import Breadcrumb from '@/_components/breadcrumb';
import ContentSection from './_components/contentSection';
import { useLocale } from 'next-intl';

type PostPageProps = {
  params: {
    slug: string;
  };
};

async function getData(slug: string, locale: string) {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${URL}/api/insights/${slug}?locale=${locale}`);
  return await response.json();
}

const PostPage = async ({ params: { slug } }: PostPageProps) => {
  const locale = useLocale();
  const { pageContent, post } = await getData(slug, locale);

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
