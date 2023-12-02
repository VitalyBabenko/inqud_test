import { performRequest } from '@/lib/datocms';

const ALL_CATEGORIES_QUERY = `
  query GetCategories {
    allCategories {
      id
      name
    }
  }
`;

const getAllCategories = async () => {
  try {
    const { data } = await performRequest({ query: ALL_CATEGORIES_QUERY });
    return data.allCategories;
  } catch (error) {
    console.log(error);
  }
};

export default getAllCategories;
