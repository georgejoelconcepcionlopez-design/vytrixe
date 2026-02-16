"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Zap, Timer, RefreshCw, Loader2, Trophy } from "lucide-react"

export function ReactionGame() {
    const [status, setStatus] = useState<'idle' | 'waiting' | 'ready' | 'clicked' | 'finished'>('idle')
    const [startTime, setStartTime] = useState(0)
    const [score, setScore] = useState<number | null>(null)
    const [saving, setSaving] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleStart = () => {
        setStatus('waiting')
        setScore(null)

        // Random time 2-5 seconds
        const delay = Math.floor(Math.random() * 3000) + 2000

        timeoutRef.current = setTimeout(() => {
            setStatus('ready')
            setStartTime(Date.now())
        }, delay)
    }

    const handleClick = () => {
        if (status === 'waiting') {
            // Clicked too early
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            setStatus('idle')
            alert("Too early! Wait for green.")
            return
        }

        if (status === 'ready') {
            const end = Date.now()
            const reactionTime = end - startTime
            setScore(reactionTime)
            setStatus('finished')
            saveScore(reactionTime)
        }
    }

    const saveScore = async (ms: number) => {
        setSaving(true)
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // Score for reaction is inverted logic (lower is better), but for leaderboard usually higher is better.
                // We'll store raw MS. Leaderboard logic handles sorting.
                // @ts-ignore 
                await supabase.from('game_scores' as any).insert({
                    user_id: user.id,
                    game_type: 'reaction',
                    score: ms, // Lower is better
                    metadata: { unit: 'ms' }
                })
            }
        } catch (error) {
            console.error("Failed to save score", error)
        } finally {
            setSaving(false)
        }
    }

    return (
        <Card className="max-w-xl mx-auto overflow-hidden border-slate-200 shadow-xl">
            <div
                className={`
                    h-[400px] flex flex-col items-center justify-center p-8 transition-colors duration-200 cursor-pointer select-none
                    ${status === 'idle' ? 'bg-slate-50' : ''}
                    ${status === 'waiting' ? 'bg-rose-50' : ''}
                    ${status === 'ready' ? 'bg-emerald-500' : ''}
                    ${status === 'finished' ? 'bg-white' : ''}
                `}
                onMouseDown={status === 'waiting' || status === 'ready' ? handleClick : undefined}
            >
                {status === 'idle' && (
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-500">
                            <Zap className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Reaction Test</h2>
                        <p className="text-slate-500 text-lg max-w-sm">
                            When the screen turns <span className="text-emerald-600 font-bold">GREEN</span>, click as fast as you can.
                        </p>
                        <Button size="lg" onClick={handleStart} className="bg-slate-900 text-white rounded-full px-8">
                            Start Test
                        </Button>
                    </div>
                )}

                {status === 'waiting' && (
                    <div className="text-center animate-pulse">
                        <h3 className="text-4xl font-bold text-rose-500">Wait for Green...</h3>
                    </div>
                )}

                {status === 'ready' && (
                    <div className="text-center">
                        <h3 className="text-5xl font-black text-white uppercase tracking-wider">CLICK NOW!</h3>
                    </div>
                )}

                {status === 'finished' && score !== null && (
                    <div className="text-center space-y-8 animate-in zoom-in-50 duration-300">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
                            <Timer className="w-12 h-12" />
                        </div>
                        <div>
                            <div className="text-6xl font-black text-slate-900 mb-2">{score}<span className="text-2xl text-slate-400 ml-1">ms</span></div>
                            <p className="text-slate-500 font-medium">Your Reaction Time</p>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <Button onClick={handleStart} variant="outline" className="gap-2">
                                <RefreshCw className="w-4 h-4" /> Try Again
                            </Button>
                            <Button disabled={saving} className="bg-slate-900 text-white gap-2">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trophy className="w-4 h-4" />}
                                {saving ? "Saving..." : "Save Score"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
