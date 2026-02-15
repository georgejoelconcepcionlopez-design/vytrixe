
import { fetchTrendArticle, fetchVytrixeArticle, TrendArticle, ArticleSection } from "@/services/articleService"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { AdBanner } from "@/components/AdBanner"
import { ShareButtons } from "@/components/ShareButtons"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Globe, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { AffiliateBlock } from "@/components/AffiliateBlock"
import { RelatedTrendsGrid } from "@/components/RelatedTrendsGrid"
import { NextTrendSection } from "@/components/NextTrendSection"
import { SidebarWidgets } from "@/components/SidebarWidgets"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { EditorialTransparency } from "@/components/EditorialTransparency"
import { AuthorProfileCard } from "@/components/AuthorProfileCard"
import { createClient } from "@/lib/supabase/server"
import { VelocityBadge } from "@/components/VelocityBadge"
import { PremiumLock } from "@/components/PremiumLock"

interface PageProps {
    params: Promise<{ country: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { country, slug } = await params

    // Check Vytrixe first
    const lang = ['es', 'mx', 'do'].includes(country) ? 'es' : 'en';
    const { article: vytrixeArticle } = await fetchVytrixeArticle(slug, lang);

    if (vytrixeArticle) {
        const content = vytrixeArticle.content[lang];
        return {
            title: content.metaTitle || content.title,
            description: content.metaDescription || content.summary,
            openGraph: {
                title: content.metaTitle || content.title,
                description: content.metaDescription || content.summary,
                type: 'article',
                publishedTime: vytrixeArticle.published_at,
                images: [{ url: vytrixeArticle.image_url || '', width: 1200, height: 630 }]
            }
        }
    }

    const article = await fetchTrendArticle(slug, country) as TrendArticle | null

    if (!article) {
        return {
            title: 'Trend Not Found | Vytrixe',
            description: 'The requested trend analysis could not be found.'
        }
    }

    return {
        title: article.seo_title,
        description: article.seo_description,
        openGraph: {
            title: article.seo_title,
            description: article.seo_description,
            type: 'article',
            publishedTime: article.published_at,
            authors: ['Vytrixe AI'],
            images: [
                {
                    url: article.image_url || "https://images.unsplash.com/photo-1504711432869-5d593f5f203e?auto=format&fit=crop&q=80&w=1200",
                    width: 1200,
                    height: 630
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: article.seo_title,
            description: article.seo_description,
        },
        alternates: {
            canonical: `https://vytrixe.com/${country}/${slug}`,
        }
    }
}

export default async function TrendArticlePage({ params }: PageProps) {
    const { country, slug } = await params

    // 1. Try Fetching Vytrixe Article (New Model)
    const lang = ['es', 'mx', 'do'].includes(country) ? 'es' : 'en';
    const { article: vytrixeArticle, isLocked } = await fetchVytrixeArticle(slug, lang);

    if (vytrixeArticle) {
        const content = vytrixeArticle.content[lang];

        return (
            <div className="container mx-auto max-w-4xl px-4 py-8 grid lg:grid-cols-[1fr_250px] gap-12">
                <main>
                    <Breadcrumbs items={[
                        { label: country.toUpperCase(), href: `/${country}` },
                        { label: vytrixeArticle.category, href: `/topic/${vytrixeArticle.category}` },
                        { label: 'Analysis', href: '#' }
                    ]} />

                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        <header className="mb-8 not-prose">
                            <div className="flex items-center gap-3 mb-6">
                                <Badge variant="secondary" className="uppercase h-6 text-[10px] font-black">{country}</Badge>
                                {vytrixeArticle.is_premium && (
                                    <Badge variant="outline" className="h-6 text-[10px] font-black uppercase border-amber-500/20 text-amber-500">Premium</Badge>
                                )}
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                                {content.title}
                            </h1>
                            <div className="flex items-center justify-between border-y border-white/5 py-4 my-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                        <Globe className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-white">Vytrixe Senior Analyst</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-2">
                                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(vytrixeArticle.published_at || '').toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <ShareButtons title={content.title} url={`https://vytrixe.com/${country}/${slug}`} />
                            </div>
                        </header>

                        {/* Summary / Intro */}
                        <div className="lead text-xl mb-8 font-medium text-slate-300">
                            {content.summary}
                        </div>

                        {/* GATED CONTENT */}
                        {isLocked ? (
                            <PremiumLock />
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: content.body }} />
                        )}
                    </article>

                    {/* Related Sections */}
                    <RelatedTrendsGrid currentSlug={slug} country={country} />
                </main>
                <aside className="hidden lg:block">
                    <div className="sticky top-24 space-y-12">
                        <SidebarWidgets country={country} />
                    </div>
                </aside>
            </div>
        )
    }

    // 2. Fallback to Old Trend Model
    const article = await fetchTrendArticle(slug, country) as TrendArticle | null

    if (!article) {
        notFound()
    }

    // Fetch full author object for EEAT (using first seeded author for hybrid fallback)
    const supabase = await createClient()
    const { data: author } = await (supabase
        .from('authors')
        .select('*')
        .limit(1)
        .single() as any)

    const { data: category } = await (supabase
        .from('categories')
        .select('*')
        .limit(1)
        .single() as any)

    // Defensive FAQ logic
    const faqItems = Array.isArray(article.faq) ? article.faq : [];

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.seo_title,
        description: article.seo_description,
        datePublished: article.published_at,
        author: {
            '@type': 'Organization',
            name: 'Vytrixe Intelligence Desk',
            url: 'https://vytrixe.com/about'
        },
        ...(faqItems.length > 0 && {
            mainEntity: {
                '@type': 'FAQPage',
                mainEntity: faqItems.map((f: any) => ({
                    '@type': 'Question',
                    name: f.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: f.answer
                    }
                }))
            }
        })
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 grid lg:grid-cols-[1fr_250px] gap-12">
            <main>
                <Breadcrumbs items={[
                    { label: country.toUpperCase(), href: `/${country}` },
                    { label: category?.name || 'Intelligence', href: `/topic/${category?.slug || 'trends'}` },
                    { label: 'Analysis', href: '#' }
                ]} />

