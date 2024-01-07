export interface HeaderProps {
  locale: 'en' | 'es' | 'ru' | 'uk';
}

export interface HeaderNavItem {
  id: string;
  name: string;
  href: Omit<UrlObject>;
  title?: string;
  sublinks?: [{ id: string; name: string; href: Omit<UrlObject> }];
}

export interface HeaderContent {
  loginbuttontext: string;
  signupbuttontext: string;
  logo: { url: string };
  logolinks: HeaderLink[];
  navigation: HeaderNavItem[];
}
