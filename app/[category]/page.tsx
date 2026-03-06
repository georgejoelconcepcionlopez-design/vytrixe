import Link from 'next/link'
import { ArrowRight, Flame, Clock } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdPlaceholder } from '@/components/AdPlaceholder'
import { ALL_CONTENT } from '@/data/content'

interface CategoryPageProps {
    params: Promise<{ category: string }>
}

const CATEGORIES = ['ai', 'technology', 'crypto', 'startups', 'business', 'viral', 'tools'];

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params
    if (!CATEGORIES.includes(category.toLowerCase())) {
        return { title: 'Category Not Found | Vytrixe' }
    }
    return {
        title: `${category.toUpperCase()} News & Intelligence | Vytrixe`,
        description: `Latest trends, analysis, and breaking news in ${category}.`
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params
    const catParam = category.toLowerCase()

    if (!CATEGORIES.includes(catParam)) {
        notFound()
    }

    // Filter content by category (using mock content for now)
    // In a real app, this would query the DB
    const categoryArticles = ALL_CONTENT; // In reality: ALL_CONTENT.filter(a => a.category === catParam)

    const featured = categoryArticles[0] || ALL_CONTENT[0];
    const latestNews = categoryArticles.slice(1, 7);
    const trendingStories = categoryArticles.slice(7, 12);
    const mostRead = categoryArticles.slice(1, 5);

    return (
        <main className="min-h-screen bg-background text-foreground font-sans pt-8 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Category Header */}
                <div className="mb-12 border-b border-border pb-6">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-primary flex items-center gap-3">
                        <Flame className="w-8 h-8 text-secondary" /> {category}
                    </h1>
                    <p className="text-muted-foreground mt-4 text-lg">
                        Real-time intelligence and trend analysis for {category}.
                    </p>
                </div>

                {/* Ad Placement: Top */}
                <div className="mb-12">
                    <AdPlaceholder slot="category-top" label="Sponsor" className="w-full h-[90px]" />
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mb-16">

                    {/* Main Content Area (Left) */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Featured Story */}
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest text-primary mb-6 border-l-4 border-secondary pl-3">
                                Featured Story
                            </h2>
                            <Link href={`/news/${featured.slug}`} className="group block relative rounded-2xl overflow-hidden border border-border bg-card h-[400px]">
                                <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                                        {featured.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg line-clamp-2 md:w-3/4 mb-4">
                                        {featured.summary}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2 hours ago</span>
                                        <span>{featured.author}</span>
                                    </div>
                                </div>
                            </Link>
                        </section>

                        {/* Ad Placement: Mid */}
                        <div className="py-4">
                            <AdPlaceholder slot="category-mid" label="Sponsor" className="w-full h-[90px]" />
                        </div>

                        {/* Latest Articles */}
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest text-primary mb-6 border-l-4 border-secondary pl-3">
                                Latest Articles
                            </h2>
                            <div className="space-y-6">
                                {latestNews.map((article, idx) => (
                                    <Link key={idx} href={`/news/${article.slug}`} className="group flex flex-col sm:flex-row gap-6 bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-colors">
                                        <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative">
                                            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                                        </div>
                                        <div className="flex flex-col justify-center flex-1">
                                            <h3 className="font-bold text-xl leading-snug group-hover:text-primary transition-colors mb-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                                {article.summary}
                                            </p>
                                            <div className="flex justify-between items-center mt-auto">
                                                <span className="text-[10px] uppercase font-bold text-secondary tracking-widest">{article.category}</span>
                                                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Today</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area (Right) */}
                    <div className="lg:col-span-4 space-y-12">

                        {/* Trending Stories */}
                        <section className="bg-card border border-border p-6 rounded-2xl">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                                Trending {category}
                            </h2>
                            <div className="space-y-6">
                                {trendingStories.map((article, idx) => (
                                    <Link key={idx} href={`/news/${article.slug}`} className="group block">
                                        <div className="flex gap-4">
                                            <span className="text-2xl font-black text-border group-hover:text-secondary transition-colors">0{idx + 1}</span>
                                            <div>
                                                <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors mb-1 line-clamp-2">
                                                    {article.title}
                                                </h4>
                                                <span className="text-[10px] font-mono text-muted-foreground">Views surging</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Ad Placement: Sidebar */}
                        <div className="sticky top-24">
                            <AdPlaceholder slot="category-sidebar" className="w-full h-[600px] mb-8" />
                        </div>

                    </div>
                </div>

            </div>
        </main>
    )
}
