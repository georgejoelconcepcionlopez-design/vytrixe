
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, RefreshCw, Zap, LineChart, Gauge } from "lucide-react"
import { SparklineChart } from "@/components/SparklineChart"

// Extended Interface matching new Service
interface MarketData {
    symbol: string;
    price: number;
    change: number;
    percentChange: number;
    high: number;
    low: number;
    lastUpdated: string;
    name?: string;
    type?: string;
    signal?: string;
}

interface MarketHistory {
    symbol: string;
    candles: { date: string; price: number }[];
    trend: 'bullish' | 'bearish' | 'neutral';
    bias: 'Positive' | 'Negative' | 'Neutral';
    average: number;
    volatility: number;
}

const META_MAP: Record<string, Partial<MarketData>> = {
    'SPX': { name: "S&P 500", type: "INDX", signal: "Macro" },
    'NVDA': { name: "NVIDIA Corp", type: "EQTY", signal: "AI-Hardware" },
    'BTC': { name: "Bitcoin", type: "CRPT", signal: "Store of Value" },
    'XAU': { name: "Gold", type: "CMDT", signal: "Risk-Off" },
    'MSFT': { name: "Microsoft", type: "EQTY", signal: "Cloud" },
    'TSM': { name: "TSMC", type: "EQTY", signal: "Semiconductors" },
    'VRT': { name: "Vertiv", type: "EQTY", signal: "Infra/Thermal" },
    'CCJ': { name: "Cameco", type: "EQTY", signal: "Energy" }
};

export default function MarketsPage() {
    const [markets, setMarkets] = useState<MarketData[]>([])
    const [history, setHistory] = useState<Record<string, MarketHistory>>({});
    const [loading, setLoading] = useState(true)
    const [lastUpdated, setLastUpdated] = useState<string | null>(null)
    const [error, setError] = useState(false)

    const fetchMarkets = async () => {
        try {
            setError(false);
            const res = await fetch('/api/markets/quote');
            if (!res.ok) throw new Error('Failed to fetch quotes');

            const json = await res.json();

            const enriched: MarketData[] = json.data.map((item: MarketData) => ({
                ...item,
                ...META_MAP[item.symbol] || { name: item.symbol, type: 'ASST', signal: 'N/A' }
            }));

            setMarkets(enriched);
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllHistory = async (symbols: string[]) => {
        const newHistory: Record<string, MarketHistory> = {};
        for (const sym of symbols) {
            try {
                const res = await fetch(`/api/markets/history?symbol=${sym}`);
                if (res.ok) {
                    const json = await res.json();
                    if (json.data) {
                        newHistory[sym] = json.data;
                    }
                }
            } catch (e) { console.warn(`History fetch failed: ${sym}`); }
        }
        setHistory(prev => ({ ...prev, ...newHistory }));
    }

    useEffect(() => {
        fetchMarkets().then(() => {
            fetchAllHistory(Object.keys(META_MAP));
        });
        const interval = setInterval(fetchMarkets, 600000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-900 selection:text-white">
            {/* Institutional Header */}
            <div className="border-b border-white/10 bg-black/40 backdrop-blur">
                <div className="container mx-auto max-w-[1600px] py-8 px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <Activity className="w-5 h-5 text-cyan-500" />
                                <h1 className="text-sm font-black tracking-[0.2em] text-cyan-500 uppercase">Global Market Signals</h1>
                            </div>
                            <div className="text-2xl md:text-3xl font-light tracking-tight text-white">
                                AI-Driven Macro Positioning Dashboard
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                                <div className={`h-1.5 w-1.5 rounded-full ${!error ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}></div>
                                <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest">LIVE DATA CONNECTION</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest flex items-center gap-2 border border-white/5 px-2 py-1 rounded bg-white/5">
                                {loading && <RefreshCw className="w-3 h-3 animate-spin" />}
                                SYNC: {lastUpdated || '--:--:--'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-[1600px] px-6 py-8">
                {error && (
                    <div className="mb-8 p-3 bg-red-950/20 border border-red-500/20 rounded text-red-400 text-xs font-mono text-center">
                        ⚠ DATALINK INTERRUPTED. DISPLAYING CACHED STATE.
                    </div>
                )}

                {loading && markets.length === 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="h-64 bg-white/5 rounded border border-white/5"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {markets.map((market) => {
                            const hist = history[market.symbol];
                            const isGreen = market.change >= 0;
                            const biasColor = hist?.bias === 'Positive' ? 'text-emerald-400' : hist?.bias === 'Negative' ? 'text-rose-400' : 'text-amber-400';

                            return (
                                <Card key={market.symbol} className="bg-[#0a0a0a] border-white/10 hover:border-cyan-500/30 transition-all shadow-none flex flex-col overflow-hidden group rounded-sm">
                                    {/* Top Bar */}
                                    <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono font-bold text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">
                                                {market.type}
                                            </span>
                                            <span className="text-xs font-bold text-slate-300 tracking-wide">{market.name}</span>
                                        </div>
                                        <div className={`text-[10px] font-mono font-bold ${isGreen ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {isGreen ? '▲' : '▼'} {Math.abs(market.percentChange).toFixed(2)}%
                                        </div>
                                    </div>

                                    <CardContent className="p-4 flex-1 flex flex-col">

                                        {/* Main Price Area */}
                                        <div className="flex justify-between items-baseline mb-4">
                                            <div>
                                                <div className="text-2xl font-mono font-medium text-white tracking-tight">
                                                    {market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </div>
                                                <div className={`text-xs font-mono ${isGreen ? 'text-emerald-500' : 'text-rose-500'} mt-0.5`}>
                                                    {isGreen ? '+' : ''}{market.change.toFixed(2)}
                                                </div>
                                            </div>
                                            {/* Daily Range */}
                                            <div className="text-right">
                                                <div className="text-[9px] font-mono text-slate-600 uppercase mb-0.5">Daily Range</div>
                                                <div className="text-[10px] font-mono text-slate-400">
                                                    H: {market.high.toLocaleString()}
                                                </div>
                                                <div className="text-[10px] font-mono text-slate-400">
                                                    L: {market.low.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chart Area */}
                                        <div className="h-12 mb-4 opacity-80 mix-blend-screen">
                                            {hist ? (
                                                <SparklineChart data={hist.candles} height={48} />
                                            ) : (
                                                <div className="h-full w-full bg-white/5 animate-pulse rounded"></div>
                                            )}
                                        </div>

                                        {/* Institutional Metrics Grid */}
                                        <div className="mt-auto pt-3 border-t border-white/5 grid grid-cols-2 gap-2">
                                            <div>
                                                <div className="text-[9px] uppercase tracking-widest text-slate-600 font-bold mb-1">Inst. Bias</div>
                                                <div className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${biasColor}`}>
                                                    {hist ? (
                                                        <>
                                                            {hist.bias === 'Positive' && <TrendingUp className="w-3 h-3" />}
                                                            {hist.bias === 'Negative' && <TrendingDown className="w-3 h-3" />}
                                                            {hist.bias === 'Neutral' && <Activity className="w-3 h-3" />}
                                                            {hist.bias}
                                                        </>
                                                    ) : '---'}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[9px] uppercase tracking-widest text-slate-600 font-bold mb-1">7D Volatility</div>
                                                <div className="text-[10px] font-mono text-slate-300">
                                                    {hist ? `${hist.volatility.toFixed(1)}%` : '---'}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    )
}
