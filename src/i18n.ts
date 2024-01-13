import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  let messages = (await import(`../messages/${locale}.json`)).default;
  if (!messages) {
    console.error('Locale error: i18n.ts messages not found');
    messages = (await import(`../messages/en.json`)).default;
  }

  return {
    messages,
  };
});
