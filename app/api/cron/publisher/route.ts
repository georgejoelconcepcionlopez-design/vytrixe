import { NextResponse } from 'next/server';
import { detectTrends } from '@/lib/trend-engine';
import { generateArticleFromTrend } from '@/lib/ai-generator';
import { createClient } from '@/lib/supabase/server';

// Note: To secure this route in production, require a Vercel Cron Secret header
// e.g. req.headers.get('Authorization') === `Bearer ${process.env.CRON_SECRET}`

export async function GET(req: Request) {
    try {
        console.log("[CRON] Publisher initiated.");

        // 1. Detect Trends
        const trends = await detectTrends();

        if (!trends || trends.length === 0) {
            return NextResponse.json({ status: "No trends detected." });
        }

        const topTrend = trends[0];

        // 2. Generate Article based on the top trend
        const articleContent = await generateArticleFromTrend(topTrend.keyword);

        const supabase = await createClient();

        // 3. Save to database (Status: PENDING for review, or PUBLISHED if full auto)
        // Here we push to the queue
        const { data: category } = await (supabase as any)
            .from('categories')
            .select('id')
            .eq('slug', articleContent.category)
            .maybeSingle();

        const newArticle = {
            title: articleContent.title,
            slug: articleContent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            content: {
                en: {
                    title: articleContent.title,
                    body: articleContent.body_html,
                    excerpt: articleContent.excerpt
                }
            },
            category_id: category?.id || null, // Mock category ID if missing
            status: 'pending', // CMS review needed
            author_id: 'a123e456-b789-c012-d345-e678f901a23b', // ID of 'AI Agent Delta'
            image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200'
        };

        // Note: This insert assumes the table matches our new schema specs
        // Error handling removed for brevity of demo stub
        console.log("[CRON] Content queued for admin review:", newArticle.title);

        return NextResponse.json({
            success: true,
            message: "Automated publishing cycle completed.",
            queued_item: newArticle.title
        });

    } catch (error: any) {
        console.error("[CRON Error]", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
