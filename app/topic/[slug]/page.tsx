
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Globe, Zap, Database } from 'lucide-react'

interface CategoryPageProps {
    params: Promise<{ slug: string }>
}

export default async function CategoryHubPage({ params }: CategoryPageProps) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: catData } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!catData) notFound()

    const { data: articles } = await supabase
        .from('trend_articles')
        .select('*')
        .eq('category_id', catData.id)
        .order('created_at', { ascending: false })

    return (
        <main className="min-h-screen bg-[#02040A] text-white">
            {/* Header Hub */}
            <div className="py-24 border-b border-white/5 bg-gradient-to-b from-[#0A0F1F] to-[#02040A]">
                <div className="container mx-auto px-4">
                    <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-cyan-400 mb-12 transition-colors uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Global Intelligence
                    </Link>

                    <div className="max-w-4xl">
                        <Badge className="bg-cyan-500 text-black font-black mb-6 px-4 py-1.5 rounded-full uppercase italic text-xs shadow-lg shadow-cyan-500/20">TREND NOVA HUB</Badge>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic">{catData.name}</h1>
                        <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl font-medium">
                            {catData.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-16 px-4 py-2 bg-white/5 rounded-2xl w-fit border border-white/5">
                        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                            <Zap className="h-4 w-4" /> Live Tracking
                        </div>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{articles?.length || 0} Active Signals</div>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {articles?.map((article) => (
                            <Link key={article.id} href={`/${article.country_code}/${article.trend_id}`}>
                                <Card className="bg-white/[0.03] border-white/5 hover:border-cyan-500/40 transition-all duration-500 relative group overflow-hidden h-full">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                    <CardContent className="p-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-10">
                                            <div className="flex gap-2">
                                                <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase px-3">{article.country_code}</Badge>
                                            </div>
                                            <Database className="h-4 w-4 text-slate-800" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-6 leading-tight">
                                            {(article.seo_title || 'Intelligence Report').split('|')[0]}
                                        </h3>
                                        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                Intelligence Report
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                                <ArrowLeft className="h-5 w-5 rotate-180" />
                                            </div>
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
