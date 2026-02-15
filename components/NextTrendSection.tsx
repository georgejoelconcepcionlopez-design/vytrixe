
"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, ArrowRight } from 'lucide-react'

export function NextTrendSection({ currentSlug, country }: { currentSlug: string, country: string }) {
    const [nextTrend, setNextTrend] = useState<any>(null)
    const [timer, setTimer] = useState(45)

    useEffect(() => {
        const fetchNext = async () => {
            const supabase = createClient()
            const { data } = await supabase
                .from('trends')
                .select('*')
                .eq('country_code', country)
                .neq('slug', currentSlug)
                .order('score', { ascending: false })
                .limit(1)
                .single()

            if (data) setNextTrend(data)
        }
        fetchNext()

        const interval = setInterval(() => {
            setTimer((prev) => (prev <= 1 ? 45 : prev - 1))
        }, 1000)

        return () => clearInterval(interval)
    }, [currentSlug, country])

    if (!nextTrend) return null

    return (
        <div className="mt-20 border-t border-white/5 pt-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <Clock className="h-3 w-3" /> Auto-sync in {timer}s
                    </div>
                </div>
            </div>

            <Card className="bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent border-cyan-500/20 overflow-hidden group">
                <CardContent className="p-8 md:p-12 text-center md:text-left md:flex items-center justify-between gap-8">
                    <div className="flex-1 space-y-4">
                        <span className="text-cyan-400 text-xs font-bold uppercase tracking-thicker">NEXT UP</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {nextTrend.title}
                        </h2>
                        <p className="text-slate-400 max-w-xl">
                            Intelligence reports indicate this topic is seeing a significant surge in momentum. Catch the breakdown before it hits mainstream.
                        </p>
                    </div>
                    <Link href={`/${nextTrend.country_code}/${nextTrend.slug}`}>
                        <Button className="mt-6 md:mt-0 bg-white text-black hover:bg-cyan-500 hover:text-white transition-all font-bold h-14 px-8 rounded-full">
                            Read Next <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
