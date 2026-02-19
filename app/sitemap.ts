import { MetadataRoute } from 'next'

const BASE_URL = 'https://aurvox.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: new Date('2026-02-18'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
