
import { fetchLiveMatches } from '@/services/sportsService'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ country: string }> }
) {
    const { country } = await params

    try {
        const matches = await fetchLiveMatches(country)

        return NextResponse.json({
            success: true,
            count: matches.length,
            data: matches
        })
    } catch (error) {
        console.error('Sports Live API Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch live matches' },
            { status: 500 }
        )
    }
}
