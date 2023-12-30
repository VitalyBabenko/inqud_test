'use client';

import { StructuredText } from 'react-datocms';
import styles from './styles.module.scss';
import { StructuredTextGraphQlResponse } from 'datocms-structured-text-to-html-string';
import Link from 'next/link';
import { InView } from 'react-intersection-observer';
import { useState } from 'react';
import { Authors, Industries, Products } from '@/types/post';
import { Tag } from '@/types/tag';
import PostTitles from '@/_components/postTitles';

type Article = {
  title: string;
  text: StructuredTextGraphQlResponse;
};

type ContentSectionProps = {
  content: Article[];
  industries: Industries[];
  products: Products[];
  tags: Tag[];
  authors: Authors[];
};

const ContentSection = ({ content, industries, products, tags, authors }: ContentSectionProps) => {
  const titles = content.map((article) => article.title);
  const [activeTitle, setActiveTitle] = useState<string>(titles[0]);
  const handleIntersection = (inView: boolean, entry: IntersectionObserverEntry, title: string) => {
    if (inView) {
      setActiveTitle(title);
    }
  };

  return (
    <div className={styles.contentSection}>
      <PostTitles titles={titles} activeTitle={activeTitle} />
      <div className={styles.center}>
        {content.map((article, i): any => (
          <InView
            key={i}
            as="div"
            onChange={(inView, entry) => handleIntersection(inView, entry, article.title)}
          >
            <section id={article.title}>
              {article.title && <h2>{article.title}</h2>}
              <StructuredText key={article.title} data={article.text} />
            </section>
          </InView>
        ))}
      </div>

      <div className={styles.asideRight}>
        <div className={styles.asideItem}>
          <p>Industries</p>
          <span>
            {industries.map((industry, i) => (
              <span key={industry.name}>
                {' ' + industry.name}
                {industries.length - 1 !== i ? ',' : ' '}
              </span>
            ))}
          </span>
        </div>

        <div className={styles.asideItem}>
          <p>Products</p>
          <div>
            {products.map((product, i) => (
              <span key={product.name}>
                {' ' + product.name}
                {products.length - 1 !== i ? ',' : ' '}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.asideItem}>
          <p>Tags</p>
          <div>
            {tags.map((tag, i) => (
              <span key={tag.name}>
                {' ' + tag.name}
                {tags.length - 1 !== i ? ',' : ' '}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.asideItem}>
          <p>Authors</p>
          <div>
            {authors.map((author, i) => (
              <span key={author.name}>
                {' ' + author.name}
                {authors.length - 1 !== i ? ',' : ' '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
