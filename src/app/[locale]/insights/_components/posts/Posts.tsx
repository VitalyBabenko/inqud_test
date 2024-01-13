import { Post } from '@/types/post';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from '@/_components/link';

interface PostsProps {
  posts: Post[];
  emptyPostsText: string;
  timeToReadText: string;
}

const Posts = ({ posts, emptyPostsText, timeToReadText }: PostsProps) => {
  if (!posts?.length) {
    return (
      <div className={styles.postsEmpty}>
        <h5>{emptyPostsText}</h5>
      </div>
    );
  }

  return (
    <div className={styles.posts}>
      {posts.map((post) => (
        <Link className={styles.post} href={`/insights/${post.slug}`} key={post.id}>
          <div className={styles.imageWrapper}>
            <Image src={post.coverImage.url} alt="cover-image" width={370} height={250} />
          </div>

          <p>{post.mainTag.name}</p>
          <h3>{post.title}</h3>
          <div className={styles.postFooter}>
            <span>{post.publishDate}</span>
            <Image src="/dot.svg" alt="dot" width={4} height={4} />
            <span>
              {post.timeToRead.toString()} {timeToReadText}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
