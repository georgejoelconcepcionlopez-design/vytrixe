"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Minus, ArrowRight, Zap, Globe, Cpu, Activity, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// --- Mock Data ---
const DATA = {
    global: [
        { name: "S&P 500", symbol: "SPX", price: "5,234.10", change: "+0.85%", up: true, volume: "2.1B" },
        { name: "Nasdaq 100", symbol: "NDX", price: "18,450.22", change: "+1.30%", up: true, volume: "1.2B" },
        { name: "Dow Jones", symbol: "DJI", price: "39,120.45", change: "+0.15%", up: true, volume: "890M" },
        { name: "FTSE 100", symbol: "UK100", price: "7,840.10", change: "-0.22%", up: false, volume: "450M" },
        { name: "Nikkei 225", symbol: "JP225", price: "40,105.30", change: "+2.10%", up: true, volume: "1.1B" },
    ],
    crypto: [
        { name: "Bitcoin", symbol: "BTC.D", price: "$98,450.00", change: "+4.20%", up: true, volume: "$45B" },
        { name: "Ethereum", symbol: "ETH.D", price: "$3,890.15", change: "+2.10%", up: true, volume: "$18B" },
        { name: "Solana", symbol: "SOL", price: "$156.40", change: "-1.50%", up: false, volume: "$4.2B" },
        { name: "BNB", symbol: "BNB", price: "$610.20", change: "+0.50%", up: true, volume: "$1.2B" },
        { name: "XRP", symbol: "XRP", price: "$0.65", change: "+8.40%", up: true, volume: "$2.1B" },
    ],
    commodities: [
        { name: "Gold", symbol: "XAU", price: "$2,450.10", change: "+0.45%", up: true, volume: "N/A" },
        { name: "Silver", symbol: "XAG", price: "$28.40", change: "+1.20%", up: true, volume: "N/A" },
        { name: "Crude Oil", symbol: "WTI", price: "$82.40", change: "-0.80%", up: false, volume: "N/A" },
        { name: "Natural Gas", symbol: "NG", price: "$1.85", change: "-2.10%", up: false, volume: "N/A" },
        { name: "Copper", symbol: "HG", price: "$4.15", change: "+0.90%", up: true, volume: "N/A" },
    ],
    ai: [
        { name: "Nvidia", symbol: "NVDA", price: "$980.50", change: "+3.40%", up: true, volume: "45M" },
        { name: "Microsoft", symbol: "MSFT", price: "$425.10", change: "+0.90%", up: true, volume: "22M" },
        { name: "AMD", symbol: "AMD", price: "$180.40", change: "+2.10%", up: true, volume: "15M" },
        { name: "Super Micro", symbol: "SMCI", price: "$920.10", change: "-4.50%", up: false, volume: "4M" },
        { name: "Palantir", symbol: "PLTR", price: "$24.50", change: "+1.20%", up: true, volume: "35M" },
    ],
    econ: [
        { name: "US 10Y Yield", symbol: "US10Y", price: "4.25%", change: "+0.05", up: true, volume: "Yield" },
        { name: "Fed Funds Rate", symbol: "FFR", price: "5.50%", change: "0.00", up: true, volume: "Rate" },
        { name: "US Inflation", symbol: "CPI", price: "3.1%", change: "-0.1", up: false, volume: "YoY" },
        { name: "Unemployment", symbol: "UE", price: "3.9%", change: "0.00", up: false, volume: "Rate" },
        { name: "GDP Growth", symbol: "GDP", price: "2.4%", change: "+0.2", up: true, volume: "QoQ" },
    ]
}

type Category = keyof typeof DATA

export function MarketTable() {
    const [activeTab, setActiveTab] = useState<Category>("global")

    const tabs: { id: Category; label: string; icon: any }[] = [
        { id: "global", label: "Global Indices", icon: Globe },
        { id: "crypto", label: "Crypto Assets", icon: Zap },
        { id: "commodities", label: "Commodities", icon: DollarSign },
        { id: "ai", label: "AI Sector", icon: Cpu },
        { id: "econ", label: "Econ Signals", icon: Activity },
    ]

    return (
        <Card className="w-full bg-white border border-slate-200 shadow-sm overflow-hidden">
            {/* Header / Tabs */}
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-200 bg-slate-50/50 p-2">
                <div className="flex flex-wrap gap-1 p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wide transition-all",
                                activeTab === tab.id
                                    ? "bg-white text-[#0f172a] shadow-sm ring-1 ring-slate-200"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            )}
                        >
                            <tab.icon className="w-3 h-3" />
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="px-4 py-2 text-xs font-mono text-slate-400 hidden md:block">
                    LIVE DATA • DELAY 15M
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Instrument</th>
                            <th className="px-6 py-3">Symbol</th>
                            <th className="px-6 py-3 text-right">Price</th>
                            <th className="px-6 py-3 text-right">Change</th>
                            <th className="px-6 py-3 text-right hidden md:table-cell">Volume/Metric</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {DATA[activeTab].map((item, idx) => (
                            <tr
                                key={item.symbol}
                                className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                            >
                                <td className="px-6 py-4 font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                    <Badge variant="outline" className="border-slate-200 text-slate-500 group-hover:border-blue-200 group-hover:text-blue-600 rounded-sm font-normal">
                                        {item.symbol}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-right font-mono font-medium text-slate-900">
                                    {item.price}
                                </td>
                                <td className={cn(
                                    "px-6 py-4 text-right font-mono font-medium",
                                    item.up ? "text-green-600" : "text-red-600"
                                )}>
                                    <div className="flex items-center justify-end gap-1">
                                        {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {item.change}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right text-slate-400 font-mono text-xs hidden md:table-cell">
                                    {item.volume}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button size="icon" variant="ghost" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-3 h-3 text-slate-400" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
                <span className="text-[10px] text-slate-400">
                    * Data provided by Vytrixe Intelligence Aggregation.
                </span>
                <Button variant="link" size="sm" className="text-xs text-blue-600 h-auto p-0">
                    View Full Market Report <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
            </div>
        </Card>
    )
}
