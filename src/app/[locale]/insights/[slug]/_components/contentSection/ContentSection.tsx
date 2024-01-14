'use client';

import { StructuredText } from 'react-datocms';
import styles from './styles.module.scss';
import { InView } from 'react-intersection-observer';
import { useState } from 'react';
import { Author, Industry, PostContent, Product } from '@/types/post';
import { Tag } from '@/types/tag';
import PostTitles from '@/_components/postTitles';

interface PostPageContent {
  backButtonText: string;
  leftAsideTitle: string;
  industriesTitle: string;
  productsTitle: string;
  tagsTitle: string;
  authorsTitle: string;
}

type ContentSectionProps = {
  pageContent: PostPageContent;
  content: PostContent[];
  industries: Industry[];
  products: Product[];
  tags: Tag[];
  authors: Author[];
};

const ContentSection = ({
  pageContent,
  content,
  industries,
  products,
  tags,
  authors,
}: ContentSectionProps) => {
  const titles = content.map((article) => article.title);
  const [activeTitle, setActiveTitle] = useState<string>(titles[0]);
  const handleIntersection = (inView: boolean, entry: IntersectionObserverEntry, title: string) => {
    if (inView) {
      setActiveTitle(title);
    }
  };

  return (
    <div className={styles.contentSection}>
      <PostTitles
        titles={titles}
        activeTitle={activeTitle}
        leftAsideTitle={pageContent.leftAsideTitle}
      />
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
          <p>{pageContent.industriesTitle}</p>
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
          <p>{pageContent.productsTitle}</p>
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
          <p>{pageContent.tagsTitle}</p>
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
          <p>{pageContent.authorsTitle}</p>
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
