import CustomLink from '@/_components/customLink';

export default async function Home() {
  return (
    <main>
      <h1>Home</h1>
      <CustomLink href={'/insights'}>Insights</CustomLink>
    </main>
  );
}
