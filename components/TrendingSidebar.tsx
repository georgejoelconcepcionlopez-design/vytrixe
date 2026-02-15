
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { TrendingUp, ArrowRight, Zap } from 'lucide-react'

export async function TrendingSidebar() {
    const supabase = await createClient()

    // Fetch top 10 trends by score/volume across all categories
    const { data: trends } = await supabase
        .from('trends')
        .select('*, categories!inner(slug, name)')
        .limit(10)
        .order('score', { ascending: false })

    const typedTrends = trends as any[]

    return (
        <aside className="space-y-8">
            <div className="flex items-center gap-3 px-2">
                <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <TrendingUp className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Velocity Leaders</h3>
            </div>

            <div className="space-y-2">
                {typedTrends?.map((trend, idx) => (
                    <Link
                        key={trend.id}
                        href={`/topic/${trend.categories.slug}/${trend.trend_id}`}
                        className="group block p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                            <Zap className="h-12 w-12 text-cyan-400 fill-cyan-400" />
                        </div>

                        <div className="flex items-start justify-between gap-4 relative z-10">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{trend.categories.name}</span>
                                    <span className="h-1 w-1 rounded-full bg-slate-700" />
                                    <span className="text-[9px] font-bold text-cyan-500 uppercase">{trend.country_code}</span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">
                                    {trend.query || trend.trend_id}
                                </h4>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-black text-white italic">#{idx + 1}</span>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-1 w-12 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-500" style={{ width: `${trend.score}%` }} />
                                </div>
                                <span className="text-[8px] font-black text-cyan-400">{trend.score}%</span>
                            </div>
                            <ArrowRight className="h-3 w-3 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                ))}
            </div>

            <Link
                href="/breaking"
                className="flex items-center justify-center w-full py-4 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 transition-all"
            >
                View Live Intelligence Stream
            </Link>
        </aside>
    )
}
