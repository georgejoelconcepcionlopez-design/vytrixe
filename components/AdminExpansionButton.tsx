
"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Rocket, Loader2, CheckCircle2, AlertCircle, Database, History, TrendingUp, ShieldAlert } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function AdminExpansionButton() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [results, setResults] = useState<{ processed: number; generated: number; failed: number; errors: any[] } | null>(null)
    const [logs, setLogs] = useState<any[]>([])

    // Fetch last logs on mount
    useEffect(() => {
        fetchLogs()
    }, [])

    const fetchLogs = async () => {
        try {
            const res = await fetch('/api/admin/expansion/logs') // We'll add this endpoint
            const data = await res.json()
            if (data.status === 'success') setLogs(data.logs)
        } catch (e) {
            console.error('Failed to fetch logs')
        }
    }

    const handleRun = async () => {
        setStatus('loading')
        try {
            const res = await fetch('/api/admin/expansion/run', { method: 'POST' })
            const data = await res.json()

            if (data.status === 'success') {
                setResults(data)
                setStatus('success')
                fetchLogs()
            } else {
                setStatus('error')
            }
        } catch (error) {
            console.error(error)
            setStatus('error')
        }
    }

    return (
        <Card className="border-white/5 bg-[#0A0F1F]/50 backdrop-blur-3xl overflow-hidden relative shadow-2xl">
            <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-1000 ${status === 'loading' ? 'bg-cyan-500 animate-pulse' : status === 'success' ? 'bg-green-500' : 'bg-transparent'}`} />

            <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-cyan-400 uppercase italic font-black text-xs tracking-[0.2em]">
                        <Rocket className="h-5 w-5" />
                        Expansion Control
                    </div>
                    {results && (
                        <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 font-black italic">
                            PROCESSED: {results.processed}
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-widest text-center px-4">
                    Scale authority with 1200+ word deep-intel articles across all clusters.
                </p>

                {results && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex flex-col items-center">
                            <div className="text-[9px] text-emerald-500 uppercase font-black tracking-widest mb-1 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> Deployed
                            </div>
                            <div className="text-2xl font-black text-white">{results.generated}</div>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex flex-col items-center">
                            <div className="text-[9px] text-red-500 uppercase font-black tracking-widest mb-1 flex items-center gap-1">
                                <ShieldAlert className="h-3 w-3" /> Skipped/Fail
                            </div>
                            <div className="text-2xl font-black text-white">{results.failed + (results.processed - results.generated - results.failed)}</div>
                        </div>
                    </div>
                )}

                {/* Audit View (Last 5 Logs) */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                        <History className="h-3 w-3" /> Audit Intelligence
                    </div>
                    <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                        {logs.length > 0 ? logs.slice(0, 5).map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[9px]">
                                <div className="flex items-center gap-3">
                                    <div className={`h-1.5 w-1.5 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <span className="font-bold text-slate-300 truncate max-w-[120px]">{log.trend_id}</span>
                                </div>
                                <span className={`font-black uppercase italic ${log.status === 'success' ? 'text-cyan-500' : 'text-red-500'}`}>
                                    {log.status}
                                </span>
                            </div>
                        )) : (
                            <div className="py-8 text-center text-slate-700 italic text-[9px]">No recent audit logs available.</div>
                        )}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-2">
                <Button
                    onClick={handleRun}
                    disabled={status === 'loading'}
                    className={`w-full h-16 uppercase font-black italic tracking-tighter transition-all duration-500 rounded-2xl shadow-2xl relative overflow-hidden group ${status === 'success' ? 'bg-green-600 text-white' : 'bg-cyan-500 text-black hover:bg-cyan-400 active:scale-95'
                        }`}
                >
                    <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {status === 'loading' ? (
                            <><Loader2 className="h-5 w-5 animate-spin" /> Deploying Authority Content...</>
                        ) : status === 'success' ? (
                            <><CheckCircle2 className="h-5 w-5" /> EXPANSION DEPLOYED</>
                        ) : (
                            <><Database className="h-5 w-5" /> Run Global Expansion</>
                        )}
                    </span>
                </Button>
            </CardFooter>
        </Card>
    )
}
