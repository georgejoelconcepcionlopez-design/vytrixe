import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateSeoPageContent } from '@/lib/seo-generator';

// Add environment secret for CRON job protection
const CRON_SECRET = process.env.CRON_SECRET || 'dev-secret';

// List of target keywords for Vytrixe
const TARGET_KEYWORDS = [
    'best ai tools',
    'free ai tools',
    'ai tools for business',
    'ai tools for students',
    'ai tools for marketing',
    'ai video generators',
    'ai image generators',
    'ai productivity tools',
    'technology trends 2026',
    'startup funding guide',
    'best crypto wallets 2026',
    'viral marketing tools'
];

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const supabase = await createClient();

        // 1. Determine which keywords we haven't generated SEO pages for yet
        const { data: existingPages } = await (supabase as any)
            .from('seo_pages')
            .select('keyword');

        const existingKeywords = new Set((existingPages || []).map((p: any) => p.keyword.toLowerCase()));
        const pendingKeywords = TARGET_KEYWORDS.filter(kw => !existingKeywords.has(kw.toLowerCase()));

        if (pendingKeywords.length === 0) {
            return NextResponse.json({ message: 'All target keywords have existing SEO pages.' }, { status: 200 });
        }

        // 2. Pick the top pending keyword and generate page (limit 1 per CRON run to prevent timeout)
        const targetKeyword = pendingKeywords[0];
        console.log(`[SEO Cron] Generating page for: ${targetKeyword}`);

        const generatedData = await generateSeoPageContent(targetKeyword);

        // 3. Insert into database
        const { error } = await (supabase as any)
            .from('seo_pages')
            .insert({
                keyword: generatedData.keyword,
                slug: generatedData.slug,
                title: generatedData.title,
                meta_description: generatedData.meta_description,
                content: generatedData.content
            });

        if (error) {
            console.error('[SEO Cron] Database Insertion Error:', error);
            return NextResponse.json({ error: 'Failed to insert SEO page.' }, { status: 500 });
        }

        return NextResponse.json({
            message: 'SEO Page generated successfully.',
            page: {
                keyword: targetKeyword,
                slug: generatedData.slug
            }
        }, { status: 200 });

    } catch (err: any) {
        console.error('[SEO Cron] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
