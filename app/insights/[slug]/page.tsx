
import { fetchInsight } from "@/services/insightsService"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdBanner } from "@/components/AdBanner"
import { ShareButtons } from "@/components/ShareButtons"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await fetchInsight(slug)

    if (!post) return { title: 'Not Found' }

    return {
        title: `${post.title} | Vytrixe Insights`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.published_at,
            authors: [post.author],
        }
    }
}

export default async function InsightPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = await fetchInsight(slug)

    if (!post) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-[#02040A] text-white selection:bg-cyan-500/30 pb-20">
            {/* Progress Bar (Simulated) */}
            <div className="fixed top-0 left-0 w-full h-1 z-50">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[30%]" />
            </div>

            {/* Header */}
            <header className="py-20 bg-[#050814] border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <Link href="/insights" className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Insights
                    </Link>

                    <div className="flex gap-2 mb-6">
                        {post.tags.map(tag => (
                            <Badge key={tag} className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border-transparent">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-6">
                        <div className="flex items-center gap-6 text-slate-400 text-sm">
                            <span className="flex items-center gap-2"><User className="h-4 w-4 text-cyan-500" /> {post.author}</span>
                            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-cyan-500" /> {new Date(post.published_at).toLocaleDateString()}</span>
                        </div>
                        <ShareButtons title={post.title} url={`https://vytrixe.com/insights/${slug}`} />
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12 max-w-4xl grid md:grid-cols-[1fr_300px] gap-12">

                {/* Main Content */}
                <article>
                    {/* Top Ad */}
                    <AdBanner dataAdSlot="11223344" className="w-full h-[250px] mb-12 bg-white/5 rounded-lg border border-white/5" />

                    <div className="prose prose-invert prose-lg max-w-none prose-cyan prose-headings:text-white prose-p:text-slate-300 prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
                        <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
                    </div>

                    {/* Bottom Ad */}
                    <AdBanner dataAdSlot="55667788" className="w-full h-[250px] mt-12 bg-white/5 rounded-lg border border-white/5" />
                </article>

                {/* Sidebar */}
                <aside className="space-y-8">
                    <div className="p-6 bg-[#0A0F1F] rounded-xl border border-white/5 sticky top-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                            Related Topics
                        </h3>
                        <ul className="space-y-3">
                            {['Predictive Analytics', 'Consumer Psychology', 'Real-Time Data'].map((topic, i) => (
                                <li key={i}>
                                    <Link href="#" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors block py-1">
                                        {topic}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-cyan-900/10 to-[#0A0F1F] rounded-xl border border-cyan-500/20 text-center sticky top-[280px]">
                        <h4 className="text-white font-bold mb-2">Track Trends Live</h4>
                        <p className="text-sm text-slate-400 mb-4">Don&apos;t rely on historical reports. Get real-time intel.</p>
                        <Link href="/us">
                            <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold">
                                Launch Dashboard
                            </Button>
                        </Link>
                    </div>
                </aside>

            </div>
        </main>
    )
}
