'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { FormEvent } from 'react';

interface HeadingSectionProps {
  filterPosts: (event: FormEvent) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const HeadingSection = ({ filterPosts, inputValue, setInputValue }: HeadingSectionProps) => {
  return (
    <main className={styles.headingSection}>
      <h2>Inqud insights</h2>
      <p>Payment solutions for businesses & individuals.</p>

      <form onSubmit={filterPosts} className={styles.searchBlock}>
        <div className={styles.inputWrapper}>
          <Image src="/magnifier.svg" alt="magnifier-icon" width={24} height={24} />
          <input
            name="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search article, industry, or product"
          />
          {inputValue && (
            <Image
              src="/close.svg"
              alt="clear-input-icon"
              onClick={() => setInputValue('')}
              width={17}
              height={17}
            />
          )}
        </div>

        <button type="submit">Search</button>
      </form>
    </main>
  );
};

export default HeadingSection;
