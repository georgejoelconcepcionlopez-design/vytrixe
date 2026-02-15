
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, User, ShieldCheck, Zap, Globe, FileText, ChevronRight } from 'lucide-react'
import { EditorialTransparency } from '@/components/EditorialTransparency'
import { ShareButtons } from '@/components/ShareButtons'
import { TrendingSidebar } from '@/components/TrendingSidebar'
import { Metadata } from 'next'
import { ArrowRight, TrendingUp } from 'lucide-react'

interface ProgrammaticArticlePageProps {
    params: Promise<{ slug: string; articleSlug: string }>
}

export async function generateMetadata({ params }: ProgrammaticArticlePageProps): Promise<Metadata> {
    const { articleSlug } = await params
    const supabase = await createClient()

    const { data: article } = await supabase
        .from('trend_articles')
        .select('seo_title, seo_description')
        .eq('trend_id', articleSlug)
        .single()

    if (!article) return { title: 'Intelligence Report | Vytrixe' }

    const title = article.seo_title ?? 'Intelligence Report | Vytrixe'
    const description = article.seo_description ?? 'Strategic market intelligence from Vytrixe.'

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article'
        },
        alternates: {
            canonical: `https://vytrixe.com/topic/${articleSlug}`
        }
    }
}

export default async function ProgrammaticArticlePage({ params }: ProgrammaticArticlePageProps) {
    const { slug: categorySlug, articleSlug: trendSlug } = await params
    const supabase = await createClient()

    // 1. Fetch Data with Category Join
    const { data: article } = (await supabase
        .from('trend_articles')
        .select('*, categories!inner(*)')
        .eq('trend_id', trendSlug)
        .eq('categories.slug', categorySlug)
        .single()) as any

    if (!article) notFound()

    // 2. Parse Intelligence Payload
    let parsed: any = {}
    try {
        parsed = JSON.parse(article.content_html)
    } catch {
        parsed = { introduction: article.content_html, sections: [] }
    }

    // 3. Fetch Related Global Signals (Internal Linking)
    const { data: related } = (await supabase
        .from('trend_articles')
        .select('*, categories!inner(*)')
        .eq('category_id', article.category_id)
        .neq('trend_id', trendSlug)
        .limit(6)) as any

    const { data: globalTrending } = (await supabase
        .from('trend_articles')
        .select('*, categories!inner(*)')
        .limit(4)) as any

    // 4. Multi-Schema Injection
    const newsSchema = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.seo_title,
        "description": article.seo_description,
        "datePublished": article.created_at,
        "author": { "@type": "Organization", "name": "Vytrixe Intelligence" }
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Global Hub", "item": "https://vytrixe.com" },
            { "@type": "ListItem", "position": 2, "name": article.categories.name, "item": `https://vytrixe.com/topic/${categorySlug}` },
            { "@type": "ListItem", "position": 3, "name": "Intelligence Report", "item": `https://vytrixe.com/topic/${categorySlug}/${trendSlug}` }
        ]
    }

    const faqSchema = parsed.faq ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": parsed.faq.map((f: any) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
    } : null

    return (
        <main className="min-h-screen bg-[#02040A] text-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

            {/* Breadcrumb Navigation */}
            <nav className="border-b border-white/5 bg-[#02040A]/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-tighter text-slate-500">
                    <Link href="/" className="hover:text-cyan-400">Hub</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link href={`/topic/${categorySlug}`} className="hover:text-cyan-400">{article.categories.name}</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-white truncate max-w-[200px] italic">Intelligence Report</span>
                </div>
            </nav>

            <article className="container mx-auto px-4 py-24 max-w-6xl">
                <div className="grid lg:grid-cols-4 gap-16">
                    {/* Main Content Column */}
                    <div className="lg:col-span-3">
                        <header className="mb-16">
                            <Link href={`/category/${categorySlug}`} className="inline-flex items-center text-xs font-black text-cyan-500 hover:text-cyan-400 transition-colors uppercase tracking-[0.2em] mb-12">
                                <ArrowLeft className="h-4 w-4 mr-2" /> {article.categories.name} Hub
                            </Link>

                            <Badge className="bg-cyan-500 text-black font-black mb-10 px-6 py-2 rounded-full uppercase italic text-[10px] shadow-2xl shadow-cyan-500/20">
                                DOMINION INTELLIGENCE: {article.country_code.toUpperCase()}
                            </Badge>

                            <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-[0.85] uppercase italic text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
                                {(article.seo_title || 'Intelligence').split('|')[0]}
                            </h1>

                            <div className="flex flex-wrap items-center gap-10 text-slate-500 text-[10px] font-black uppercase tracking-widest border-y border-white/5 py-10">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span>AI Intelligence Desk</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>Updated {new Date(article.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-cyan-400">
                                    <Zap className="h-4 w-4 fill-cyan-400" />
                                    <span>Velocity Index: {parsed.velocity_score || '98.5'}</span>
                                </div>
                                <div className="ml-auto flex items-center gap-6">
                                    <ShareButtons title={article.seo_title} url={`/topic/${categorySlug}/${trendSlug}`} />
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-invert prose-cyan max-w-none">
                            <div className="text-2xl md:text-3xl leading-[1.4] text-slate-200 font-medium mb-16 first-letter:text-9xl first-letter:font-black first-letter:text-cyan-500 first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8] first-letter:italic">
                                {parsed.introduction}
                            </div>

                            <EditorialTransparency
                                updatedAt={article.created_at}
                                readingTime={`${Math.ceil((parsed.word_count || 1200) / 200)} min`}
                                sources={[
                                    { name: `${article.categories.name} Global Index`, url: "#" },
                                    { name: "Real-time Search Velocity Data", url: "#" },
                                    { name: "Government Trade Statistics", url: "#" }
                                ]}
                            />

                            <div className="space-y-24 mt-24">
                                {parsed.sections?.map((section: any, idx: number) => (
                                    <section key={idx} className="group">
                                        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-10 relative">
                                            <span className="absolute -left-8 top-0 text-cyan-500/20 group-hover:text-cyan-500 transition-colors">/</span>
                                            {section.heading}
                                        </h2>
                                        <div className="text-xl leading-relaxed text-slate-400 font-medium space-y-6">
                                            {section.content.split(' [').map((chunk: string, i: number) => (
                                                <p key={i}>{i > 0 ? '[' + chunk : chunk}</p>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>

                            {/* Internal Linking Engine: Related Analysis */}
                            <section className="mt-32 pt-24 border-t border-white/5">
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-500 mb-12">Related Intelligence Vector</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {related?.map((item: any) => (
                                        <Link key={item.id} href={`/topic/${item.categories.slug}/${item.trend_id}`} className="group block p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-cyan-500/30 transition-all">
                                            <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-4">{item.categories.name} Intelligence</div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight mb-6">
                                                {item.seo_title.split('|')[0]}
                                            </h3>
                                            <div className="flex items-center text-[10px] font-black uppercase text-cyan-500">
                                                Read Report <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            {/* Global Trending Engine */}
                            <section className="mt-24 pt-24 border-t border-white/5">
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-12">Global Signal Pulse</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {globalTrending?.map((item: any) => (
                                        <Link key={item.id} href={`/topic/${item.categories.slug}/${item.trend_id}`} className="group space-y-4">
                                            <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 group-hover:border-cyan-500/50 transition-all overflow-hidden flex items-center justify-center">
                                                <TrendingUp className="h-6 w-6 text-white/20 group-hover:text-cyan-500 group-hover:scale-110 transition-all" />
                                            </div>
                                            <h4 className="text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors leading-snug">
                                                {item.seo_title.split('|')[0]}
                                            </h4>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            {/* FAQ Block */}
                            {parsed.faq && (
                                <section className="mt-32 pt-24 border-t border-white/5">
                                    <div className="flex items-center gap-5 mb-16">
                                        <ShieldCheck className="h-10 w-10 text-cyan-400" />
                                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">Intelligence FAQ</h2>
                                    </div>
                                    <div className="grid gap-6">
                                        {parsed.faq.map((item: any, idx: number) => (
                                            <div key={idx} className="bg-white/[0.02] border border-white/5 p-12 rounded-[40px] hover:border-cyan-500/20 transition-all group overflow-hidden relative">
                                                <div className="absolute top-0 right-0 p-8 text-cyan-500/5 font-black text-8xl italic select-none">Q{idx + 1}</div>
                                                <h3 className="text-2xl font-black text-white mb-6 group-hover:text-cyan-400 transition-colors relative z-10">{item.question}</h3>
                                                <p className="text-lg text-slate-400 leading-relaxed relative z-10">{item.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Trending Leaders */}
                    <aside className="space-y-16">
                        <div className="sticky top-24 space-y-16">
                            <TrendingSidebar />

                            <div className="p-10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-[40px] space-y-6 relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                    <Zap className="h-32 w-32 text-cyan-400 fill-cyan-400" />
                                </div>
                                <Zap className="h-10 w-10 text-cyan-400" />
                                <h3 className="text-2xl font-black italic tracking-tighter leading-none text-white">Vytrixe PRO</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    Access the full velocity index and get real-time expansion alerts.
                                </p>
                                <button className="w-full bg-cyan-500 text-black font-black hover:bg-cyan-400 rounded-2xl py-5 uppercase text-[10px] italic transition-all shadow-xl shadow-cyan-500/20 active:scale-95">Unlock Data</button>
                            </div>

                            <div className="flex items-center gap-4 text-slate-600 px-6">
                                <FileText className="h-4 w-4" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Report Ref: {trendSlug.slice(0, 8)}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>
        </main>
    )
}