                <article className="prose prose-lg dark:prose-invert max-w-none">
                    {/* Header */}
                    <header className="mb-8 not-prose">
                        <div className="flex items-center gap-3 mb-6">
                            <Badge variant="secondary" className="uppercase h-6 text-[10px] font-black">{country}</Badge>
                            <VelocityBadge score={article.score || 75} />
                            <Badge variant="outline" className="h-6 text-[10px] font-black uppercase border-cyan-500/20 text-cyan-500 italic">Analysis</Badge>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                            {article.title}
                        </h1>

                        {/* Author Identity Block */}
                        <div className="flex items-center justify-between border-y border-white/5 py-4 my-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                    <Globe className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-white">Vytrixe Intelligence Desk</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-2">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(article.published_at).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>2 min read</span>
                                    </div>
                                </div>
                            </div>
                            <ShareButtons title={article.title} url={`https://vytrixe.com/${country}/${slug}`} />
                        </div>
                    </header>

                    {/* Top Ad */}
                    <AdBanner dataAdSlot="1122334455" className="my-8 h-[250px] w-full" dataAdFormat="rectangle" />

                    {/* Introduction */}
                    <div className="lead text-xl mb-8">
                        {article.introduction}
                    </div>

                    {/* Content Sections */}
                    {article.sections.map((section: ArticleSection, idx: number) => (
                        <section key={idx} id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="mb-8 scroll-mt-20">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                {section.heading}
                            </h2>
                            <p>{section.content}</p>

                            {/* Middle Ad specific placement */}
                            {idx === 0 && (
                                <>
                                    <AdBanner dataAdSlot="5544332211" className="my-8 h-[120px] w-full" />
                                    {/* Affiliate Block after first section */}
                                    <AffiliateBlock tags={[article.seo_title.toLowerCase(), 'tech']} />
                                </>
                            )}
                        </section>
                    ))}

                    {/* FAQ Section */}
                    {article.faq && (
                        <section className="bg-white/5 rounded-xl p-6 my-8 border border-white/5 not-prose">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                                <ShieldCheck className="h-5 w-5 text-cyan-500" /> Frequently Asked Questions
                            </h3>
                            <div className="space-y-4">
                                {article.faq.map((item: any, i: number) => (
                                    <div key={i} className="border-b border-white/5 last:border-0 pb-4 last:pb-0">
                                        <h4 className="font-semibold text-slate-200 mb-1">{item.question}</h4>
                                        <p className="text-sm text-slate-400">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Bottom Ad */}
                    <AdBanner dataAdSlot="9988776655" className="my-12 h-[250px] w-full" dataAdFormat="rectangle" />

                    {/* Related Links */}
                    {article.related_links.length > 0 && (
                        <div className="bg-muted/30 p-6 rounded-lg border my-8 not-prose">
                            <h3 className="text-lg font-semibold mb-3">Sources & Related Links</h3>
                            <ul className="space-y-2">
                                {article.related_links.map((link: any, i: number) => (
                                    <li key={i}>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-2">
                                            <Globe className="h-3 w-3" /> {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Phase 7: EEAT Signals */}
                    <EditorialTransparency
                        updatedAt={article.published_at}
                        readingTime="4 min read"
                        sources={article.related_links.map((l: any) => ({ name: l.title, url: l.url }))}
                        factCheckedBy={author?.name}
                    />

                    {author && <AuthorProfileCard author={author} />}
                </article>

                {/* Phase 6: Revenue Multiplier Layer */}
                <RelatedTrendsGrid currentSlug={slug} country={country} />
                <NextTrendSection currentSlug={slug} country={country} />

                {/* Script for JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </main>

            {/* Sidebar (TOC & More) */}
            <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-12">
                    {article.table_of_contents && article.table_of_contents.length > 0 && (
                        <div className="p-6 bg-[#0A0F1F] rounded-2xl border border-white/5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">On this page</h4>
                            <nav className="space-y-1 border-l-2 border-white/5">
                                {article.table_of_contents?.map((item: any) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="block pl-4 py-1 text-sm text-slate-400 hover:text-cyan-400 hover:border-l-2 hover:border-cyan-500 -ml-[2px] transition-all"
                                    >
                                        {item.text}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    )}

                    {/* Phase 6 Sidebar Widgets */}
                    <SidebarWidgets country={country} />
                </div>
            </aside>
        </div>
    )
}
