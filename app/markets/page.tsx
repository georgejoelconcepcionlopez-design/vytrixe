
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Globe, Zap } from "lucide-react"

// Fallback Mock Data
const MOCK_MARKETS = [
    { symbol: "SPX", name: "S&P 500", price: 5432.10, change: 1.25, changePercent: 0.45, type: "index", signal: "Bullish" },
    { symbol: "NDX", name: "Nasdaq 100", price: 18980.50, change: -45.20, changePercent: -0.24, type: "index", signal: "Neutral" },
    { symbol: "BTC-USD", name: "Bitcoin", price: 98500.00, change: 1500.00, changePercent: 2.24, type: "crypto", signal: "Aggr. Buy" },
    { symbol: "NVDA", name: "NVIDIA Corp", price: 142.50, change: 3.00, changePercent: 2.15, type: "stock", signal: "Volatile" },
    { symbol: "XAU-USD", name: "Gold", price: 2450.50, change: 15.00, changePercent: 0.64, type: "commodity", signal: "Safe Haven" },
]

export default function MarketsPage() {
    const [markets, setMarkets] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Simulate fetch
        setTimeout(() => {
            setMarkets(MOCK_MARKETS)
            setLoading(false)
        }, 800)
    }, [])

    if (!mounted) return null

    return (
        <main className="min-h-screen bg-background text-foreground font-sans">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto max-w-6xl py-12 px-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-6 h-6 text-green-500" />
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Global Market Signals</h1>
                    </div>
                    <p className="text-muted-foreground ml-9">Real-time cross-asset performance and institutional flow tracking.</p>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-12">
                {loading ? (
                    <div className="grid md:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-40 bg-card rounded-xl border border-border"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {markets.map((market) => (
                            <Card key={market.symbol} className="bg-card border-border hover:border-primary/50 transition-all shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div>
                                        <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                                            {market.symbol}
                                        </CardTitle>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{market.name}</p>
                                    </div>
                                    <Badge variant="outline" className={`
                                        ${market.change >= 0
                                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                                            : "bg-red-500/10 text-red-500 border-red-500/20"}
                                        font-mono font-bold px-2 py-1
                                    `}>
                                        {market.change >= 0 ? '+' : ''}{market.changePercent}%
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-3xl font-black tracking-tight text-foreground">
                                            {market.type === 'forex' ? market.price.toFixed(4) : market.price.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <div className={`text-sm font-medium flex items-center gap-1 ${market.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {market.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                            {market.change >= 0 ? '+' : ''}{market.change}
                                        </div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                                            <Zap className="w-3 h-3" /> {market.signal}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
