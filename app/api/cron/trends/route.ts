import { NextResponse } from 'next/server';
import { processAllTrends } from '@/services/trend-engine';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        console.log("[CRON] Autonomous Trend Discovery Engine started (Admin).");

        // 1. Fetch and rank trends from all sources
        const trends = await processAllTrends();

        const supabase = createAdminClient();

        const trendsToInsert = trends.map(t => ({
            title: t.title,
            source: t.source,
            score: t.score,
            upvotes: t.upvotes,
            comments: t.comments,
            cross_source_hits: t.cross_source_hits,
            keywords: t.keywords,
            category: t.category,
            created_at: new Date().toISOString()
        }));

        // 2. Upsert into 'trends' table
        const { error } = await (supabase as any)
            .from('trends')
            .upsert(trendsToInsert, { onConflict: 'title' });

        if (error) {
            console.error("[CRON] Supabase Trends Error:", error.message);
            return NextResponse.json({
                success: false,
                error: error.message,
                details: error
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            count: trendsToInsert.length,
            top_trend: trendsToInsert[0]?.title
        });

    } catch (error: any) {
        console.error("[CRON Error]", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
