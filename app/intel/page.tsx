
import { Metadata } from 'next'
import Link from 'next/link'
import { ALL_CONTENT } from '@/data/content'
import { Terminal, ArrowUpRight, Calendar, Tag } from 'lucide-react'

export const metadata: Metadata = {
    title: "Global Intelligence | Vytrixe Lab",
    description: "Strategic analysis on artificial intelligence, capital markets, and technological infrastructure.",
}

export default function IntelPage() {
    // Filter for Intelligence type content (AI, Tech, Global)
    const intelArticles = ALL_CONTENT.filter(item => ['AI', 'Tech', 'Global'].includes(item.category));

    return (
        <main className="min-h-screen bg-background text-foreground font-sans">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto max-w-5xl py-16 px-4 text-center">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-secondary/50 rounded-full border border-border">
                        <Terminal className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Intelligence Terminal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                        Strategic Analysis
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Deep-dive reporting on the infrastructure of the future economy.
                    </p>
                </div>
            </div>

            {/* List View */}
            <div className="container mx-auto max-w-4xl py-12 px-4">
                <div className="flex flex-col gap-8">
                    {intelArticles.map((article) => (
                        <article key={article.id} className="group border-b border-border pb-8 last:border-0">
                            <Link href={`/news/${article.slug}`} className="block">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-full md:w-48 aspect-video md:aspect-[4/3] bg-muted rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={article.image_url}
                                            alt={article.title}
                                            className="w-full h-full object-cover saturate-0 group-hover:saturate-100 transition-all duration-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2 text-xs font-medium text-muted-foreground">
                                            <span className="text-primary font-bold uppercase tracking-wider">{article.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-border" />
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(article.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                                            {article.title}
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                                            {article.summary}
                                        </p>
                                        <div className="flex items-center gap-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                            Read Analysis <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    )
}
