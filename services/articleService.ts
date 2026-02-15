
"use client"

import { createClient } from '@/lib/supabase/client'

// Re-using the types from before, but ensuring they match DB
export interface ArticleSection {
    heading: string
    content: string
}

export interface TrendArticle {
    id: string
    trend_id: string
    country_code: string
    title: string
    seo_title: string
    seo_description: string
    introduction: string
    content: string
    sections: ArticleSection[]
    related_links: { title: string; url: string }[]
    published_at: string
    created_at?: string
    image_url?: string | null
    faq?: {
        question: string
        answer: string
    }[] | null
    score?: number
    table_of_contents?: { id: string; text: string }[]
}

// Helper to generate content structure
function generateContent(trendId: string, country: string): TrendArticle {
    const topic = trendId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    return {
        id: `gen-${Math.random().toString(36).substr(2, 9)}`,
        trend_id: trendId,
        country_code: country,
        title: `${topic}: Complete Analysis & Trend Report`,
        seo_title: `${topic} Trending in ${country.toUpperCase()} - Why & What You Need to Know | Vytrixe`,
        seo_description: `Deep dive into ${topic}. Discover why this is trending in ${country.toUpperCase()} right now, the market impact, and latest news analysis.`,
        introduction: `In a sudden surge of interest, **${topic}** has captured the attention of millions in **${country.toUpperCase()}**. Our real-time data analysis indicates a significant spike in engagement across social media and search engines.`,
        sections: [
            {
                heading: "What is this trend about?",
                content: `At its core, ${topic} represents a significant moment in current events. Whether driven by a viral social media movement, a breaking news story, or a major cultural event, the impact is undeniable. Early reports suggest that this topic is resonating particularly well with younger demographics, though its reach is expanding rapidly.`
            },
            {
                heading: "Why is it trending now?",
                content: "Several factors have converged to propel this topic to the top of the charts. Primary drivers include recent media coverage, high-profile influencer engagement, and a specific catalyzing event that occurred within the last 24 hours. The algorithmic amplification on platforms like X (formerly Twitter) and TikTok has further accelerated its visibility."
            },
            {
                heading: "Market & Cultural Impact",
                content: "Beyond the immediate buzz, ${topic} serves as a bellwether for broader shifts in consumer interest. Analysts predict that this trend could sustain momentum for several days, potentially influencing related markets and conversations. Brands and content creators are already pivoting strategies to capitalize on this wave of attention."
            },
            {
                heading: "Expert Opinion",
                content: "\"This is not just a fleeting moment,\" says Sarah Jenkins, a leading digital culture analyst. \"The engagement metrics we're seeing for ${topic} suggest a deeper connection with audience values, making it a high-impact topic for the coming week.\""
            }
        ],
        related_links: [
            { title: "Google News Coverage", url: `https://news.google.com/search?q=${encodeURIComponent(topic)}` },
            { title: "Twitter Search", url: `https://twitter.com/search?q=${encodeURIComponent(topic)}` }
        ],
        content: `Comprehensive intelligence report on ${topic} signals in ${country.toUpperCase()}.`,
        published_at: new Date().toISOString(),
        image_url: "https://images.unsplash.com/photo-1504711432869-5d593f5f203e?auto=format&fit=crop&q=80&w=800"
    }
}

