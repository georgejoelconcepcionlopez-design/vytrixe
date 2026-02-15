
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Twitter, Linkedin, Globe, Zap } from 'lucide-react'

interface AuthorPageProps {
    params: Promise<{ slug: string }>
}

export default async function AuthorLandingPage({ params }: AuthorPageProps) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: author } = await supabase
        .from('authors')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!author) notFound()

    const { data: articles } = await supabase
        .from('trend_articles')
        .select('*')
        .eq('author_id', author.id)
        .order('created_at', { ascending: false })

    return (
        <main className="min-h-screen bg-[#02040A] text-white selection:bg-cyan-500/30">
            {/* Hero Header */}
            <div className="relative py-24 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-cyan-400 mb-12 transition-colors uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4 mr-2" /> All Intelligence
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        <div className="h-32 w-32 rounded-3xl overflow-hidden border-2 border-white/10 ring-8 ring-cyan-500/5">
                            <img src={author.avatar_url ?? ""} alt={author.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black mb-2">{author.name}</h1>
                                <p className="text-xl text-cyan-400 font-bold tracking-tight">{author.credentials}</p>
                            </div>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
                                {author.bio}
                            </p>
                            <div className="flex gap-4 justify-center md:justify-start">
                                {author.twitter_url && (
                                    <a href={author.twitter_url} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all border border-white/5">
                                        <Twitter size={20} />
                                    </a>
                                )}
                                {author.linkedin_url && (
                                    <a href={author.linkedin_url} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all border border-white/5">
                                        <Linkedin size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Articles List */}
            <section className="py-24 bg-[#050814]">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Zap className="h-5 w-5 text-cyan-400" /> Published Reports
                        </h2>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{articles?.length || 0} Analyses</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {articles?.map((article) => (
                            <Link key={article.id} href={`/${article.country_code}/${article.trend_id}`}>
                                <Card className="bg-white/[0.03] border-white/5 hover:border-cyan-500/30 transition-all group">
                                    <CardContent className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 uppercase text-[10px] font-black">{article.country_code}</Badge>
                                            <span className="text-[10px] font-mono text-slate-500 uppercase">{new Date(article.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-4 line-clamp-2">
                                            {(article.seo_title || 'Intelligence').split('|')[0]}
                                        </h3>
                                        <p className="text-sm text-slate-400 line-clamp-3 mb-6">
                                            {article.seo_description || 'Analysis of recent global search signals.'}
                                        </p>
                                        <div className="flex items-center text-xs font-black text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                                            READ FULL ANALYSIS <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
