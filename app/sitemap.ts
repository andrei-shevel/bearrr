import type { MetadataRoute } from 'next';

import { getApps } from '@/lib/apps';

const baseUrl = process.env.SITE_URL!;

export default function sitemap(): MetadataRoute.Sitemap {
  const appRoutes: MetadataRoute.Sitemap = getApps().flatMap((app) => [
    {
      url: `${baseUrl}/apps/${app.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apps/${app.slug}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...appRoutes,
  ];
}
