
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, TrendingUp, Globe, ShoppingBag, Cpu } from 'lucide-react'

const ICON_MAP: any = {
    'cpu': Cpu,
    'trending-up': TrendingUp,
    'shopping-bag': ShoppingBag,
    'trophy': Globe // Fallback
}

export default async function ExploreByTopicPage() {
    const supabase = await createClient()

    const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .order('name')

    // For each category, get top 3 trends
    const categoriesWithTrends = await Promise.all(
        (categories || []).map(async (cat: any) => {
            const { data: trends } = await supabase
                .from('trends')
                .select('*')
                .eq('category_id', cat.id)
                .order('score', { ascending: false })
                .limit(3)
            return { ...cat, trends }
        })
    )

    return (
        <main className="min-h-screen bg-[#02040A] text-white py-24">
            <div className="container mx-auto px-4">
                <header className="max-w-3xl mb-20">
                    <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 font-black mb-6">GLOBAL DIRECTORY</Badge>
                    <h1 className="text-6xl font-black mb-8 tracking-tighter uppercase italic">Explore by Topic</h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Navigate the global trend landscape through our specialized intelligence hubs.
                        Each cluster is backed by real-time velocity data.
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-12">
                    {categoriesWithTrends.map((cat) => {
                        const Icon = ICON_MAP[cat.icon] || Globe
                        return (
                            <div key={cat.id} className="space-y-6">
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold uppercase italic">{cat.name}</h2>
                                    </div>
                                    <Link href={`/topic/${cat.slug}`} className="text-xs font-bold text-slate-500 hover:text-cyan-400 flex items-center gap-2 transition-colors">
                                        VIEW HUB <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>

                                <div className="grid gap-4">
                                    {cat.trends?.map((trend: any) => (
                                        <Link key={trend.id} href={`/${trend.country_code}/${trend.slug}`}>
                                            <Card className="bg-white/[0.02] border-white/5 hover:border-cyan-500/30 transition-all group overflow-hidden">
                                                <CardContent className="p-6 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                                                        <h3 className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors uppercase text-sm">{trend.title}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-[10px] font-mono text-slate-600">{(trend.score * 1.5).toFixed(0)}v/m</div>
                                                        <Badge variant="secondary" className="text-[9px] uppercase">{trend.country_code}</Badge>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                    {(!cat.trends || cat.trends.length === 0) && (
                                        <p className="text-xs text-slate-600 italic">No active signals in this hub currently.</p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