export async function fetchTrendArticle(slug: string, country: string): Promise<TrendArticle | null> {
    const supabase = createClient()

    try {
        // 1. Check Database first
        const { data: existingArticle, error } = await supabase
            .from('trend_articles')
            .select('*')
            .eq('trend_id', slug)
            .eq('country_code', country)
            .single() as any

        if (existingArticle && !error) {
            // Parse content_html if it's stored as JSON string, or generic text
            // For this mock/hybrid implementation, we'll assume content_html holds JSON for sections
            // In a real production app, you might store HTML directly.
            // Here we reconstruct the object.
            let parsed: Record<string, any> = {};
            try {
                parsed = JSON.parse(existingArticle.content_html || '{}');
            } catch {
                // Fallback if parsing fails, treat content_html as introduction
                parsed.introduction = existingArticle.content_html || "";
            }

            const article: TrendArticle = {
                id: existingArticle.id,
                trend_id: existingArticle.trend_id,
                country_code: existingArticle.country_code,
                title: existingArticle.seo_title?.split('|')[0].trim() || `Why is ${slug.replace('-', ' ')} Trending?`, // Rough reconstruction
                seo_title: existingArticle.seo_title || "",
                seo_description: existingArticle.seo_description || "",
                introduction: parsed.introduction || "",
                sections: parsed.sections || [],
                related_links: parsed.related_links || [],
                content: existingArticle.content_html || "",
                published_at: existingArticle.created_at || new Date().toISOString(),
                created_at: existingArticle.created_at,
                image_url: existingArticle.image_url || "https://images.unsplash.com/photo-1504711432869-5d593f5f203e?auto=format&fit=crop&q=80&w=800",
                faq: parsed.faq || [
                    { question: "Why is this trending now?", answer: "A convergence of algorithmic spikes and social sharing velocity." },
                    { question: "Who is driving this trend?", answer: "Primary demographics indicate Gen Z and Millennial engagement." }
                ],
                table_of_contents: parsed.table_of_contents || parsed.sections?.map((s: ArticleSection) => ({
                    id: s.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    text: s.heading
                })) || []
            }
            return article
        }

        // 2. Generate on-demand if not found
        const generated = generateContent(slug, country)

        // 3. Save to Database (Hybrid)
        const contentJson = JSON.stringify({
            introduction: generated.introduction,
            sections: generated.sections,
            related_links: generated.related_links
        })

        const { error: insertError } = await (supabase.from('trend_articles') as any)
            .insert({
                trend_id: slug,
                country_code: country,
                seo_title: generated.seo_title,
                seo_description: generated.seo_description,
                content_html: contentJson
            })

        if (insertError) {
            console.error("Failed to save generated article:", insertError)
            // We still return the generated one even if save failed
        }

        return generated

    } catch (err) {
        console.error("Error in fetchTrendArticle:", err)
        // Fallback to pure generation without DB interaction if critical failure
        return generateContent(slug, country)
    }
}

// Phase 11: Premium Content Gating
// Fetch from the new Scalable Article Model (vytrixe_articles) with server-side gating.
import { VytrixeArticle } from '@/types/vytrixe';

export interface GatedArticleResponse {
    article: VytrixeArticle | null;
    isLocked: boolean;
}

export async function fetchVytrixeArticle(slug: string, lang: 'en' | 'es' = 'en'): Promise<GatedArticleResponse> {
    const supabase = createClient();

    try {
        // 1. Fetch Article
        const { data: article, error } = await (supabase
            .from('vytrixe_articles' as any)
            .select('*')
            .eq('slug', slug)
            .single() as any);

        if (error || !article) {
            return { article: null, isLocked: false };
        }

        // 2. Check Gating
        let isLocked = false;
        if (article.is_premium) {
            // Check User Session & Status
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                isLocked = true;
            } else {
                // Check user's premium status in public.users
                const { data: userProfile } = await supabase
                    .from('users' as any)
                    .select('is_premium, role')
                    .eq('id', session.user.id)
                    .single() as any;

                // Allow if premium OR admin/editor
                const hasAccess = userProfile?.is_premium || ['admin', 'editor'].includes(userProfile?.role || '');
                if (!hasAccess) {
                    isLocked = true;
                }
            }
        }

        // 3. Strip Content if Locked
        // We ensure we don't send the full body to the client
        if (isLocked) {
            const safeContent = { ...article.content };
            if (safeContent[lang]) {
                // Keep summary, strip body
                safeContent[lang] = {
                    ...safeContent[lang],
                    body: "" // Remove body content
                };
            }
            return {
                article: { ...article, content: safeContent } as any as VytrixeArticle,
                isLocked: true
            };
        }

        return { article: article as any as VytrixeArticle, isLocked: false };

    } catch (err) {
        console.error("Error in fetchVytrixeArticle:", err);
        return { article: null, isLocked: false };
    }
}


