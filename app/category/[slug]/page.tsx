import Link from 'next/link'
import { Flame } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdPlaceholder } from '@/components/AdPlaceholder'
import { getArticlesByCategory } from '@/lib/db'
import { ArticleCard } from '@/components/article-card'

export const revalidate = 60; // Auto update

interface CategoryPageProps {
    params: Promise<{ slug: string }>
}

const CATEGORIES = ['ai', 'technology', 'crypto', 'startups', 'business', 'viral', 'tools'];

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params
    if (!CATEGORIES.includes(slug.toLowerCase())) {
        return { title: 'Category Not Found | Vytrixe' }
    }
    return {
        title: `${slug.toUpperCase()} News & Intelligence | Vytrixe`,
        description: `Latest trends, analysis, and breaking news in ${slug}.`,
        openGraph: {
            title: `${slug.toUpperCase()} News & Intelligence | Vytrixe`,
            description: `Latest trends, analysis, and breaking news in ${slug}.`,
            url: `https://vytrixe.com/category/${slug}`,
            siteName: 'Vytrixe',
            type: 'website'
        }
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params
    const catSlug = slug.toLowerCase()

    if (!CATEGORIES.includes(catSlug)) {
        notFound()
    }

    const { data: categoryArticles } = await getArticlesByCategory(catSlug).then(data => ({ data }))

    const featured = categoryArticles[0];
    const latestNews = categoryArticles.slice(1, 7);
    const trendingStories = categoryArticles.slice(7, 12);

    return (
        <main className="min-h-screen bg-background text-foreground font-sans pt-8 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Category Header */}
                <div className="mb-12 border-b border-border pb-6">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-primary flex items-center gap-3">
                        <Flame className="w-8 h-8 text-secondary" /> {catSlug}
                    </h1>
                    <p className="text-muted-foreground mt-4 text-lg">
                        Real-time intelligence and trend analysis for {catSlug}.
                    </p>
                </div>

                {/* Ad Placement: Top */}
                <div className="mb-12">
                    <AdPlaceholder slot="category-top" label="Sponsor" className="w-full h-[90px]" />
                </div>

                {categoryArticles.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground font-mono bg-card border border-border rounded-xl">
                        No articles published yet.
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-12 gap-8 mb-16">
                        {/* Main Content Area (Left) */}
                        <div className="lg:col-span-8 space-y-12">

                            {/* Featured Story */}
                            {featured && (
                                <section>
                                    <h2 className="text-xl font-bold uppercase tracking-widest text-primary mb-6 border-l-4 border-secondary pl-3">
                                        Featured Story
                                    </h2>
                                    <ArticleCard
                                        variant="featured"
                                        slug={featured.slug}
                                        title={featured.title}
                                        excerpt={featured.excerpt}
                                        category={featured.category}
                                        imageUrl={featured.imageUrl}
                                        author={featured.author}
                                        date={featured.createdAt}
                                    />
                                </section>
                            )}

                            {/* Ad Placement: Mid */}
                            <div className="py-4">
                                <AdPlaceholder slot="category-mid" label="Sponsor" className="w-full h-[90px]" />
                            </div>

                            {/* Latest Articles */}
                            {latestNews.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-bold uppercase tracking-widest text-primary mb-6 border-l-4 border-secondary pl-3">
                                        Latest Articles
                                    </h2>
                                    <div className="space-y-6">
                                        {latestNews.map((article: any, idx: number) => (
                                            <ArticleCard
                                                key={idx}
                                                variant="list"
                                                slug={article.slug}
                                                title={article.title}
                                                excerpt={article.excerpt}
                                                category={catSlug}
                                                imageUrl={article.imageUrl}
                                                author={article.author}
                                                date={article.createdAt}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar Area (Right) */}
                        <div className="lg:col-span-4 space-y-12">

                            {/* Trending Stories */}
                            {trendingStories.length > 0 && (
                                <section className="bg-card border border-border p-6 rounded-2xl">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                                        Trending {catSlug}
                                    </h2>
                                    <div className="space-y-6">
                                        {trendingStories.map((article: any, idx: number) => (
                                            <Link key={idx} href={`/article/${article.slug}`} className="group block">
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
                            )}

                            {/* Ad Placement: Sidebar */}
                            <div className="sticky top-24">
                                <AdPlaceholder slot="category-sidebar" className="w-full h-[600px] mb-8" />
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
