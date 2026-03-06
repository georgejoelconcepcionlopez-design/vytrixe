import { BarChart3, Users, Zap, AlertTriangle } from "lucide-react";
import Link from 'next/link';

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black mb-2 tracking-tight">System Overview</h1>
                <p className="text-muted-foreground font-mono text-sm">Vytrixe Core Network Status</p>
            </div>

            {/* Top Metrics Row */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-1">Generated Today</p>
                            <h3 className="text-4xl font-black text-primary">24</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    <div className="text-xs font-mono text-green-500">+12% vs 7d avg</div>
                    <div className="absolute -bottom-4 -right-4 text-primary/5 group-hover:text-primary/10 transition-colors">
                        <Zap className="w-32 h-32" />
                    </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-1">Active Trends</p>
                            <h3 className="text-4xl font-black text-purple-500">14</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-purple-500" />
                        </div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">Monitoring 50+ keywords</div>
                </div>

                <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-1">Traffic 24h</p>
                            <h3 className="text-4xl font-black text-secondary">84.2K</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-secondary" />
                        </div>
                    </div>
                    <div className="text-xs font-mono text-green-500">+5% WOW</div>
                </div>

                <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-1">Est. Revenue</p>
                            <h3 className="text-4xl font-black text-green-400">$1,250</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-green-500" />
                        </div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">Data delayed by 1h</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Action Queue */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-500" /> Pending Approval Queue
                        </h2>
                        <Link href="/admin/articles" className="text-xs font-mono text-primary hover:underline">View All &rarr;</Link>
                    </div>
                    <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border/50">

                        {/* Mock Pending Items */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] uppercase font-bold text-cyan-500 bg-cyan-500/10 px-2 rounded-sm ring-1 ring-cyan-500/30">AI Architecture</span>
                                        <span className="text-[10px] font-mono text-slate-500">Auto-generated</span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-1 line-clamp-1">Nvidia's Advanced Packaging Bottleneck Escalates in Q3</h4>
                                    <p className="text-xs text-muted-foreground line-clamp-1">Analysis of TSMC CoWoS capacity limits affecting the deployment of B200 clusters globally.</p>
                                </div>
                                <div className="flex items-center gap-3 ml-4">
                                    <button className="text-xs font-bold uppercase tracking-wider text-green-500 hover:text-green-400">Publish</button>
                                    <button className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white">Review</button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* System Logs */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Engine Logs
                    </h2>
                    <div className="bg-[#0b0f19] border border-border p-4 rounded-2xl h-[400px] font-mono text-xs overflow-y-auto space-y-3">
                        <div className="flex gap-2 text-green-500"><span className="text-slate-600">[10:42am]</span> <span>CRON: Trend Engine run OK (14 trends detected)</span></div>
                        <div className="flex gap-2 text-cyan-400"><span className="text-slate-600">[10:45am]</span> <span>AI_GEN: Seeded "Data Center Nuclear" - Status: Writing</span></div>
                        <div className="flex gap-2 text-cyan-400"><span className="text-slate-600">[10:48am]</span> <span>AI_GEN: Completed ID_8492. Added to queue.</span></div>
                        <div className="flex gap-2 text-yellow-500"><span className="text-slate-600">[11:00am]</span> <span>CRON: Publisher waiting (Queue empty for immediate release)</span></div>
                        <div className="flex gap-2 text-green-500"><span className="text-slate-600">[11:15am]</span> <span>SEO: Sitemap rebuilt successfully.</span></div>
                        <div className="flex gap-2 text-slate-400"><span className="text-slate-600">[11:30am]</span> <span>SYS: Memory usage 42%. Safe.</span></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

function Activity(props: any) {
    return <Zap {...props} /> // Fallback icon since Activity wasn't imported properly
}
