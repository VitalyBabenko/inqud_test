'use client';

import Link from '../link/Link';
import styles from './styles.module.scss';
import { usePathname } from 'next/navigation';

const fromCapitalLetter = (inputString: string): string => {
  if (typeof inputString !== 'string' || inputString.length === 0) {
    return '';
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments: string[] = pathname.split('/').filter(Boolean).splice(1);

  return (
    <nav className={styles.breadcrumb}>
      <Link className={styles.activeLink} href="/">
        Home page
      </Link>
      <span className={styles.slash}> / </span>
      {pathSegments.map((segment, index) => (
        <Link
          href={`/${segment}`}
          key={index}
          className={index === pathSegments.length - 2 ? styles.activeLink : ''}
        >
          {fromCapitalLetter(segment).replace(/-/g, ' ')}
          {index < pathSegments.length - 1 && <span className={styles.slash}> / </span>}
        </Link>
      ))}
    </nav>
  );
};

export default Breadcrumb;
