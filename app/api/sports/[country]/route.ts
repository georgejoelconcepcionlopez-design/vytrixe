
import { fetchSportsNews, saveSportsNews } from '@/services/sportsService'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ country: string }> }
) {
    const { country } = await params

    try {
        // 1. Fetch fresh news (from Mock/API)
        const news = await fetchSportsNews(country)

        // 2. (Optional) Fire-and-forget save to DB
        // In a real serverless env, we might need waitUntil() or a queue
        saveSportsNews(news).catch(console.error)

        return NextResponse.json({
            success: true,
            count: news.length,
            data: news
        })
    } catch (error) {
        console.error('Sports API Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch sports news' },
            { status: 500 }
        )
    }
}
