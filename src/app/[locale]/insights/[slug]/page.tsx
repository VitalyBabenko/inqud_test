import HeadingSection from './_components/headingSection';
import Breadcrumb from '@/_components/breadcrumb';
import ContentSection from './_components/contentSection';

type PostPageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

async function getData(slug: string, locale: string) {
  try {
    const URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${URL}/api/insights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug,
        locale,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('An error occurred while retrieving a post or page content:', error);
    throw error;
  }
}

const PostPage = async ({ params: { slug, locale } }: PostPageProps) => {
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
