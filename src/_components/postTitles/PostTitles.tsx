import Link from 'next/link';
import styles from './styles.module.scss';
import { createRef, forwardRef } from 'react';

interface PostTitlesProps {
  titles: string[];
  activeTitle: string;
}

const PostTitles = ({ titles, activeTitle }: PostTitlesProps) => {
  return (
    <div className={styles.asideLeft}>
      <p>Contents</p>
      <ul className={styles.headings}>
        {titles.map((title) => (
          <Link
            key={title}
            href={`#${title}`}
            className={activeTitle === title ? styles.active : ''}
          >
            {title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PostTitles;
