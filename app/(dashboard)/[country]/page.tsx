
import { createClient } from '@/lib/supabase/server'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, BarChart2, Globe, Trophy, Activity, Medal } from 'lucide-react'
import { fetchSportsNews, fetchLiveMatches, fetchTeamStats } from '@/services/sportsService'
import { SportsCard } from '@/components/SportsCard'
import { LiveMatchCard } from '@/components/LiveMatchCard'
import { StandingsWidget } from '@/components/StandingsWidget'
import { AdBanner } from '@/components/AdBanner'
import { Metadata } from 'next'

// Mock Data for "Base" deliverable (as requested: NO real data yet)
const MOCK_TRENDS = [
    { id: '1', title: 'iPhone 16 Release', volume: 500000, score: 98, country: 'us' },
    { id: '2', title: 'Super Bowl Halftime', volume: 200000, score: 92, country: 'us' },
    { id: '3', title: 'Elecciones México 2026', volume: 150000, score: 88, country: 'mx' },
    { id: '4', title: 'La Liga Resultados', volume: 120000, score: 85, country: 'es' },
    { id: '5', title: 'Turismo Punta Cana', volume: 80000, score: 78, country: 'do' },
]

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
    const { country } = await params
    const countryName = country.toUpperCase()

    return {
        title: `Top Trends in ${countryName} | Vytrixe Intelligence`,
        description: `Real-time analytics for viral trends, sports matches, and breaking news in ${countryName}. AI-powered velocity tracking.`,
        openGraph: {
            title: `Top Trends in ${countryName} | Vytrixe`,
            description: `Real-time analytics for viral trends, sports matches, and breaking news in ${countryName}.`,
            url: `https://vytrixe.com/${country}`,
            type: 'website',
            images: [{ url: `/og-${country}.jpg` }], // Strategy: usage of dynamic image paths
        },
        twitter: {
            card: 'summary_large_image',
            title: `Top Trends in ${countryName} | Vytrixe`,
            description: `Real-time analytics for viral trends in ${countryName}.`,
            images: [`/og-${country}.jpg`],
        },
        alternates: {
            canonical: `https://vytrixe.com/${country}`,
        },
    }
}

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ country: string }>
}) {
    const { country } = await params
    const supabase = await createClient()

    // Validate country (basic validation)
    const validCountries = ['us', 'mx', 'es', 'do']
    if (!validCountries.includes(country)) {
        // In a real app, maybe redirect to 404 or default country
        // For now, let's just show a warning or empty state, or basic redirect
    }

    // Filter trends by country (Mock logic)
    const trends = MOCK_TRENDS.filter(t => t.country === country || country === 'global').sort((a, b) => b.score - a.score)

    // Fetch Sports Data
    const sportsNews = await fetchSportsNews(country)
    const liveMatches = await fetchLiveMatches(country)
    const teamStats = await fetchTeamStats(country)

    return (
        <div className="flex flex-col gap-8 p-4">
            {/* Header Area */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Globe className="h-8 w-8 text-primary" />
                    Top Trends in <span className="uppercase text-primary">{country}</span>
                </h1>
                <div className="flex gap-2">
                    <Button variant="outline">Filter: Score</Button>
                    <Button>Refresh Data</Button>
                </div>
            </div>

            {/* Live Matches Section (Only if available) */}
            {liveMatches.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-500 animate-pulse">
                        <Activity className="h-5 w-5" />
                        <h2 className="text-xl font-bold tracking-tight">Live Now</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {liveMatches.map((match) => (
                            <LiveMatchCard key={match.id} match={match} />
                        ))}
                    </div>
                </div>
            )}

            {/* Main Trends Grid */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    General Trends
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {trends.length > 0 ? (
                        trends.map((trend) => (
                            <Card key={trend.id} className="border-border/50 bg-card hover:border-primary/50 transition-colors group/card">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">
                                        {trend.title}
                                    </CardTitle>
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{trend.score} <span className="text-xs text-muted-foreground font-normal">Score</span></div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Volume: {trend.volume.toLocaleString()} searches
                                    </p>
                                    <div className="mt-4 h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-secondary"
                                            style={{ width: `${trend.score}%` }}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/topic/ai-tech/${trend.title.toLowerCase().replace(/\s+/g, '-')}`} className="w-full">
                                        <Button variant="ghost" className="w-full justify-between group-hover/card:bg-primary/10 transition-colors">
                                            Deep Intel Report <BarChart2 className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            No active trends found for {country.toUpperCase()}.
                        </div>
                    )}
                </div>
            </div>

            {/* Middle Ad Unit */}
            <div className="w-full my-6">
                <AdBanner
                    dataAdSlot="5432109876"
                    dataAdFormat="auto"
                    className="w-full h-[120px]"
                />
            </div>

            {/* Extended Sports Section */}
            <div className="grid gap-8 lg:grid-cols-4">
                {/* Sports News (Main Column) */}
                <div className="lg:col-span-3 space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-secondary" />
                        Sports Trending
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {sportsNews.length > 0 ? (
                            sportsNews.map((news, idx) => (
                                <SportsCard key={news.id || idx} news={news} />
                            ))
                        ) : (
                            <div className="col-span-full text-muted-foreground p-4 border border-dashed rounded-lg text-center">
                                No sports news available at the moment.
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar (Standings & Ads) */}
                <div className="space-y-6">
                    {/* Sidebar Ad Top */}
                    <AdBanner
                        dataAdSlot="6789012345"
                        dataAdFormat="rectangle"
                        className="w-full h-[250px] hidden md:block" // Hide on mobile if too tall
                    />

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Medal className="h-5 w-5 text-yellow-500" />
                            <h2 className="text-xl font-bold tracking-tight">Standings</h2>
                        </div>
                        {teamStats.length > 0 ? (
                            <StandingsWidget stats={teamStats} country={country} />
                        ) : (
                            <div className="text-muted-foreground text-sm p-4 border border-dashed rounded-lg">
                                No standings data.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
