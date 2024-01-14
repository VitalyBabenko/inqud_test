import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import Header from '@/_components/header';
import 'reset-css';
import { i18n, type Locale } from '../i18n-config';

const urbanist = Urbanist({ subsets: ['latin'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: 'Inqud',
  robots: 'noindex,nofollow',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body className={urbanist.className}>
        <Header locale={locale} />
        {children}
      </body>
    </html>
  );
}
