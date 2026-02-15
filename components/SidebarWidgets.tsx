
"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Zap, Eye, TrendingUp } from 'lucide-react'

export function SidebarWidgets({ country }: { country: string }) {
    const [mostRead, setMostRead] = useState<any[]>([])
    const [velocityLeaders, setVelocityLeaders] = useState<any[]>([])

    useEffect(() => {
        const fetchStats = async () => {
            const supabase = createClient()

            // Velocity Leaders (highest score)
            const { data: velocity } = await supabase
                .from('trends')
                .select('*')
                .eq('country_code', country)
                .order('score', { ascending: false })
                .limit(5)

            if (velocity) setVelocityLeaders(velocity)

            // Most Read (mock for now using volume)
            const { data: read } = await supabase
                .from('trends')
                .select('*')
                .eq('country_code', country)
                .order('volume', { ascending: false })
                .limit(5)

            if (read) setMostRead(read)
        }
        fetchStats()
    }, [country])

    return (
        <div className="space-y-12">
            {/* Velocity Leaders */}
            <div>
                <div className="font-black text-xs uppercase tracking-widest text-cyan-500 mb-1">Vytrixe Intelligence</div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-400 fill-cyan-400/20" />
                    Velocity Leaders
                </h3>
                <div className="space-y-4">
                    {velocityLeaders.map((trend, i) => (
                        <Link key={i} href={`/${trend.country_code}/${trend.slug}`} className="group flex gap-4 items-center">
                            <span className="text-2xl font-black text-white/10 group-hover:text-cyan-500/20 transition-colors">0{i + 1}</span>
                            <div className="flex-1">
                                <h4 className="text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors line-clamp-1">{trend.title}</h4>
                                <div className="text-[10px] text-cyan-500/50 font-mono">+{trend.score.toFixed(1)}% acceleration</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Most Read */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    Hot Today
                </h3>
                <div className="space-y-6">
                    {mostRead.map((trend, i) => (
                        <Link key={i} href={`/${trend.country_code}/${trend.slug}`} className="block group">
                            <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mb-1 line-clamp-2">
                                {trend.title}
                            </h4>
                            <div className="flex items-center gap-3 text-[10px] text-slate-500">
                                <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {Math.floor(trend.volume / 100)}k</span>
                                <span className="text-white/10">•</span>
                                <span className="uppercase text-cyan-500/50">{trend.country_code} Intelligence</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Sticky Ad Box */}
            <div className="sticky top-24 pt-4">
                <div className="aspect-[3/4] rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center p-8 text-center border-dashed group hover:border-cyan-500/50 transition-colors">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Advertisement</span>
                    <div className="h-full w-full bg-cyan-500/5 rounded-lg border border-cyan-500/10 flex items-center justify-center p-4">
                        <p className="text-xs text-slate-500 font-medium">Join the TrendNova PRO community for exclusive API access and deep-dive reports.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
