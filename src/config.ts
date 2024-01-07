import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'es', 'ru', 'uk'] as const;

export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    es: '/pathnames',
    ru: '/pathnames',
    uk: '/pathnames',
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = `always`;

export type AppPathnames = keyof typeof pathnames;
