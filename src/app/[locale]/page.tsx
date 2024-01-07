import CustomLink from '@/_components/customLink';

type Props = {
  params: { locale: string };
};

export default async function Home({ params }: Props) {
  return (
    <main>
      <h1>Home</h1>
      <CustomLink href={'/insights'}>Insights</CustomLink>
    </main>
  );
}
