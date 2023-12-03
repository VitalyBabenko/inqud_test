import { performRequest } from '@/lib/datocms';

const GET_POSTS_QUERY = `
    query GetPosts {
      allPosts {
        id
        publishDate
        slug
        title
        coverImage {
          url
        }
        mainCategory {
          name
        }
        content {
          value
        }
      }
    }
`;

const getPosts = async () => {
  try {
    const { data } = await performRequest({ query: GET_POSTS_QUERY });
    return data.allPosts;
  } catch (error) {
    console.log(error);
  }
};

export default getPosts;
