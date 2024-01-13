'use client';

import Image from 'next/image';
import styles from './styles.module.scss';
import Navigation from '../navigation';
import DropdownMenu from '../dropdownMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HeaderContent, HeaderProps } from '@/types/header';
import { usePathname } from 'next/navigation';
import Link from '../link/Link';

export interface LocaleLinkProps {
  label: string;
  locale: 'en' | 'es' | 'ru' | 'uk';
}

const localeLinks: LocaleLinkProps[] = [
  { label: 'English', locale: 'en' },
  { label: 'Spanish', locale: 'es' },
  { label: 'russian', locale: 'ru' },
  { label: 'Ukrainian', locale: 'uk' },
];

const Header = ({ locale }: HeaderProps) => {
  const [headerContent, setHeaderContent] = useState<HeaderContent>();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const getHeaderContent = async () => {
      const { data } = await axios.get('/api/header', {
        params: {
          locale: pathname.split('/')[1],
        },
      });
      setHeaderContent(data.header);
    };
    getHeaderContent();
  }, [pathname]);

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
          <Link href="/" className={styles.logoInner}>
            <Image
              src={headerContent?.logo.url || '/logo.svg'}
              alt="logo"
              width={124}
              height={40}
            />
          </Link>

          <Link href="/">
            <Image src="/logoMobile.svg" alt="logo" width={32} height={32} />
          </Link>

          {!isBurgerOpen && (
            <div className={styles.logoLinks}>
              {headerContent?.logolinks.map((logoLink) => (
                <Link key={logoLink.name} href={logoLink.href}>
                  {logoLink.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {headerContent && (
          <Navigation
            isOpen={isBurgerOpen}
            links={headerContent?.navigation}
            activePage={pathname.split('/')[2]}
          />
        )}

        <div className={styles.settings}>
          {(!isMobile || isBurgerOpen) && (
            <div className={styles.lang}>
              <Image src="/earth.svg" alt="earth-icon" width={32} height={32} />
              <DropdownMenu localeLinks={localeLinks} buttonLabel={locale.toUpperCase()} />
            </div>
          )}

          <div className={isBurgerOpen ? styles.authOpen : styles.auth}>
            <Link className={styles.login} href="/">
              {headerContent?.loginbuttontext}
              <Image src="/arrowLogin.svg" alt="arrow-to-login" width={48} height={48} />
            </Link>
            <Link className={styles.getStarted} href="/">
              {headerContent?.signupbuttontext}
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
