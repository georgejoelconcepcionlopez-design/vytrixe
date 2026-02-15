import { NextResponse } from 'next/server';
import { syncAll } from '@/lib/news/importer';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    // Simple key check for dev
    if (key !== 'DEV_ADMIN_KEY') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const results = await syncAll();
        return NextResponse.json({
            status: 'success',
            results,
            time: new Date().toISOString()
        });
    } catch (error: any) {
        console.error('Sync Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
