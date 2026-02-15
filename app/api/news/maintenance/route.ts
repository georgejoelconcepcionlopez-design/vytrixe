import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Maintenance cron endpoint
 * Logic:
 * 1. Mark articles with > 500 views as is_trending.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (process.env.ADMIN_API_KEY && key !== process.env.ADMIN_API_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const supabase = await createClient();

        // Auto-trending logic: Views > 500 = is_trending
        const { data, error, count } = await (supabase as any)
            .from('news')
            .update({ is_trending: true })
            .gt('views', 500)
            .eq('is_trending', false)
            .select('id');

        if (error) throw error;

        return NextResponse.json({
            status: 'success',
            maintenance: {
                newTrending: count || data?.length || 0
            },
            time: new Date().toISOString()
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
