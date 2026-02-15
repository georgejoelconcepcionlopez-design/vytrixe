
"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, ArrowUpRight } from 'lucide-react'

export function ExplodingWidget() {
    const [hotTrend, setHotTrend] = useState<any>(null)
    const [countdown, setCountdown] = useState(60)

    const fetchHotTrend = async () => {
        const supabase = createClient()
        const { data } = await supabase
            .from('trends')
            .select('*')
            .order('score', { ascending: false })
            .limit(1)
            .single()

        if (data) setHotTrend(data)
        setCountdown(60)
    }

    useEffect(() => {
        fetchHotTrend()
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    fetchHotTrend()
                    return 60
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    if (!hotTrend) return null

    return (
        <Card className="bg-gradient-to-r from-cyan-950/20 to-blue-950/20 border-cyan-500/20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4">
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-cyan-500/50 uppercase">Update in {countdown}s</span>
                    <div className="h-1 w-12 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyan-500 transition-all duration-1000 ease-linear"
                            style={{ width: `${(countdown / 60) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                        <Zap className="h-7 w-7 fill-cyan-400/20" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-cyan-500 text-black font-black text-[10px] px-1.5 py-0 italic">EXPLODING</Badge>
                            <span className="text-xs text-slate-500 font-medium tracking-tighter">LIVE VELOCITY RADAR</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                            {hotTrend.title}
                            <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all" />
                        </h3>
                        <p className="text-sm text-slate-400 mt-1 max-w-md">
                            Engagement spike detected across {hotTrend.country_code.toUpperCase()} platforms.
                            Current velocity score: <span className="text-cyan-400 font-mono">{(hotTrend.score * 1.5).toFixed(0)}v/m</span>
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
