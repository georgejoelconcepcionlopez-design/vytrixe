
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    // 1. Security Check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const supabase = await createClient();

    try {
        // 2. Query for pending articles ready to publish
        const { data: articles, error: fetchError } = await (supabase
            .from('vytrixe_articles' as any)
            .select('id, title, is_breaking')
            .eq('status', 'pending-review')
            .lte('auto_publish_at', new Date().toISOString()) as any);

        if (fetchError) throw fetchError;

        if (!articles || articles.length === 0) {
            return NextResponse.json({ published: 0, message: 'No articles to publish.' });
        }

        const publishedIds: string[] = [];
        const errors: any[] = [];

        // 3. Process each article
        for (const article of articles) {
            const { error: updateError } = await (supabase
                .from('vytrixe_articles' as any)
                .update({
                    status: 'published',
                    published_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('id', article.id) as any);

            if (updateError) {
                console.error(`Failed to publish article ${article.id}:`, updateError);
                errors.push({ id: article.id, error: updateError });
            } else {
                publishedIds.push(article.id);
                console.log(`[AutoPublish] Published: ${article.title} (${article.id})`);

                // Placeholder for Breaking News Notification
                if (article.is_breaking) {
                    console.log(`[Notification] TRIGGER PUSH for Breaking News: ${article.title}`);
                }
            }
        }

        return NextResponse.json({
            success: true,
            published_count: publishedIds.length,
            published_ids: publishedIds,
            errors
        });

    } catch (error: any) {
        console.error('Auto-publish cron failed:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
