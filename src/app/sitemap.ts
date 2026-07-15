import { MetadataRoute } from 'next';
import { TOOLS } from '@/config/tools';
import { BLOG_POSTS } from '@/config/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pdf-combiner.free';

  // Static core pages
  const coreRoutes = ['', '/blog', '/admin'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Tool page routes
  const toolRoutes = Object.keys(TOOLS).map((toolId) => ({
    url: `${baseUrl}/${toolId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Blog dynamic article routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...coreRoutes, ...toolRoutes, ...blogRoutes];
}
