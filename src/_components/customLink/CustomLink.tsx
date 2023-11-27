import React from 'react';
import Link, { LinkProps } from 'next/link';
import styles from './styles.module.css';

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
}
const CustomLink = (props: CustomLinkProps) => {
  return <Link className={styles.link} {...props} />;
};

export default CustomLink;
