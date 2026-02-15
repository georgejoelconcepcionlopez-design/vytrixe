
import { fetchTeamStats } from '@/services/sportsService'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ country: string }> }
) {
    const { country } = await params

    try {
        const stats = await fetchTeamStats(country)

        return NextResponse.json({
            success: true,
            count: stats.length,
            data: stats
        })
    } catch (error) {
        console.error('Sports Stats API Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch team stats' },
            { status: 500 }
        )
    }
}
