'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';
import Navigation from '../navigation';
import DropdownMenu from '../dropdownMenu';
import { useEffect, useState } from 'react';

const langLinks = [
  { label: 'English (US)', href: '/' },
  { label: 'Deutsch', href: '/de' },
  { label: 'Polski', href: '/pl' },
];

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();

    window.addEventListener('resize', updateIsMobile);

    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const isLinkClick = target.tagName === 'A';
    const isLogoClick = target.tagName === 'IMG' && target.parentElement?.tagName === 'A';

    if ((isLinkClick || isLogoClick) && target.closest(`.${styles.header}`)) {
      setIsBurgerOpen(false);
    }
  };

  return (
    <header className={styles.header} onClick={handleLinkClick}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={124} height={40} />
          </Link>

          <Link href="/">
            <Image src="/logoMobile.svg" alt="logo" width={32} height={32} />
          </Link>

          {!isBurgerOpen && (
            <div className={styles.logoLinks}>
              <Link href="#">Business</Link>
              <Link href="#">Personal</Link>
            </div>
          )}
        </div>

        <Navigation isOpen={isBurgerOpen} />

        <div className={styles.settings}>
          {(!isMobile || isBurgerOpen) && (
            <div className={styles.lang}>
              <Image src="/earth.svg" alt="earth-icon" width={32} height={32} />
              <DropdownMenu links={langLinks} buttonLabel="EN" />
            </div>
          )}

          <div className={isBurgerOpen ? styles.authOpen : styles.auth}>
            <Link className={styles.login} href="#">
              Log in
              <Image src="/arrowLogin.svg" alt="arrow-to-login" width={48} height={48} />
            </Link>
            <Link className={styles.getStarted} href="#">
              Get started
            </Link>
          </div>
        </div>

        <button
          className={isBurgerOpen ? styles.burgerOpen : styles.burger}
          onClick={() => setIsBurgerOpen(!isBurgerOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
