"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { TrendingUp } from 'lucide-react'

import { Database } from '@/types/database.types'

export function TrendingTicker() {
    const [trends, setTrends] = useState<{ title: string }[]>([])

    useEffect(() => {
        const fetchTrends = async () => {
            const supabase = createClient<any>()
            const { data } = await supabase
                .from('trending_topics')
                .select('title')
                .eq('processed', false)
                .order('score', { ascending: false })
                .limit(10)

            if (data && data.length > 0) {
                setTrends(data as { title: string }[])
            } else {
                // Mock data for initial render if DB is empty
                setTrends([
                    { title: 'GPT-6 Rumors' },
                    { title: 'Global Sovereign AI Funds' },
                    { title: 'Nuclear Power for Data Centers' },
                    { title: 'Bitcoin Hits $100k' },
                    { title: 'AI Video Gen Boom' }
                ])
            }
        }
        fetchTrends()
    }, [])

    if (trends.length === 0) return null

    return (
        <div className="w-full bg-background border-b border-border py-2 overflow-hidden whitespace-nowrap sticky top-[64px] z-40 text-xs font-medium">
            <div className="inline-flex items-center gap-6 animate-ticker px-4">
                {/* Double the content for seamless loop */}
                {[...trends, ...trends, ...trends, ...trends].map((trend, i) => (
                    <div key={i} className="inline-flex items-center gap-2 group cursor-pointer">
                        <TrendingUp className="h-3 w-3 text-secondary" />
                        <span className="font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                            {trend.title}
                        </span>
                        <span className="mx-2 text-border">|</span>
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
