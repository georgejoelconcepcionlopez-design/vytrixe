
import { NextRequest, NextResponse } from 'next/server';
import { fetchMarketHistory } from '@/lib/market-service';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache history for 1 hour

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');

    if (!symbol) {
        return NextResponse.json({ error: 'Symbol required' }, { status: 400 });
    }

    try {
        const history = await fetchMarketHistory(symbol);

        if (!history) {
            return NextResponse.json({ error: 'History not found' }, { status: 404 });
        }

        return NextResponse.json({
            data: history,
            status: 'success'
        });
    } catch (error) {
        console.error("API History Error:", error);
        return NextResponse.json({
            error: 'Failed to fetch history',
            status: 'error'
        }, { status: 500 });
    }
}
