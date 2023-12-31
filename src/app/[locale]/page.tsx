import CustomLink from '@/_components/customLink';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export default async function Home({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  // const t = useTranslations('Index');
  return (
    <main>
      <h1>Home</h1>
      {/* <h1>{t('title')}</h1> */}
      <CustomLink href={'/insights'}>Insights</CustomLink>
    </main>
  );
}
