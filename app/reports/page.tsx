
import { Metadata } from 'next'
import Link from 'next/link'
import { REPORT_ARTICLES } from '@/data/content'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: "Vytrixe Intelligence Reports",
    description: "Deep-dive analysis and strategic outlooks on global markets and technology.",
}

export default function ReportsPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Strategic Intelligence</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Intelligence Reports
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Comprehensive deep-dives into sovereign AI, semiconductor supply chains, and macro-economic shifts.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {REPORT_ARTICLES.map((report) => (
                        <Card key={report.id} className="group border-slate-200 hover:border-slate-300 transition-all hover:shadow-lg overflow-hidden bg-white">
                            <div className="aspect-video relative overflow-hidden bg-slate-100">
                                <img
                                    src={report.image_url}
                                    alt={report.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                                />
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm hover:bg-white shadow-sm border-0">
                                        <FileText className="w-3 h-3 mr-1" /> PDF Report
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">{report.category}</span>
                                    <span className="text-xs text-slate-400">•</span>
                                    <span className="text-xs text-slate-400">{new Date(report.created_at).toLocaleDateString()}</span>
                                </div>
                                <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                    <Link href={`/news/${report.slug}`} className="hover:underline decoration-blue-500/30 underline-offset-4">
                                        {report.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {report.summary}
                                </p>
                                <div className="flex gap-4">
                                    <Link href={`/news/${report.slug}`} className="flex-1">
                                        <button className="w-full py-2.5 px-4 bg-slate-900 text-white text-sm font-semibold rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                            Read Analysis <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State / Coming Soon */}
                <div className="mt-16 text-center border-t border-slate-200 pt-16">
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-4">Upcoming Reports</p>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto opacity-60">
                        {['Q4 Crypto Outlook', 'Next-Gen Energy Grid', 'Biotech Revolution'].map((title, i) => (
                            <div key={i} className="p-6 border border-dashed border-slate-300 rounded-lg">
                                <p className="font-bold text-slate-500">{title}</p>
                                <span className="text-xs text-slate-400">Coming Soon</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
