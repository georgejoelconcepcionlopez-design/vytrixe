import { TrendingUp, CheckCircle, Clock, Play, Server, Activity } from "lucide-react";
import { createClient } from '@/lib/supabase/server';

export const revalidate = 0; // Disable static caching for admin route

export default async function AdminTrendsPage() {
    const supabase = await createClient();

    // Fetch real trends
    const { data: trends, error } = await (supabase as any)
        .from('trending_topics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

    const validTrends = trends || [];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black mb-2 tracking-tight">Trend Engine Matrix</h1>
                    <p className="text-muted-foreground font-mono text-sm">Real-time global signal intelligence and active generation targets.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-secondary/10 text-secondary border border-secondary/20 px-4 py-2 text-sm font-bold rounded-lg hover:bg-secondary/20 flex items-center gap-2 transition-colors">
                        <Activity className="w-4 h-4" /> Run Engine manually
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden mt-8">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#0b0f19] border-b border-border text-xs font-mono uppercase tracking-widest text-slate-400">
                        <tr>
                            <th className="px-6 py-4">Signal Title & Keywords</th>
                            <th className="px-6 py-4">Vector</th>
                            <th className="px-6 py-4 text-center">Score</th>
                            <th className="px-6 py-4">Generation Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">

                        {validTrends.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground font-mono text-sm">No signals detected in vectors. Engine run required.</td>
                            </tr>
                        )}

                        {validTrends.map((trend: any) => (
                            <tr key={trend.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-base mb-1 text-foreground">{trend.title}</div>
                                    <div className="flex gap-2 flex-wrap mt-2">
                                        {(trend.keywords || []).slice(0, 3).map((kw: string, i: number) => (
                                            <span key={i} className="text-[10px] text-muted-foreground font-mono bg-background border border-border px-2 py-0.5 rounded">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
                                        <Server className="w-3 h-3" />
                                        {trend.source}
                                    </div>
                                    <div className="font-bold uppercase tracking-wider text-[10px] mt-2 text-primary">
                                        {trend.category}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className={`font-black text-lg ${trend.score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {trend.score}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {trend.processed ? (
                                        <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">
                                            <CheckCircle className="w-3 h-3" /> Generated
                                        </span>
                                    ) : (
                                        <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">
                                            <Clock className="w-3 h-3" /> Pending
                                        </span>
                                    )}
                                    <div className="text-[10px] text-muted-foreground font-mono mt-2">
                                        Detected {new Date(trend.created_at).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!trend.processed && (
                                            <button className="text-cyan-400 hover:text-cyan-300 font-bold text-xs uppercase tracking-wider px-3 border border-cyan-400/30 rounded flex items-center gap-1 py-1.5 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors">
                                                <Play className="w-3 h-3" /> Generate AI Article
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
