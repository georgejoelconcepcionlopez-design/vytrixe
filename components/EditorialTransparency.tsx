
import { ShieldCheck, Database, Clock, CheckCircle2 } from 'lucide-react'

interface Source {
    name: string
    url: string
}

interface EditorialTransparencyProps {
    updatedAt: string
    readingTime: string
    sources: Source[]
    factCheckedBy?: string
}

export function EditorialTransparency({ updatedAt, readingTime, sources, factCheckedBy }: EditorialTransparencyProps) {
    return (
        <div className="my-12 space-y-8 border-t border-white/5 pt-12">
            <div className="grid md:grid-cols-3 gap-6">
                {/* Status Block */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Editorial Status</div>
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                            <CheckCircle2 className="h-4 w-4" /> Fact-Checked
                        </div>
                    </div>
                    <div className="mt-4 text-[10px] text-slate-600">
                        Verified by {factCheckedBy || "TrendNova Intelligence Desk"}
                    </div>
                </div>

                {/* Meta Block */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Content Lifecycle</div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <Clock className="h-3.5 w-3.5 text-cyan-500" /> Updated: {new Date(updatedAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" /> Read time: {readingTime}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sources Block */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Primary Sources</div>
                        <div className="space-y-2">
                            {sources.slice(0, 2).map((source, i) => (
                                <a
                                    key={i}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs text-cyan-500 hover:underline line-clamp-1"
                                >
                                    <Database className="h-3.5 w-3.5" /> {source.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-[10px] text-slate-600 leading-relaxed italic border-l-2 border-white/5 pl-4">
                TrendNova Intelligence utilizes advanced algorithmic aggregation and secondary verification via human-in-the-loop analysis. Our reports are updated in real-time as search signals evolve.
            </p>
        </div>
    )
}
