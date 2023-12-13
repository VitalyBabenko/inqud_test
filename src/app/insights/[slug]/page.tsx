import { calculateReadingPostTime } from '@/utils/calculateReadingPostTime';
import HeadingSection from './_components/headingSection';
import Breadcrumb from '@/_components/breadcrumb';
import ContentSection from './_components/contentSection';

type PostPageProps = {
  params: {
    slug: string;
  };
};

const PostPage = async ({ params: { slug } }: PostPageProps) => {
  const response = await fetch(`http://localhost:3000/api/posts/${slug}`);
  const { post } = await response.json();
  const readingTime = calculateReadingPostTime(post.content).toString();

  return (
    <main>
      <Breadcrumb />
      <HeadingSection title={post.title} readingTime={readingTime} publishDate={post.publishDate} />
      <ContentSection content={post.content} />
    </main>
  );
};

export default PostPage;
