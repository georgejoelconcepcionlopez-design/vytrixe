import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Share2, Clock, User, Globe } from 'lucide-react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';
import NewsCard from '@/components/NewsCard';
import { ShareButtons } from '@/components/ShareButtons';
import { generateMetadataFromArticle, generateArticleSchema } from '@/utils/seo';
import { injectContextualLinks } from '@/utils/internalLinks';
import ArticleRenderer from '@/components/ArticleRenderer';
import { Metadata } from 'next';

interface NewsPageProps {
    params: Promise<{ slug: string }>;
}

import { ALL_CONTENT } from '@/data/content';

async function getArticle(slug: string) {
    // 0. Check Static Content (Premium)
    const staticArticle = ALL_CONTENT.find(a => a.slug === slug);
    if (staticArticle) {
        return {
            ...staticArticle,
            image: staticArticle.image_url, // Map for compatibility
            image_url: staticArticle.image_url,
            description: staticArticle.summary,
            views: 1205 // Mock views
        };
    }

    const supabase = await createClient();

    // 1. Try fetching from 'news' table
    let { data: article, error } = await (supabase as any)
        .from('news')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

    if (!article || error) {
        // 2. Fallback check: Is it a trend article?
        const { data: trendArticle } = await supabase
            .from('trend_articles')
            .select('*, categories!inner(slug)')
            .eq('trend_id', slug)
            .maybeSingle() as any;

        if (trendArticle) {
            return { redirect: `/topic/${trendArticle.categories.slug}/${slug}` };
        }

        return null;
    }

    // Normalize data for helpers
    return {
        ...article,
        image_url: article.image, // Map image -> image_url
        description: article.excerpt || article.description // Map excerpt -> description
    };
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article || article.redirect) {
        return {
            title: 'Article Not Found | Vytrixe',
        };
    }

    return generateMetadataFromArticle(article);
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    if (article.redirect) {
        redirect(article.redirect);
    }

    const supabase = await createClient();

    // Increment views (Non-blocking)
    (supabase as any)
        .from('news')
        .update({ views: (article.views || 0) + 1 })
        .eq('id', article.id);

    // Fetch related news
    const { data: relatedNews } = await (supabase as any)
        .from('news')
        .select('*')
        .eq('category', article.category)
        .neq('id', article.id)
        .limit(3);

    const structuredData = generateArticleSchema(article);
    const processedContent = injectContextualLinks(article.content || '');

    return (
        <main className="min-h-screen bg-[#02040A] text-white">
            {/* Structured Data JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Article Header */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                <img
                    src={article.image_url || ''}
                    alt={article.title || ''}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/40 to-transparent" />

                <div className="absolute bottom-0 w-full p-8 md:p-16">
                    <div className="container mx-auto max-w-4xl space-y-6">
                        <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-cyan-400 mb-8 uppercase tracking-widest transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Intelligence
                        </Link>

                        <Badge className="bg-cyan-500 text-black font-black uppercase italic px-4 py-1">
                            {article.category}
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-cyan-500" /> {article.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-cyan-500" /> {article.source}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-cyan-500" /> {new Date(article.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="grid lg:grid-cols-4 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        <AdBlock position="article_top" />


                        <div className="text-lg leading-relaxed text-slate-300">
                            <ArticleRenderer content={processedContent} />
                        </div>

                        {/* Financial Disclaimer */}
                        <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-sm text-slate-400 italic">
                            "Vytrixe provides informational analysis and does not constitute financial advice. All investment strategies and investments involve risk of loss. Nothing contained in this website should be construed as investment advice."
                        </div>

                        {/* Share & Meta */}
                        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Spread the Intel</span>
                                <ShareButtons url={`/news/${article.slug}`} title={article.title || ''} />
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 uppercase">
                                ID: {article.id} | Views: {article.views}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="sticky top-24">
                            <h4 className="text-sm font-black uppercase italic mb-6 text-cyan-500 tracking-widest border-b border-cyan-500/20 pb-2">Related Intelligence</h4>
                            <div className="space-y-6">
                                {relatedNews?.map((news: any) => (
                                    <NewsCard key={news.id} news={news} />
                                ))}
                            </div>
                            <AdBlock position="article_sidebar" />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
