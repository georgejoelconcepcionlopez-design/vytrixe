
import { Metadata } from 'next'
import Link from 'next/link'
import { REPORT_ARTICLES } from '@/data/content'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, ArrowRight, Lock } from 'lucide-react'

export const metadata: Metadata = {
    title: "Intelligence Reports | Vytrixe Lab",
    description: "Deep-dive analysis and strategic outlooks on global markets and technology.",
}

export default function ReportsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans">
            <div className="border-b border-border bg-card">
                <div className="container mx-auto max-w-6xl py-16 px-4 text-center">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-secondary/50 rounded-full border border-border">
                        <FileText className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Strategic Research</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                        Intelligence Archive
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Comprehensive deep-dives into sovereign AI, semiconductor supply chains, and macro-economic shifts.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {REPORT_ARTICLES.map((report) => (
                        <Card key={report.id} className="group border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
                            <div className="aspect-video relative overflow-hidden bg-muted">
                                <img
                                    src={report.image_url}
                                    alt={report.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                                />
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-border shadow-sm">
                                        <Lock className="w-3 h-3 mr-1" /> PDF Report
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{report.category}</span>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <span className="text-xs text-muted-foreground">{new Date(report.created_at).toLocaleDateString()}</span>
                                </div>
                                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                    <Link href={`/news/${report.slug}`} className="hover:underline decoration-primary/30 underline-offset-4">
                                        {report.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {report.summary}
                                </p>
                                <div className="flex gap-4">
                                    <Link href={`/news/${report.slug}`} className="flex-1">
                                        <button className="w-full py-2.5 px-4 bg-secondary text-secondary-foreground text-sm font-semibold rounded-md hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 border border-border">
                                            Read Analysis <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State / Coming Soon */}
                <div className="mt-16 text-center border-t border-border pt-16">
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mb-4">Upcoming Schedule</p>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto opacity-60">
                        {['Q4 Crypto Outlook', 'Next-Gen Energy Grid', 'Biotech Revolution'].map((title, i) => (
                            <div key={i} className="p-6 border border-dashed border-border rounded-lg">
                                <p className="font-bold text-muted-foreground">{title}</p>
                                <span className="text-xs text-muted-foreground">Coming Soon</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
