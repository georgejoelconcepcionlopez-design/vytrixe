
import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Zap } from 'lucide-react'
import Link from 'next/link'
import { AdBanner } from '@/components/AdBanner'
import { NewsletterForm } from '@/components/NewsletterForm'

export const metadata: Metadata = {
    title: "Breaking Trends & Live Feed | Vytrixe",
    description: "Real-time stream of accelerating topics and market signals.",
}

async function getBreakingFeed() {
    // In server component, we can import logic directly or fetch absolute URL. 
    // For simplicity in this demo environment, we'll fetch from localhost if needed, 
    // or just duplicate logic to avoid network issues during build.
    // Let's mock the fetch for safety in this environment.
    return [
        {
            id: 'breaking-1',
            title: "BREAKING: Viral Spike detected in 'Smart Ring' sector",
            excerpt: "Search volume for 'Oura alternative' has jumped 400% in the last hour.",
            category: "Tech",
            timestamp: new Date().toISOString(),
            slug: "smart-ring-spike"
        },
        {
            id: 'breaking-2',
            title: "ALERT: Mexico City search trends shift to 'Water Scarcity'",
            excerpt: "Geo-mapping indicates a critical rise in utility-related queries in CDMX.",
            category: "Geo-Politics",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            slug: "cdmx-water"
        },
        {
            id: 'breaking-3',
            title: "Sports Pulse: Copa America Final tickets surge",
            excerpt: "Secondary market prices up 50% in 20 minutes.",
            category: "Sports",
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            slug: "copa-america-tickets"
        }
    ]
}

export default async function BreakingPage() {
    const feed = await getBreakingFeed()

    return (
        <main className="min-h-screen bg-[#02040A] text-white selection:bg-red-500/30">
            {/* Ticker Header */}
            <div className="bg-red-950/20 border-b border-red-900/20 py-2">
                <div className="container mx-auto px-4 flex items-center gap-2 text-red-500 text-xs font-mono tracking-widest uppercase">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Live Feed Active
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid lg:grid-cols-[1fr_350px] gap-12">

                {/* Main Feed */}
                <div>
                    <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                        <Zap className="h-8 w-8 text-yellow-500" /> Breaking Trends
                    </h1>

                    <div className="space-y-6">
                        {feed.map((item) => (
                            <Link key={item.id} href={`/insights/${item.slug}`} className="block group">
                                <Card className="bg-white/[0.02] border-white/5 group-hover:bg-white/[0.04] transition-colors">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="secondary" className="bg-red-500/10 text-red-400 hover:bg-red-500/20">{item.category}</Badge>
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400">
                                            {item.excerpt}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    <div className="p-6 bg-[#0A0F1F] rounded-xl border border-white/5">
                        <h3 className="text-lg font-bold mb-4">Subscribe for Alerts</h3>
                        <p className="text-sm text-slate-400 mb-4">Get notified instantly when a high-velocity trend is detected.</p>
                        <NewsletterForm source="breaking_page" variant="minimal" />
                    </div>

                    <div className="sticky top-8">
                        <AdBanner dataAdSlot="sidebar_breaking" className="w-full h-[600px] bg-white/5 rounded-lg border border-white/5 flex items-center justify-center text-slate-600 text-sm" />
                    </div>
                </aside>

            </div>
        </main>
    )
}
