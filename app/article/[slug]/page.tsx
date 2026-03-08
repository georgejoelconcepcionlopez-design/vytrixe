import { notFound } from 'next/navigation';
import { Clock, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { AdBanner, AdInline, AdSidebar, AdNative } from '@/components/ads/AdComponents';
import { ShareButtons } from '@/components/ShareButtons';
import { generateArticleSchema } from '@/utils/seo';
import ArticleRenderer from '@/components/ArticleRenderer';
import { Metadata } from 'next';
import { getArticleBySlug, getArticlesByCategory } from '@/lib/db';
import { ArticleCard } from '@/components/article-card';
import StructuredData from '@/components/StructuredData';

export const revalidate = 60; // Auto update

interface ArticlePageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: 'Article Not Found | Vytrixe',
        };
    }

    const title = article.seoTitle || article.title;
    const description = article.seoDescription || article.excerpt;

    return {
        title: `${title} | Vytrixe`,
        description: description,
        keywords: article.keywords,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            url: `https://vytrixe.com/article/${article.slug}`,
            type: 'article',
            publishedTime: new Date(article.createdAt).toISOString(),
            authors: [article.author],
            section: article.category,
            images: [
                {
                    url: article.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: [article.imageUrl],
        },
    };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
    const { slug } = await params;

    // Fetch individual article using our DB wrapper
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    // Fetch related news via DB wrapper
    const categoryArticles = await getArticlesByCategory(article.category);
    const relatedNews = categoryArticles.filter(a => a.slug !== article.slug).slice(0, 3);

    return (
        <main className="min-h-screen bg-background text-foreground font-sans pt-16">
            {/* Structured Data JSON-LD for Google Discover */}
            <StructuredData
                article={{
                    title: article.title,
                    excerpt: article.excerpt,
                    content: article.bodyHtml || '',
                    cover_image: article.imageUrl,
                    published_at: new Date(article.createdAt).toISOString(),
                    author: article.author,
                    category: article.category
                }}
                url={`https://vytrixe.com/article/${article.slug}`}
            />

            {/* Breadcrumb Navbar */}
            <div className="border-b border-border bg-card/50">
                <div className="container mx-auto px-4 max-w-6xl py-3 flex items-center text-xs font-mono text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <Link href={`/category/${article.category.toLowerCase()}`} className="hover:text-primary transition-colors uppercase">{article.category}</Link>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <span className="text-foreground truncate w-48 sm:w-auto">{article.title}</span>
                </div>
            </div>

            {/* Article Hero Container */}
            <div className="container mx-auto max-w-5xl px-4 py-12">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
                    <Link href={`/category/${article.category.toLowerCase()}`}>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6 hover:bg-primary/20 transition-colors inline-block cursor-pointer">
                            {article.category}
                        </span>
                    </Link>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
                        {article.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        {article.excerpt}
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
                            {article.createdAt}
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
                        src={article.imageUrl || ''}
                        alt={article.title || ''}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-8 flex flex-col">

                        <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Share this insight</span>
                            <ShareButtons url={`/article/${article.slug}`} title={article.title || ''} />
                        </div>

                        {/* Ad Placement: Top of Content */}
                        <div className="mb-10 w-full">
                            <AdBanner />
                        </div>

                        <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed text-lg lg:text-xl font-light">
                            {/* Rendering HTML or fallback text */}
                            <ArticleRenderer content={article.bodyHtml || '<p>Content rendering failed or awaiting intelligence sync.</p>'} />

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
                                <span>Views: {'1.2K'}</span>
                                <ShareButtons url={`/article/${article.slug}`} title={article.title || ''} />
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
                                {relatedNews.map((news, idx) => (
                                    <ArticleCard
                                        key={idx}
                                        variant="compact"
                                        slug={news.slug}
                                        title={news.title}
                                        excerpt={news.excerpt}
                                        category={news.category}
                                        imageUrl={news.imageUrl}
                                        author={news.author}
                                        date={news.createdAt}
                                    />
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
