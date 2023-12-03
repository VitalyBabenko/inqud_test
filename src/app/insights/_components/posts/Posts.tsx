import { Post } from '@/types/post';
import styles from './styles.module.scss';
import Image from 'next/image';
import { calculateReadingPostTime } from '@/utils/calculateReadingPostTime';
import Link from 'next/link';

interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <div className={styles.posts}>
      {posts.map((post) => (
        <Link className={styles.post} href={`/insights/${post.slug}`} key={post.id}>
          <Image src={post.coverImage.url} alt="cover-image" width={370} height={221} />
          <p>{post.mainCategory.name}</p>
          <h3>{post.title}</h3>
          <div className={styles.postFooter}>
            <span>{post.publishDate}</span>
            <Image src="/dot.svg" alt="dot" width={4} height={4} />
            <span>{calculateReadingPostTime(post.content)} min read</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
