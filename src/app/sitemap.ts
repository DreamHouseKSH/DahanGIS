import type { MetadataRoute } from 'next';
import { pageDefinitions, SITE_URL } from '../lib/site-metadata';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return pageDefinitions.map((page) => ({ url: new URL(page.path, SITE_URL).href }));
}
