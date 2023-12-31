import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${URL}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${URL}/insights/[slag]`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.5,
    },
  ];
}
