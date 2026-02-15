
"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowRight } from 'lucide-react'

import { Database } from '@/types/database.types'

interface RelatedTrend {
    seo_title: string | null
    trend_id: string
    country_code: string
}

export function RelatedTrendsGrid({ currentSlug, country }: { currentSlug: string, country: string }) {
    const [related, setRelated] = useState<any[]>([])

    useEffect(() => {
        const fetchRelated = async () => {
            const supabase = createClient<Database>()
            const { data } = await supabase
                .from('trend_articles')
                .select('seo_title, trend_id, country_code, image_url')
                .eq('country_code', country)
                .neq('trend_id', currentSlug)
                .limit(6)

            if (data) setRelated(data)
        }
        fetchRelated()
    }, [currentSlug, country])

    if (related.length === 0) return null

    return (
        <div className="my-16">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
                Related Intelligence Reports
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((trend) => (
                    <Link key={trend.trend_id} href={`/${trend.country_code}/${trend.trend_id}`}>
                        <Card className="bg-white/5 border-white/10 hover:border-cyan-500/30 transition-all group cursor-pointer h-full overflow-hidden">
                            <div className="h-32 w-full overflow-hidden relative">
                                <img
                                    src={trend.image_url || 'https://images.unsplash.com/photo-1504711432869-5d593f5f203e?auto=format&fit=crop&q=80&w=800'}
                                    alt={trend.seo_title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute top-2 right-2">
                                    <Badge variant="outline" className="text-[10px] uppercase border-black/20 bg-black/50 backdrop-blur-md text-white border-none">
                                        {trend.country_code}
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h4 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2 mb-4">
                                    {(trend.seo_title || 'Intelligence Report').split('|')[0]}
                                </h4>
                                <div className="flex items-center text-[10px] font-bold text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    VIEW REPORT <ArrowRight className="h-3 w-3 ml-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
