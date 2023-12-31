import { PostContent } from './postContent';
import { Tag } from './tag';

export type CoverImage = {
  url: string;
};

export type Industry = {
  name: string;
};

export type Product = {
  name: string;
};

export type Author = {
  name: string;
};

export type PostContent = {
  title: string;
  text: StructuredTextGraphQlResponse;
  image: ImageBitmap | null;
};

interface Post {
  id: string;
  publishDate: string;
  slug: string;
  title: string;
  coverImage: CoverImage;
  mainTag: Tag;
  content: PostContent;
  industries: Industry[];
  products: Product[];
  authors: Author[];
  allTags: Tag[];
  timeToRead: number;
}

export { CoverImage, Post };
