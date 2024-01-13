'use client';

import NextLink, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface CustomLinkProps extends LinkProps {
  locale?: string;
  children?: React.ReactNode;
  className?: string;
}

const Link: React.FC<CustomLinkProps> = ({ locale, href, children, className, ...rest }) => {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const resultLocale = locale || currentLocale || 'en';

  return (
    <NextLink href={`/${resultLocale}/${href}`} className={className} {...rest}>
      {children}
    </NextLink>
  );
};

export default Link;
