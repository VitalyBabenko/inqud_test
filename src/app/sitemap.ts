interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

const getSortedPostsData = async () => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('Please define the NEXT_PUBLIC_API_URL environment variable inside .env.local');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  return (await response.json()) as Post[];
};

const URL = process.env.NEXT_PUBLIC_SITE_URL;

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
export default async function sitemap() {
  const posts = (await getSortedPostsData()).map(({ id }) => ({
    url: `${URL}/blog/${id}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', '/example-page', '/blog'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
