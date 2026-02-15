
import { MarketData } from "@/services/marketService";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function TopMovers({ data }: { data: MarketData[] }) {
    // Sort by absolute change for "Top Movers" generally, 
    // or we can separate Gainers vs Losers. 
    // Requirement says "Top 3 gainers, Top 3 losers".

    const sorted = [...data].sort((a, b) => b.change24h - a.change24h);
    const gainers = sorted.slice(0, 3);
    const losers = sorted.slice(-3).reverse();

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Gainers */}
            <div className="bg-[#0A0F1F] border border-white/5 rounded-xl p-5">
                <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4" /> Top Gainers
                </h3>
                <div className="space-y-4">
                    {gainers.map(coin => (
                        <div key={coin.symbol} className="flex items-center justify-between border-b border-white/5 last:border-0 pb-3 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs ring-1 ring-emerald-500/20">
                                    {coin.symbol[0]}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{coin.symbol}</div>
                                    <div className="text-xs text-slate-500">${coin.price.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="text-emerald-500 font-bold text-sm">
                                +{coin.change24h.toFixed(2)}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Losers */}
            <div className="bg-[#0A0F1F] border border-white/5 rounded-xl p-5">
                <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ArrowDownRight className="h-4 w-4" /> Top Losers
                </h3>
                <div className="space-y-4">
                    {losers.map(coin => (
                        <div key={coin.symbol} className="flex items-center justify-between border-b border-white/5 last:border-0 pb-3 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xs ring-1 ring-red-500/20">
                                    {coin.symbol[0]}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{coin.symbol}</div>
                                    <div className="text-xs text-slate-500">${coin.price.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="text-red-500 font-bold text-sm">
                                {coin.change24h.toFixed(2)}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
