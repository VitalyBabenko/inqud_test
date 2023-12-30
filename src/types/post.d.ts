import { PostContent } from './postContent';
import { Tag } from './tag';

export type CoverImage = {
  url: string;
};

export type Industries = {
  name: string;
};

export type Products = {
  name: string;
};

export type Authors = {
  name: string;
};

interface Post {
  id: string;
  publishDate: string;
  slug: string;
  title: string;
  coverImage: CoverImage;
  mainTag: Tag;
  content: PostContent;
  industries: Industries;
  products: Products;
  authors: Authors;
  timeToRead: Number;
}

export { CoverImage, Post };
