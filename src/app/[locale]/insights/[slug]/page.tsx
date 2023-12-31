import HeadingSection from './_components/headingSection';
import Breadcrumb from '@/_components/breadcrumb';
import ContentSection from './_components/contentSection';
import { Post } from '@/types/post';

type PostPageProps = {
  params: {
    slug: string;
  };
};

async function getData(slug: string) {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${URL}/api/posts/${slug}`);

  const { post } = await response.json();
  return post;
}

const PostPage = async ({ params: { slug } }: PostPageProps) => {
  const post: Post = await getData(slug);

  return (
    <main>
      <Breadcrumb />
      <HeadingSection
        title={post.title}
        timeToRead={post.timeToRead}
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
