import Link from '@/_components/link/Link';
import styles from './styles.module.scss';
import Image from 'next/image';

interface HeadingSection {
  backButtonText: string;
  title: string;
  timeToRead: number;
  publishDate: string;
}

const HeadingSection = ({ backButtonText, title, timeToRead, publishDate }: HeadingSection) => {
  return (
    <div className={styles.headingSection}>
      <Image src="/page-decor-left.svg" width={724} height={360} alt="left-decor" />
      <Image src="/page-decor-right.svg" width={724} height={360} alt="right-decor" />
      <Link href="/insights">
        <Image src="/arrow.svg" alt="arrow-back" width={16} height={16} />
        {backButtonText}
      </Link>
      <h1>{title}</h1>
      <div className={styles.postInfo}>
        <span>{publishDate}</span>
        <Image src="/dot.svg" alt="decor" width={4} height={4} />
        <span>{timeToRead} min read</span>
      </div>
    </div>
  );
};

export default HeadingSection;
