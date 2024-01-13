'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { LocaleLinkProps } from '../header/Header';
import { HeaderNavItem } from '@/types/header';
import { usePathname } from 'next/navigation';
import Link from '../link/Link';
import NextLink from 'next/link';

import { Locale } from '@/app/i18n-config';

interface DropdownMenuProps {
  localeLinks?: LocaleLinkProps[];
  links?: HeaderNavItem[];
  buttonLabel: string;
  title?: string;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  links,
  localeLinks,
  buttonLabel,
  title,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div
      className={className ? `${className} ${styles.dropdown}` : styles.dropdown}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={styles.toggleButton}>
        {buttonLabel}
        <Image
          src="/arrow.svg"
          alt="arrow-down"
          width={16}
          height={16}
          style={{ transform: `rotate(${isOpen ? '180deg' : '0deg'})` }}
        />
      </div>
      {isOpen && (
        <>
          <ul className={styles.menu}>
            <span className={styles.title}>{title}</span>
            {links?.map((link) => (
              <li key={link.id}>
                <Link href={link.href}> {link.name} </Link>
              </li>
            ))}
            {localeLinks?.map((link) => (
              <li key={link.label}>
                <NextLink href={redirectedPathName(link.locale)}>{link.label}</NextLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;
