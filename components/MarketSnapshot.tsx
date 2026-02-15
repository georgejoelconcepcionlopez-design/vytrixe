import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export function MarketSnapshot({ compact = false }: { compact?: boolean }) {
    // Simulated Data for "Financial Aesthetic"
    const markets = [
        { symbol: "BTC", price: "96,420.50", change: "+2.4%", up: true },
        { symbol: "ETH", price: "2,840.10", change: "+1.1%", up: true },
        { symbol: "SOL", price: "145.20", change: "-0.5%", up: false },
        { symbol: "SPX", price: "5,210.00", change: "+0.8%", up: true },
        { symbol: "NDX", price: "18,340.50", change: "+1.2%", up: true },
        { symbol: "VIX", price: "13.40", change: "-4.2%", up: false },
    ];

    if (compact) {
        return (
            <div className="space-y-4 font-mono">
                <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-slate-500 mb-6">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Market Pulse
                </div>
                <div className="space-y-3">
                    {markets.map((m) => (
                        <div key={m.symbol} className="flex items-center justify-between text-xs border-b border-white/5 pb-2 last:border-0">
                            <span className="font-bold text-white w-12">{m.symbol}</span>
                            <span className="text-slate-400 text-right flex-1 mr-4">{m.price}</span>
                            <span className={`flex items-center gap-1 ${m.up ? 'text-green-400' : 'text-red-400'} w-14 justify-end`}>
                                {m.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {m.change}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <section className="bg-[#0A0F1F] border-y border-white/5 py-3 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-slate-500 mr-8">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        Live Markets
                    </div>

                    <div className="flex-1 flex gap-8 overflow-x-auto scrollbar-hide">
                        {markets.map((m) => (
                            <div key={m.symbol} className="flex items-center gap-3 shrink-0 font-mono text-xs">
                                <span className="font-bold text-white">{m.symbol}</span>
                                <span className="text-slate-400">{m.price}</span>
                                <span className={`flex items-center gap-1 ${m.up ? 'text-green-400' : 'text-red-400'}`}>
                                    {m.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    {m.change}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-600 font-mono">
                        <RefreshCw size={10} />
                        Delay: 0ms
                    </div>
                </div>
            </div>
        </section>
    );
}
