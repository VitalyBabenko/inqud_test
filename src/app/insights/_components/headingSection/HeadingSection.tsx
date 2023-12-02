import Image from 'next/image';
import styles from './styles.module.scss';

const HeadingSection = () => {
  return (
    <main className={styles.headingSection}>
      <h2>Inqud insights</h2>
      <p>Payment solutions for businesses & individuals.</p>

      <form className={styles.searchBlock}>
        <div className={styles.inputWrapper}>
          <Image src="/magnifier.svg" alt="magnifier-icon" width={24} height={24} />
          <input type="text" placeholder="Search article, industry or product" />
        </div>

        <button type="submit">Search</button>
      </form>
    </main>
  );
};

export default HeadingSection;
