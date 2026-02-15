
"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Sparkles, ShieldCheck } from 'lucide-react'

export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    useEffect(() => {
        const hasSeen = sessionStorage.getItem('vytrixe_popup_seen')
        if (hasSeen) return

        let timer: NodeJS.Timeout
        const handleMouseOut = (e: MouseEvent) => {
            if (e.clientY <= 0) {
                // Delay activation by 5s once intent detected (user request specified 5s delay BEFORE activation)
                // Actually, "5-second delay before activation" likely means "don't show for the first 5 seconds of the session"
                // OR "wait 5s after intent detected". Standard exit intent is instant.
                // Interpreting as: Don't show until user has been on page for 5s.
                timer = setTimeout(() => {
                    setIsVisible(true)
                }, 500) // Small delay for UX
            }
        }

        const sessionTimer = setTimeout(() => {
            document.addEventListener('mouseout', handleMouseOut)
        }, 5000)

        return () => {
            clearTimeout(sessionTimer)
            clearTimeout(timer)
            document.removeEventListener('mouseout', handleMouseOut)
        }
    }, [])

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')
        try {
            const supabase = createClient()
            const { error } = await supabase
                .from('subscribers')
                .insert({ email, source: 'exit_intent' })

            if (error) throw error

            setStatus('success')
            sessionStorage.setItem('trendnova_popup_seen', 'true')
            setTimeout(() => setIsVisible(false), 2000)
        } catch (err) {
            setStatus('error')
        }
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-sm bg-[#050A18] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10 animate-in fade-in zoom-in duration-300">
                <button
                    onClick={() => {
                        setIsVisible(false)
                        sessionStorage.setItem('vytrixe_popup_seen', 'true')
                    }}
                    className="absolute top-4 right-4 p-1 text-slate-500 hover:text-white transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-6 border border-cyan-500/20">
                        <Sparkles className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Wait! Don't Miss the Next Wave</h2>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                        Join 12,000+ analysts getting 48-hour early alerts on global trends. No spam, just alpha.
                    </p>

                    {status === 'success' ? (
                        <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold py-2">
                            <ShieldCheck className="h-5 w-5" /> Welcome to the loop
                        </div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Your best email..."
                                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-cyan-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full h-12 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all active:scale-95"
                            >
                                {status === 'loading' ? 'Securing access...' : 'Secure Early Access'}
                            </Button>
                            {status === 'error' && (
                                <p className="text-xs text-red-400">Something went wrong. Try again?</p>
                            )}
                        </form>
                    )}

                    <p className="text-[10px] text-slate-600 mt-6 uppercase tracking-widest font-bold">Vytrixe Intelligence Desk</p>
                </div>
            </div>
        </div>
    )
}
