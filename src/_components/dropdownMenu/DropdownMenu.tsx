'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

interface DropdownMenuProps {
  links: { label: string; href: string }[];
  buttonLabel: string;
  title?: string;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ links, buttonLabel, title, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={className ? `${className} ${styles.dropdown}` : styles.dropdown}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className={styles.toggleButton}>
        {buttonLabel}
        <Image
          src="/arrow.svg"
          alt="arrow-down"
          width={16}
          height={16}
          style={{ transform: `rotate(${isOpen ? '180deg' : '0deg'})` }}
        />
      </button>
      {isOpen && (
        <>
          <ul className={styles.menu}>
            <span className={styles.title}>{title}</span>
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href}> {link.label} </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;
