
import { MetadataRoute } from 'next'
import { ALL_CONTENT } from '@/data/content'

// Base URL from environment or hardcoded production URL
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://vytrixe.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static Routes
    const staticRoutes = [
        '',
        '/intel',
        '/markets',
        '/reports',
        '/lab',
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms-of-service',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }))

    // Dynamic Content Routes (from Static Data)
    const articles = ALL_CONTENT.map((article) => ({
        url: `${BASE_URL}/news/${article.slug}`,
        lastModified: new Date(article.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...staticRoutes, ...articles]
}
