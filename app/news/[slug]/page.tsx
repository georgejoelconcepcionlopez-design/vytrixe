import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, Share2, Clock, User, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { AdBanner, AdInline, AdSidebar, AdNative } from '@/components/ads/AdComponents';
import { ShareButtons } from '@/components/ShareButtons';
import { generateMetadataFromArticle, generateArticleSchema } from '@/utils/seo';
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

    // 1. Try fetching from 'articles' table (Vytrixe schema)
    let { data: article, error } = await (supabase as any)
        .from('articles')
        .select('*, categories(name, slug), authors(name)')
        .eq('slug', slug)
        .maybeSingle();

    if (!article || error) {
        return null;
    }

    // Normalize data
    return {
        ...article,
        title: article.content.en?.title || 'Untitled',
        summary: article.content.en?.excerpt,
        content: article.content.en?.body,
        category: article.categories?.name || 'Uncategorized',
        author: article.authors?.name || 'Vytrixe Staff',
        image_url: article.image_url,
        description: article.content.en?.excerpt || ''
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

    // Increment views (Non-blocking) -> If using new schema, might need an rpc or simplified update
    // (supabase as any).from('articles').update({ views: ... })

    // Fetch related news (mocked for now)
    const relatedNews = ALL_CONTENT.filter(a => a.category === article.category && a.slug !== article.slug).slice(0, 3);
    if (relatedNews.length === 0) {
        relatedNews.push(...ALL_CONTENT.slice(0, 3));
    }

    const structuredData = generateArticleSchema(article);

    return (
        <main className="min-h-screen bg-background text-foreground font-sans pt-16">
            {/* Structured Data JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Breadcrumb Navbar */}
            <div className="border-b border-border bg-card/50">
                <div className="container mx-auto px-4 max-w-6xl py-3 flex items-center text-xs font-mono text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <Link href={`/${article.category.toLowerCase()}`} className="hover:text-primary transition-colors uppercase">{article.category}</Link>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <span className="text-foreground truncate w-48 sm:w-auto">{article.title}</span>
                </div>
            </div>

            {/* Article Hero Container */}
            <div className="container mx-auto max-w-5xl px-4 py-12">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6">
                        {article.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
                        {article.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        {article.summary}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-mono text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-foreground font-sans font-bold">
                                {article.author?.charAt(0) || 'V'}
                            </div>
                            <span className="text-foreground font-bold">{article.author}</span>
                        </div>
                        <span className="text-border">|</span>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-secondary" />
                            {new Date(article.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <span className="text-border">|</span>
                        <div className="flex items-center gap-2">
                            <span className="text-primary">5 min read</span>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="w-full aspect-[21/9] md:aspect-[16/6] relative rounded-2xl overflow-hidden mb-16 border border-border shadow-2xl">
                    <img
                        src={article.image_url || ''}
                        alt={article.title || ''}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-8 flex flex-col">

                        <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Share this insight</span>
                            <ShareButtons url={`/news/${article.slug}`} title={article.title || ''} />
                        </div>

                        {/* Ad Placement: Top of Content */}
                        <div className="mb-10 w-full">
                            <AdBanner />
                        </div>

                        <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed text-lg lg:text-xl font-light">
                            {/* Rendering HTML or fallback text */}
                            <ArticleRenderer content={article.content || '<p>Content rendering failed. Standby for sync.</p>'} />

                            {/* The AdInline is usually injected via ArticleRenderer around paragraph 3, but I'll add a native ad placeholder below the content just in case. */}
                            <div className="my-12">
                                <AdNative />
                            </div>
                        </div>

                        {/* Article Footer & Tags */}
                        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-card border border-border px-3 py-1 rounded text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer">#{article.category.toLowerCase().replace(/\s+/g, '')}</span>
                                <span className="bg-card border border-border px-3 py-1 rounded text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer">#trends</span>
                                <span className="bg-card border border-border px-3 py-1 rounded text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer">#analysis</span>
                            </div>
                            <div className="text-[10px] items-center gap-4 flex font-mono text-slate-600 uppercase">
                                <span>Views: {article.views || '1.2K'}</span>
                                <ShareButtons url={`/news/${article.slug}`} title={article.title || ''} />
                            </div>
                        </div>

                        {/* Author Box */}
                        <div className="mt-12 bg-card border border-border p-6 rounded-2xl flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-border flex items-center justify-center shrink-0">
                                <User className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-foreground mb-2">{article.author}</h4>
                                <p className="text-sm text-muted-foreground">Expert intelligence analyst focused on the intersection of capital flows and emerging technological infrastructure.</p>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Sidebar Ad Placement */}
                        <div className="w-full">
                            <AdSidebar />
                        </div>

                        {/* Sticky Related Area */}
                        <div className="sticky top-24">
                            <h4 className="text-sm font-bold uppercase mb-6 text-primary tracking-widest border-l-4 border-secondary pl-3">
                                Related Intelligence
                            </h4>
                            <div className="space-y-6">
                                {relatedNews?.map((news: any, idx) => (
                                    <Link key={idx} href={`/news/${news.slug}`} className="group block bg-card rounded-xl p-3 border border-border hover:border-primary/50 transition-colors">
                                        <div className="w-full aspect-video rounded-lg overflow-hidden relative mb-3">
                                            <img src={news.image_url} alt={news.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-secondary font-bold uppercase tracking-widest block mb-1">
                                                {news.category}
                                            </span>
                                            <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                                {news.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Read Next Section / Bottom Ads */}
            <div className="border-t border-border bg-card/30 py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex items-center justify-center mb-12">
                        <AdBanner />
                    </div>
                </div>
            </div>
        </main>
    );
}
