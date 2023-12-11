import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import 'reset-css';
import Providers from '@/app/Providers';
import Header from '@/_components/header';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inqud',
  robots: 'noindex,nofollow',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
