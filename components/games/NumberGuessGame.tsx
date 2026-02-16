"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Hash, ArrowUp, ArrowDown, Check, RefreshCw, Loader2, Trophy } from "lucide-react"

export function NumberGuessGame() {
    const [target, setTarget] = useState(generateNumber())
    const [guess, setGuess] = useState("")
    const [history, setHistory] = useState<{ val: number, result: 'high' | 'low' | 'match' }[]>([])
    const [isWon, setIsWon] = useState(false)
    const [saving, setSaving] = useState(false)
    const [score, setScore] = useState(0)

    function generateNumber() {
        return Math.floor(Math.random() * 100) + 1
    }

    const handleGuess = (e: React.FormEvent) => {
        e.preventDefault()
        const val = parseInt(guess)
        if (isNaN(val)) return

        let result: 'high' | 'low' | 'match' = 'match'
        if (val > target) result = 'high'
        else if (val < target) result = 'low'

        setHistory(prev => [{ val, result }, ...prev])
        setGuess("")

        if (result === 'match') {
            setIsWon(true)
            const finalScore = Math.max(0, 1000 - (history.length * 100))
            setScore(finalScore)
            saveScore(finalScore)
        }
    }

    const resetGame = () => {
        setTarget(generateNumber())
        setGuess("")
        setHistory([])
        setIsWon(false)
        setScore(0)
    }

    const saveScore = async (finalScore: number) => {
        setSaving(true)
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // @ts-ignore
                await supabase.from('game_scores' as any).insert({
                    user_id: user.id,
                    game_type: 'number_guess',
                    score: finalScore,
                    metadata: { guesses: history.length + 1 }
                })
            }
        } catch (error) {
            console.error("Failed to save score", error)
        } finally {
            setSaving(false)
        }
    }

    if (isWon) {
        return (
            <Card className="p-8 text-center border-slate-200 shadow-lg bg-white max-w-lg mx-auto">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        <Check className="w-10 h-10" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Number Unlocked!</h2>
                <div className="text-4xl font-black text-slate-900 mb-4">{target}</div>
                <p className="text-slate-500 mb-8">You found it in {history.length} guesses.</p>
                <div className="text-2xl font-bold text-blue-600 mb-8">Score: {score}</div>

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
        <Card className="p-6 bg-white border-slate-200 shadow-md max-w-lg mx-auto">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-500">
                    <Hash className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Algorithmic Guessing</h2>
                <p className="text-sm text-slate-500">Find the hidden number between 1 and 100.</p>
            </div>

            <form onSubmit={handleGuess} className="flex gap-4 mb-8">
                <Input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Enter number..."
                    className="text-lg text-center font-bold tracking-widest bg-slate-50"
                    autoFocus
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]">
                    Guess
                </Button>
            </form>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {history.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 animate-in slide-in-from-top-2">
                        <span className="font-mono font-bold text-slate-700">#{history.length - i}</span>
                        <span className="text-lg font-bold text-slate-900">{item.val}</span>
                        <div className="flex items-center gap-2">
                            {item.result === 'high' ? (
                                <span className="text-xs font-bold text-rose-500 flex items-center uppercase tracking-wider">
                                    Too High <ArrowDown className="w-4 h-4 ml-1" />
                                </span>
                            ) : (
                                <span className="text-xs font-bold text-blue-500 flex items-center uppercase tracking-wider">
                                    Too Low <ArrowUp className="w-4 h-4 ml-1" />
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
