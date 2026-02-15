
import { MarketData } from "@/services/marketService";
import { MiniChart } from "./MiniChart";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MarketCard({ data }: { data: MarketData }) {
    const isPositive = data.change24h >= 0;
    const color = isPositive ? '#10b981' : '#ef4444'; // Emerald-500 or Red-500

    return (
        <div className="bg-[#0A0F1F] border border-white/5 rounded-xl p-5 hover:border-cyan-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{data.symbol}</h3>
                    <p className="text-xs text-slate-500">{data.name}</p>
                </div>
                <div className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                    isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                )}>
                    {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(data.change24h).toFixed(2)}%
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <span className="text-2xl font-bold text-white tracking-tight">
                        ${data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
                <MiniChart data={data.sparkline} color={color} width={80} height={35} />
            </div>

            {data.marketOpen !== undefined && (
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-slate-600">Market Status</span>
                    <span className={cn("flex items-center gap-1.5 text-[10px] font-bold uppercase",
                        data.marketOpen ? "text-emerald-500" : "text-slate-500"
                    )}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", data.marketOpen ? "bg-emerald-500 animate-pulse" : "bg-slate-500")} />
                        {data.marketOpen ? 'Open' : 'Closed'}
                    </span>
                </div>
            )}
        </div>
    )
}
