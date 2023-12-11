import { Fragment } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import DropdownMenu from '../dropdownMenu/DropdownMenu';

interface NavigationProps {
  isOpen: boolean;
}

const Navigation = ({ isOpen }: NavigationProps) => {
  const links = [
    {
      label: 'Products',
      href: '#',
      subLinksTitle: 'Business',
      subLinks: [
        {
          label: 'Crypto widget',
          href: '/#',
        },
        {
          label: 'API',
          href: '/#',
        },
        {
          label: 'Card 2 crypto',
          href: '/#',
        },
        {
          label: 'Crypto exchange',
          href: '/#',
        },
        {
          label: 'Recurring payments',
          href: '/#',
        },
        {
          label: 'Accept crypto',
          href: '/#',
        },
      ],
    },
    { label: 'Company', href: '#' },
    { label: 'Insights', href: '/insights' },
    { label: 'Help centre', href: '#' },
  ];

  return (
    <nav className={isOpen ? styles.navOpen : styles.nav}>
      <ul>
        {links.map((link) => (
          <Fragment key={link.label}>
            {link.subLinks ? (
              <DropdownMenu
                className={styles.dropdown}
                links={link.subLinks}
                title={link.subLinksTitle}
                buttonLabel={link.label}
              />
            ) : (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
