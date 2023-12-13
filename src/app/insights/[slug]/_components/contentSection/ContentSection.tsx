import { findHeadings } from '@/utils/findHeadings';
import styles from './styles.module.scss';
import { StructuredTextGraphQlResponse, render } from 'datocms-structured-text-to-html-string';
import parse from 'html-react-parser';
import Link from 'next/link';

type ContentSectionProps = {
  content: StructuredTextGraphQlResponse;
};

const ContentSection = ({ content }: ContentSectionProps) => {
  const htmlString = render(content.value.document);
  console.log(htmlString);
  const headings = findHeadings(content);

  return (
    <div className={styles.contentSection}>
      <div className={styles.asideLeft}>
        <p>Contents</p>
        <ul className={styles.headings}>
          {headings.map((heading) => (
            <Link key={heading} href={`#${heading}`} className={styles.active}>
              {heading}
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.center}> {parse(htmlString || '')}</div>
      <div className={styles.asideRight}>
        <div className={styles.asideItem}></div>
      </div>
    </div>
  );
};

export default ContentSection;
