"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Activity, Globe } from "lucide-react"

// Fallback Mock Data
const MOCK_MARKETS = [
    { symbol: "SPX", name: "S&P 500", price: 5432.10, change: 1.25, changePercent: 0.45, type: "index" },
    { symbol: "NDX", name: "Nasdaq 100", price: 18980.50, change: -45.20, changePercent: -0.24, type: "index" },
    { symbol: "DJI", name: "Dow Jones", price: 39500.00, change: 120.50, changePercent: 0.31, type: "index" },
    { symbol: "BTC-USD", name: "Bitcoin", price: 68500.00, change: 1500.00, changePercent: 2.24, type: "crypto" },
    { symbol: "ETH-USD", name: "Ethereum", price: 3850.00, change: 85.00, changePercent: 2.25, type: "crypto" },
    { symbol: "EUR-USD", name: "Euro / USD", price: 1.0850, change: -0.0020, changePercent: -0.18, type: "forex" },
    { symbol: "XAU-USD", name: "Gold", price: 2350.50, change: 15.00, changePercent: 0.64, type: "commodity" },
    { symbol: "NVDA", name: "NVIDIA Corp", price: 1250.00, change: 45.00, changePercent: 3.75, type: "stock" },
    { symbol: "AAPL", name: "Apple Inc", price: 215.00, change: 2.50, changePercent: 1.18, type: "stock" },
]

export default function MarketsPage() {
    const [markets, setMarkets] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        fetchMarkets()
    }, [])

    const fetchMarkets = async () => {
        try {
            // Attempt to fetch real data (simulated for now)
            // const res = await fetch('/api/markets')
            // if (!res.ok) throw new Error('API Failed')
            // const data = await res.json()

            // Simulate network delay then use mock
            await new Promise(r => setTimeout(r, 800))
            setMarkets(MOCK_MARKETS)
        } catch (err) {
            console.warn("Market API failed, using fallback data.")
            setMarkets(MOCK_MARKETS) // Fallback
            setError("Live connection failed. Showing cached data.")
        } finally {
            setLoading(false)
        }
    }

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-[#FFFFFF] text-slate-900 pb-20">
            {/* Hero Section */}
            <div className="bg-[#0f172a] text-white py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Global Markets <span className="text-cyan-400">Live</span></h1>
                    <p className="text-slate-400 text-xl max-w-2xl">
                        Real-time data feeds from major exchanges, indices, and forex markets.
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 -mt-10">
                {error && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-8 flex items-center gap-2 text-sm font-medium">
                        <Activity className="h-4 w-4" /> {error}
                    </div>
                )}

                {loading ? (
                    <div className="grid md:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-40 bg-slate-100 rounded-2xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {markets.map((market) => (
                            <Card key={market.symbol} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div>
                                        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                            {market.symbol}
                                        </CardTitle>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{market.name}</p>
                                    </div>
                                    <Badge variant="outline" className={`
                                        ${market.change >= 0
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            : "bg-rose-50 text-rose-700 border-rose-200"}
                                        font-bold px-2 py-1
                                    `}>
                                        {market.change >= 0 ? '+' : ''}{market.changePercent}%
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black tracking-tight">
                                            {market.type === 'forex' ? market.price.toFixed(4) : market.price.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-slate-400 font-medium uppercase">{market.type}</span>
                                    </div>
                                    <div className={`text-sm font-medium mt-2 flex items-center gap-1 ${market.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {market.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                        {market.change >= 0 ? '+' : ''}{market.change}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Market Intelligence Section */}
            <div className="container mx-auto max-w-6xl px-4 mt-20">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Market Intelligence</h2>
                        <p className="text-slate-500 text-sm">Latest financial analysis and signals.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        {
                            title: 'Bitcoin Breaks $100k Barrier on ETF Wraps',
                            summary: 'Institutional inflows surge as major pension funds allocate 1% to crypto assets.',
                            category: 'Crypto',
                            slug: 'bitcoin-breaks-100k',
                            date: '4h ago'
                        },
                        {
                            title: 'Fed Signals Rate Cuts Before Year End',
                            summary: 'Powell suggests inflation data is "encouraging enough" to consider localized easing.',
                            category: 'Finance',
                            slug: 'fed-rate-cuts-signal',
                            date: '8h ago'
                        }
                    ].map((news, i) => (
                        <div key={i} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2 py-1 rounded-sm">{news.category}</span>
                                <span className="text-xs text-slate-400">{news.date}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 hover:text-blue-700 cursor-pointer">{news.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{news.summary}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
