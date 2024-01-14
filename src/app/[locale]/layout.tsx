import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import Header from '@/_components/header';
import 'reset-css';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inqud',
  robots: 'noindex,nofollow',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: any;
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
