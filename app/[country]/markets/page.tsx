
import { getMarketData } from "@/services/marketService";
import { MarketCard } from "@/components/MarketCard";
import { TopMovers } from "@/components/TopMovers";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Global Markets Dashboard | Vytrixe',
    description: 'Real-time market data for Crypto, Stocks, and Indices.',
};

export default async function MarketsPage({ params }: { params: Promise<{ country: string }> }) {
    const { country } = await params;
    const { crypto, stocks, indices } = await getMarketData();

    return (
        <main className="min-h-screen bg-[#02040A] text-white">
            <div className="container mx-auto px-4 py-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="border-cyan-500/30 text-cyan-500 bg-cyan-500/10 uppercase tracking-widest pl-2 pr-2">Live Data</Badge>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                <RefreshCcw className="h-3 w-3 animate-spin-slow" /> Auto-refreshing
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Market Intelligence</h1>
                        <p className="text-slate-400 mt-2 max-w-2xl">
                            Real-time global asset tracking across Cryptocurrency, Technology Stocks, and Major Indices.
                        </p>
                    </div>
                </div>

                {/* Section: Crypto */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full" />
                        Cryptocurrency
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {crypto.map(coin => (
                            <MarketCard key={coin.symbol} data={coin} />
                        ))}
                    </div>
                    <TopMovers data={crypto} />
                </section>

                {/* Section: Tech Stocks */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full" />
                        Technology Equity
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {stocks.map(stock => (
                            <MarketCard key={stock.symbol} data={stock} />
                        ))}
                    </div>
                </section>

                {/* Section: Indices */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full" />
                        Global Indices
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {indices.map(index => (
                            <MarketCard key={index.symbol} data={index} />
                        ))}
                    </div>
                </section>

            </div>
        </main>
    )
}
