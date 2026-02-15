
import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient()
    const baseUrl = 'https://vytrixe.com'

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/us', '/mx', '/es', '/do',
        '/trends', '/topics', '/pro',
        '/about', '/editorial-policy',
        '/privacy-policy', '/terms-of-service', '/contact', '/cookie-policy'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }))

    // 2. Dynamic Author Routes
    const { data: authors } = await supabase.from('authors').select('slug') as { data: any[] | null }
    const authorRoutes = (authors || []).map((author) => ({
        url: `${baseUrl}/authors/${author.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // 3. Dynamic Category Hub Routes
    const { data: categories } = await supabase.from('categories').select('id, slug') as { data: any[] | null }
    const categoryRoutes = (categories || []).map((cat) => ({
        url: `${baseUrl}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'hourly' as const,
        priority: 0.9,
    }))

    // 4. Dynamic Trend Articles (Traffic Weighted)
    const { data: trends } = await supabase
        .from('trend_articles')
        .select('trend_id, category_id, score, created_at')
        .order('score', { ascending: false })
        .limit(2000) as { data: any[] }

    const trendRoutes = (trends || []).map((trend) => {
        const cat = categories?.find(c => c.id === trend.category_id)
        const catSlug = cat?.slug || 'trends'
        const priority = parseFloat((0.5 + ((trend.score || 80) / 200)).toFixed(2))
        return {
            url: `${baseUrl}/topic/${catSlug}/${trend.trend_id}`,
            lastModified: new Date(trend.created_at),
            changeFrequency: 'hourly' as const,
            priority,
        }
    })

    return [...staticRoutes, ...authorRoutes, ...categoryRoutes, ...trendRoutes]
}
