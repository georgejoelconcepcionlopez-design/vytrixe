
"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { TrendingUp } from 'lucide-react'

import { Database } from '@/types/database.types'

export function TrendingTicker() {
    const [trends, setTrends] = useState<{ seo_title: string | null }[]>([])

    useEffect(() => {
        const fetchTrends = async () => {
            const supabase = createClient<Database>()
            const { data } = await supabase
                .from('trends')
                .select('seo_title')
                .limit(10)

            if (data) setTrends(data)
        }
        fetchTrends()
    }, [])

    if (trends.length === 0) return null

    return (
        <div className="w-full bg-slate-50 border-b border-slate-200 py-2.5 overflow-hidden whitespace-nowrap sticky top-0 z-[100] backdrop-blur-md bg-opacity-95 text-xs font-medium">
            <div className="inline-flex items-center gap-6 animate-ticker px-4">
                {/* Double the content for seamless loop */}
                {[...trends, ...trends].map((trend, i) => (
                    <div key={i} className="inline-flex items-center gap-2 group cursor-pointer">
                        <TrendingUp className="h-3 w-3 text-blue-600" />
                        <span className="font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-700 transition-colors">
                            {(trend.seo_title || 'Intelligence').split('|')[0]}
                        </span>
                        <span className="text-green-600 font-mono">
                            +1.2%
                        </span>
                        <span className="mx-2 text-slate-300">|</span>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-ticker {
                    display: inline-flex;
                    animation: ticker 30s linear infinite;
                }
                .animate-ticker:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    )
}
