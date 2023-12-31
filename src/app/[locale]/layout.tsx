import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import Header from '@/_components/header';
import 'reset-css';
import { useTranslations } from 'next-intl';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inqud',
  robots: 'noindex,nofollow',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = params;
  // const t = useTranslations('Index');

  return (
    <html lang={locale}>
      <body className={urbanist.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
