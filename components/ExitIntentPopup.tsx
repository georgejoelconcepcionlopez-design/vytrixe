
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
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)

        // 1. Strict Session Check
        const hasShown = localStorage.getItem('newsletterShown')
        if (hasShown) return

        const handleMouseOut = (e: MouseEvent) => {
            // Check again inside event to be safe
            if (localStorage.getItem('newsletterShown')) {
                document.removeEventListener('mouseout', handleMouseOut)
                return
            }

            if (e.clientY <= 0) {
                // 2. Trigger Popup & Set Flag Immediately
                setIsVisible(true)
                localStorage.setItem('newsletterShown', 'true')

                // 3. Cleanup Listener immediately so it doesn't fire again
                document.removeEventListener('mouseout', handleMouseOut)
            }
        }

        document.addEventListener('mouseout', handleMouseOut)

        return () => {
            document.removeEventListener('mouseout', handleMouseOut)
        }
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        // Redundant set, but safe
        localStorage.setItem('newsletterShown', 'true')
    }

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
            // Keep it closed permanently
            localStorage.setItem('newsletterShown', 'true')
            setTimeout(() => setIsVisible(false), 2000)
        } catch (err) {
            setStatus('error')
        }
    }

    // Don't render anything until mounted to prevent hydration errors
    if (!isMounted) return null
    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-sm bg-[#ffffff] border border-slate-200 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6 border border-blue-100">
                        <Sparkles className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Wait! Don't Miss Out</h2>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                        Get 48-hour early alerts on global trends. Join 12,000+ analysts. No spam.
                    </p>

                    {status === 'success' ? (
                        <div className="flex items-center justify-center gap-2 text-green-600 font-bold py-2 bg-green-50 rounded-xl">
                            <ShieldCheck className="h-5 w-5" /> Welcome to the loop
                        </div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Your best email..."
                                className="bg-slate-50 border-slate-200 text-slate-900 h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full h-12 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-slate-900/10"
                            >
                                {status === 'loading' ? 'Securing access...' : 'Secure Early Access'}
                            </Button>
                            {status === 'error' && (
                                <p className="text-xs text-red-500">Something went wrong. Try again?</p>
                            )}
                        </form>
                    )}

                    <p className="text-[10px] text-slate-400 mt-6 uppercase tracking-widest font-bold">Vytrixe Intelligence Desk</p>
                </div>
            </div>
        </div>
    )
}
