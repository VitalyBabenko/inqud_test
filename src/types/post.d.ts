import { PostContent } from './postContent';
import { Tag } from './tag';

export type CoverImage = {
  url: string;
};

interface Post {
  id: string;
  publishDate: string;
  slug: string;
  title: string;
  coverImage: CoverImage;
  mainTag: Tag;
  content: PostContent;
}

export { CoverImage, Post };
