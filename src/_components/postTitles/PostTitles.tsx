import Link from '../link/Link';
import styles from './styles.module.scss';

interface PostTitlesProps {
  titles: string[];
  activeTitle: string;
  leftAsideTitle: string;
}

const PostTitles = ({ titles, activeTitle, leftAsideTitle }: PostTitlesProps) => {
  return (
    <div className={styles.asideLeft}>
      <p>{leftAsideTitle}</p>
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
