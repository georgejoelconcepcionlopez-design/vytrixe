"use client"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, RefreshCw, Loader2, Trophy, Play } from "lucide-react"

export function CryptoSimGame() {
    const [price, setPrice] = useState([100])
    const [isPlaying, setIsPlaying] = useState(false)
    const [streak, setStreak] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [saving, setSaving] = useState(false)

    // Canvas for chart
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        drawChart()
    }, [price])

    const drawChart = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const w = canvas.width
        const h = canvas.height
        ctx.clearRect(0, 0, w, h)

        // Draw grid
        ctx.strokeStyle = '#f1f5f9'
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let i = 0; i < w; i += 40) { ctx.moveTo(i, 0); ctx.lineTo(i, h); }
        for (let j = 0; j < h; j += 40) { ctx.moveTo(0, j); ctx.lineTo(w, j); }
        ctx.stroke()

        // Draw Line
        ctx.strokeStyle = '#3b82f6'
        ctx.lineWidth = 2
        ctx.beginPath()
        const step = w / 20 // Show last 20 points
        const startIdx = Math.max(0, price.length - 21)

        price.slice(startIdx).forEach((p, i) => {
            const x = i * step
            // Normalize price to fit height. Focus on recent range.
            const slice = price.slice(startIdx)
            const min = Math.min(...slice) * 0.99
            const max = Math.max(...slice) * 1.01
            const range = max - min || 1
            const y = h - ((p - min) / range * h)

            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
        })
        ctx.stroke()

        // Gradient under line
        // ... (simplified for lightweight)
    }

    const handlePredict = (direction: 'up' | 'down') => {
        if (gameOver) return

        const lastPrice = price[price.length - 1]
        // Random walk
        const change = (Math.random() - 0.5) * 5
        const newPrice = lastPrice + change

        setPrice([...price, newPrice])

        const actualDir = newPrice >= lastPrice ? 'up' : 'down'

        if (actualDir === direction) {
            setStreak(s => s + 1)
        } else {
            setGameOver(true)
            saveScore(streak)
        }
    }

    const resetGame = () => {
        setPrice([100])
        setStreak(0)
        setGameOver(false)
    }

    const saveScore = async (finalStreak: number) => {
        if (finalStreak === 0) return
        setSaving(true)
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // @ts-ignore
                await supabase.from('game_scores' as any).insert({
                    user_id: user.id,
                    game_type: 'crypto_sim',
                    score: finalStreak * 100, // Score multiplier
                    metadata: { streak: finalStreak }
                })
            }
        } catch (error) {
            console.error("Failed to save score", error)
        } finally {
            setSaving(false)
        }
    }

    if (gameOver) {
        return (
            <Card className="p-8 text-center border-slate-200 shadow-lg bg-white max-w-lg mx-auto">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                        <TrendingDown className="w-10 h-10" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Market Crash!</h2>
                <p className="text-slate-500 mb-8">You predicted correctly for {streak} candles.</p>
                <div className="text-4xl font-black text-slate-900 mb-8">{streak * 100} Pts</div>

                <div className="flex gap-4 justify-center">
                    <Button onClick={resetGame} variant="outline" className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Replay
                    </Button>
                    <Button disabled={saving} className="bg-slate-900 text-white gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trophy className="w-4 h-4" />}
                        {saving ? "Saving..." : "Saved"}
                    </Button>
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-0 bg-white border-slate-200 shadow-md max-w-2xl mx-auto overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Live Trend Simulator</h2>
                    <p className="text-xs text-slate-500">Predict the next candle close.</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-blue-600">{streak}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Current Streak</div>
                </div>
            </div>

            <div className="bg-slate-50 relative h-[300px]">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={300}
                    className="w-full h-full"
                />
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
                <Button
                    onClick={() => handlePredict('up')}
                    className="h-16 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-xl"
                >
                    <TrendingUp className="mr-2" /> BUY / CALL
                </Button>
                <Button
                    onClick={() => handlePredict('down')}
                    className="h-16 bg-rose-500 hover:bg-rose-600 text-white text-lg font-bold rounded-xl"
                >
                    <TrendingDown className="mr-2" /> SELL / PUT
                </Button>
            </div>
        </Card>
    )
}
