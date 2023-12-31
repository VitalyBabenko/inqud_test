import HeadingSection from './_components/headingSection';
import Breadcrumb from '@/_components/breadcrumb';
import ContentSection from './_components/contentSection';

const URL = process.env.NEXT_PUBLIC_API_URL;

type PostPageProps = {
  params: {
    slug: string;
  };
};

const PostPage = async ({ params: { slug } }: PostPageProps) => {
  const response = await fetch(`${URL}/api/posts/${slug}`);
  const { post } = await response.json();

  return (
    <main>
      <Breadcrumb />
      <HeadingSection
        title={post.title}
        readingTime={post.readingTime}
        publishDate={post.publishDate}
      />
      <ContentSection
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
