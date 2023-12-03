import { Category } from './category';
import { PostContent } from './postContent';

export type CoverImage = {
  url: string;
};

interface Post {
  id: string;
  publishDate: string;
  slug: string;
  title: string;
  coverImage: CoverImage;
  mainCategory: Category;
  content: PostContent;
}

export { CoverImage, Post };
