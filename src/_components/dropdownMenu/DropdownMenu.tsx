'use client';

import { useState } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Link, usePathname } from '../../navigation';
import { LocaleLinkProps } from '../header/Header';
import { HeaderNavItem } from '@/types/header';

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
                <Link href={pathname} locale={link.locale}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;
