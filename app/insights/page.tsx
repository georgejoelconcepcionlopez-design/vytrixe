
import { fetchAllInsights } from "@/services/insightsService"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Trend Intelligence Insights | Vytrixe",
    description: "Deep dive articles on viral analytics, search velocity, and real-time market intelligence.",
}

export default async function InsightsPage() {
    const insights = await fetchAllInsights()

    return (
        <main className="min-h-screen bg-[#02040A] text-white selection:bg-cyan-500/30">
            {/* Header */}
            <div className="relative py-20 bg-[#050814] overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#02040A] to-[#02040A] pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Trend <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Intelligence</span> Insights
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Research, analysis, and methodologies from the Vytrixe data science team.
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {insights.map((post) => (
                        <Card key={post.slug} className="bg-white/[0.02] border-white/5 hover:border-cyan-500/30 transition-all duration-300 group flex flex-col h-full">
                            <CardHeader>
                                <div className="flex gap-2 mb-4">
                                    {post.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="border-white/10 text-xs text-cyan-400/80">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <CardTitle className="text-2xl text-white group-hover:text-cyan-400 transition-colors">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription className="text-slate-400 text-base leading-relaxed">
                                    {post.excerpt}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="border-t border-white/5 pt-6 flex justify-between items-center text-sm text-slate-500">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author.split(' ')[0]}</span>
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.published_at).toLocaleDateString()}</span>
                                </div>
                                <Link href={`/insights/${post.slug}`}>
                                    <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30">
                                        Read <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    )
}
