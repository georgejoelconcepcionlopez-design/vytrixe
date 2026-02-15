import { NextResponse } from 'next/server';
import { TrendEngine } from '@/lib/services/trend-engine';
import { ContentEngine } from '@/lib/services/content-engine';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic'; // Ensure cron runs fresh

export async function GET(request: Request) {
    try {
        // 1. Verify Authorization (Simple secret check for cron security)
        const authHeader = request.headers.get('authorization');
        if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabase = await createClient();

        // 2. Fetch Top Trends
        const trends = await TrendEngine.getTopTrends();
        if (trends.length === 0) {
            return NextResponse.json({ message: 'No trends found' });
        }

        // 3. Select Top 1 (Simulate selection logic)
        const topTrend = trends[0];

        // 4. Generate Content
        const article = await ContentEngine.generateArticle(topTrend);

        // 5. Save to Database (Draft Mode)
        const { data, error } = await (supabase as any).from('news').insert({
            title: article.title,
            slug: article.slug,
            content: article.content, // Simplified map, real app would structure this better
            excerpt: article.metaDescription,
            category: article.category,
            description: article.metaDescription, // Using description as meta desc
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80', // Placeholder
            author: 'Vytrixe Editorial Desk',
            is_trending: true,
            views: 0,
            source: topTrend.source,
            created_at: new Date().toISOString()
            // In real schema, add status='pending-review'
        }).select();

        if (error) {
            console.error('DB Insert Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: `Generated article for: ${topTrend.title}`,
            article_slug: article.slug
        });

    } catch (error: any) {
        console.error('Cron Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
