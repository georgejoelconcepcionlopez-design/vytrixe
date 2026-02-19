import { MetadataRoute } from 'next'
import { ALL_CONTENT } from '@/data/content'
import { getAllCategories } from '@/lib/categories'

// Base URL from environment or hardcoded production URL
const BASE_URL = 'https://vytrixe.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Routes
    const staticRoutes = [
        '',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }))

    // 2. Category Routes
    const categories = getAllCategories().map((cat) => ({
        url: `${BASE_URL}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }))

    // 3. Article Routes
    const articles = ALL_CONTENT.map((article) => ({
        url: `${BASE_URL}/news/${article.slug}`,
        lastModified: new Date(article.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...categories, ...articles]
}
