import { Fragment } from 'react';
import styles from './styles.module.scss';
import DropdownMenu from '../dropdownMenu/DropdownMenu';

import { HeaderNavItem } from '@/types/header';
import { Link } from '@/navigation';

interface NavigationProps {
  isOpen: boolean;
  links: HeaderNavItem[];
  activePage: string;
}

const Navigation = ({ isOpen, links, activePage }: NavigationProps) => {
  return (
    <nav className={isOpen ? styles.navOpen : styles.nav}>
      <ul>
        {links?.map((link) => (
          <Fragment key={link.id}>
            {link.sublinks ? (
              <DropdownMenu
                className={styles.dropdown}
                links={link.sublinks}
                title={link.title}
                buttonLabel={link.name}
              />
            ) : (
              <li key={link.id} className={`/${activePage}` === link.href ? styles.active : ''}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
