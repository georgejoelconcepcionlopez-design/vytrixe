import { Search, Filter, Edit, CheckCircle, Clock } from "lucide-react";

export default function AdminArticlesPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black mb-2 tracking-tight">Intelligence Queue</h1>
                    <p className="text-muted-foreground font-mono text-sm">Review, Edit, and Publish Generated Content</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 text-sm font-bold rounded-lg hover:bg-primary/90 flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                    + Manual Draft
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-card border border-border p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search ID, Title, or Keyword..."
                        className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm bg-background hover:bg-white/5 font-mono text-slate-300">
                        <Filter className="w-4 h-4" /> Status: PENDING
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm bg-background hover:bg-white/5 font-mono text-slate-300">
                        <Filter className="w-4 h-4" /> Category: ALL
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#0b0f19] border-b border-border text-xs font-mono uppercase tracking-widest text-slate-400">
                        <tr>
                            <th className="px-6 py-4">ID / Origin</th>
                            <th className="px-6 py-4">Title & SEO</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">

                        {/* Row 1 */}
                        <tr className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-bold">#8492</div>
                                <div className="text-[10px] text-cyan-500 font-mono mt-1 flex items-center gap-1">AI_GEN <CheckCircle className="w-3 h-3" /></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-bold text-base mb-1">Nuclear Power for Data Centers: The Next Frontier</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">Target Keywords: SMR, Data Center Energy, Nuclear AI</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">
                                    <Clock className="w-3 h-3" /> Pending Review
                                </span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs text-slate-400">Today, 10:48 AM</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-slate-400 hover:text-white p-1" title="Edit Content"><Edit className="w-4 h-4" /></button>
                                    <button className="text-green-500 hover:text-green-400 font-bold text-xs uppercase tracking-wider px-2 border border-green-500/30 rounded py-1">Approve</button>
                                </div>
                            </td>
                        </tr>

                        {/* Row 2 */}
                        <tr className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-bold">#8491</div>
                                <div className="text-[10px] text-purple-500 font-mono mt-1 flex items-center gap-1">STAFF</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-bold text-base mb-1">Interview: Head of Infrastructure at AWS</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">Target Keywords: AWS custom silicon, AI training</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">
                                    <CheckCircle className="w-3 h-3" /> Published
                                </span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs text-slate-400">Yesterday, 14:20 PM</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-slate-400 hover:text-white p-1" title="Edit Content"><Edit className="w-4 h-4" /></button>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}
