'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { FormEvent } from 'react';
import { PageContent } from '../../page';

interface HeadingSectionProps {
  pageContent: PageContent;
  filterPosts: (search?: string | null) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const HeadingSection = ({
  pageContent,
  filterPosts,
  inputValue,
  setInputValue,
}: HeadingSectionProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    filterPosts();
  };

  const handleClearInput = () => {
    setInputValue('');
    filterPosts('');
  };

  return (
    <main className={styles.headingSection}>
      <h2>{pageContent.title}</h2>
      <p>{pageContent.subtitle}</p>

      <form onSubmit={handleSubmit} className={styles.searchBlock}>
        <div className={styles.inputWrapper}>
          <Image src="/magnifier.svg" alt="magnifier-icon" width={24} height={24} />
          <input
            name="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={pageContent.searchPlaceholder}
          />
          {inputValue && (
            <Image
              src="/close.svg"
              alt="clear-input-icon"
              onClick={handleClearInput}
              width={17}
              height={17}
            />
          )}
        </div>

        <button type="submit">{pageContent.searchButtonText}</button>
      </form>
    </main>
  );
};

export default HeadingSection;
