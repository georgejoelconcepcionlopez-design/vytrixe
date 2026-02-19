
import { NextResponse } from 'next/server';
import { getMarketData } from '@/lib/market-service';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
    try {
        const data = await getMarketData();
        return NextResponse.json({
            data,
            timestamp: new Date().toISOString(),
            status: 'success'
        });
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({
            error: 'Failed to fetch market data',
            status: 'error',
            data: []
        }, { status: 500 });
    }
}
