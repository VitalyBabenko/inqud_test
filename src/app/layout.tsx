import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import 'reset-css';
import Providers from '@/app/Providers';
import Header from '@/_components/header';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inqud',
  robots: 'noindex,nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
