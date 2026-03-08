import { NextResponse } from 'next/server';
import { generateArticleFromTrend } from '@/lib/ai-generator';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        console.log("[CRON] Autonomous Publisher initiated (Immediate Flow - Admin).");

        // 1. Initialize Admin client to bypass RLS
        const supabase = createAdminClient();

        // 2. Fetch top trends
        const { data: trends, error: fetchError } = await supabase
            .from('trends')
            .select('*')
            .order('score', { ascending: false })
            .limit(2);

        if (fetchError || !trends || trends.length === 0) {
            console.log("[CRON] No trends in queue.");
            return NextResponse.json({ success: false, status: "No trends in queue.", error: fetchError });
        }

        let lastGeneratedTitle = "";

        // 3. Process trends sequentially
        for (const trend of trends) {
            try {
                // Check for existing article
                const { data: existingTrend } = await (supabase as any)
                    .from('articles')
                    .select('id')
                    .ilike('title', `%${trend.title}%`)
                    .maybeSingle();

                if (existingTrend) continue;

                // 4. Generate Article
                const articleData = await generateArticleFromTrend(trend.title);

                if (!articleData) continue;

                // 5. Save with Admin Client and immediate 'published_at'
                const { error: insertError } = await (supabase as any)
                    .from('articles')
                    .insert({
                        title: articleData.title,
                        slug: articleData.slug,
                        excerpt: articleData.excerpt,
                        content: articleData.content,
                        category: articleData.category,
                        cover_image: articleData.cover_image,
                        seo_title: articleData.seo_title,
                        seo_description: articleData.seo_description,
                        keywords: articleData.keywords,
                        structured_data: {
                            original_trend: trend.title,
                            score: trend.score,
                            source: trend.source,
                            generated_at: new Date().toISOString()
                        },
                        published_at: new Date().toISOString(),
                        created_at: new Date().toISOString()
                    });

                if (insertError) {
                    console.error(`[Publisher] Supabase Insert Error:`, insertError.message);
                    return NextResponse.json({
                        success: false,
                        error: insertError.message,
                        details: insertError
                    }, { status: 500 });
                }

                lastGeneratedTitle = articleData.title;
                console.log(`[Publisher] Successfully published: ${articleData.title}`);

                // 6. Invalidate homepage cache immediately
                revalidatePath('/');
                break;

            } catch (err: any) {
                console.error(`[Publisher] Generation failure:`, err.message);
                return NextResponse.json({ success: false, error: err.message }, { status: 500 });
            }
        }

        return NextResponse.json({
            success: true,
            generated_article: lastGeneratedTitle || "None (Duplicate or Search fail)"
        });

    } catch (error: any) {
        console.error("[CRON Critical Error]", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
