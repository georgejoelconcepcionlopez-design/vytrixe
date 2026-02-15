
import { NextResponse } from 'next/server'
import { fetchAllInsights } from '@/services/insightsService'

// In a real scenario, this would query 'trend_articles' sorted by created_at
// For this stage, we'll reuse the mock insights + some dynamically generated ones
export async function GET() {
    const baseInsights = await fetchAllInsights()

    // Simulate real-time feed by duplicating and time-shifting
    const feed = [
        {
            id: 'breaking-1',
            title: "BREAKING: Viral Spike detected in 'Smart Ring' sector",
            excerpt: "Search volume for 'Oura alternative' has jumped 400% in the last hour. Detailed analysis of the emerging competitors.",
            category: "Tech",
            timestamp: new Date().toISOString(), // Now
            slug: "smart-ring-spike"
        },
        {
            id: 'breaking-2',
            title: "ALERT: Mexico City search trends shift to 'Water Scarcity'",
            excerpt: "Geo-mapping indicates a critical rise in utility-related queries in CDMX. Potential infrastructure strain signal.",
            category: "Geo-Politics",
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            slug: "cdmx-water"
        },
        ...baseInsights.map(i => ({
            id: i.slug,
            title: i.title,
            excerpt: i.excerpt,
            category: "Analysis",
            timestamp: i.published_at,
            slug: i.slug
        }))
    ]

    return NextResponse.json(feed)
}
