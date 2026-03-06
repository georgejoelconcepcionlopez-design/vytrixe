import { NextResponse } from 'next/server';
import { processAllTrends } from '@/services/trend-engine';
import { generateArticleFromTrend } from '@/lib/ai-generator';
import { createClient } from '@/lib/supabase/server';

// Scheduler config for vercel (cron pattern)
// Should be matched in vercel.json:
// { "crons": [{ "path": "/api/cron/trends", "schedule": "*/30 * * * *" }] }

export async function GET(req: Request) {
    try {
        console.log("[CRON] Trend Engine initiated. Fetching latest global trends.");
        const trends = await processAllTrends();

        if (!trends || trends.length === 0) {
            console.warn("[CRON] No trends detected.");
            return NextResponse.json({ status: "No trends found." });
        }

        const supabase = await createClient();
        let newTrendsCount = 0;
        let generatedCount = 0;

        // 1. Process and Save to Database
        for (const trend of trends) {
            const { data: existing } = await (supabase as any)
                .from('trending_topics')
                .select('id')
                .eq('title', trend.title)
                .maybeSingle();

            if (!existing) {
                newTrendsCount++;

                // Save new trend
                await (supabase as any).from('trending_topics').insert({
                    title: trend.title,
                    keywords: trend.keywords,
                    category: trend.category,
                    source: trend.source,
                    score: trend.score,
                    created_at: trend.timestamp.toISOString(),
                    processed: false
                });

                // 2. Trigger Article Generation for High Score Topics
                if (trend.score >= 80) {
                    console.log(`[Trend Engine] High score (${trend.score}) detected for "${trend.title}". Triggering AI generation...`);
                    try {
                        // Generate content
                        const article = await generateArticleFromTrend(trend.title);

                        // Update the topic to processed status
                        await (supabase as any)
                            .from('trending_topics')
                            .update({ processed: true })
                            .eq('title', trend.title);

                        // Find category ID
                        const { data: categoryData } = await (supabase as any)
                            .from('categories')
                            .select('id')
                            .eq('slug', article.category)
                            .maybeSingle();

                        // Push the generated article to pending review queue
                        await (supabase as any).from('articles').insert({
                            title: article.title,
                            slug: article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                            content: {
                                en: {
                                    title: article.title,
                                    body: article.body_html,
                                    excerpt: article.excerpt
                                }
                            },
                            category_id: categoryData?.id || null,
                            status: 'pending', // CMS review needed
                            author_id: 'a123e456-b789-c012-d345-e678f901a23b', // Seeded AI Agent ID
                            image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200'
                        });

                        generatedCount++;
                        console.log(`[Trend Engine] Successfully created full article for "${trend.title}". Queued for review.`);

                    } catch (e) {
                        console.error(`[Trend Engine] AI generation failed for "${trend.title}":`, e);
                    }
                }
            } else {
                // Log duplicate/existing skip (can be noisy, kept concise)
                console.log(`[Trend Engine] Duplicate trend skipped: ${trend.title}`);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Trend analysis cycle completed.",
            total_analysed: trends.length,
            new_trends_saved: newTrendsCount,
            articles_generated: generatedCount
        });

    } catch (err: any) {
        console.error(`[CRON Error] ${err.message}`);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
