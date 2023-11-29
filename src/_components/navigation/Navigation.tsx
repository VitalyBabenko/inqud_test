import Link from 'next/link';
import styles from './styles.module.scss';
import DropdownMenu from '../dropdownMenu/DropdownMenu';

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

interface NavigationProps {
  isOpen: boolean;
}

const Navigation = ({ isOpen }: NavigationProps) => {
  return (
    <nav className={isOpen ? styles.navOpen : styles.nav}>
      <ul>
        {links.map((link) => (
          <>
            {link.subLinks ? (
              <DropdownMenu
                key={link.label}
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
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
