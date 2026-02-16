"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, X, RefreshCw, Loader2, Trophy, Clock } from "lucide-react"

// Rapid fire boolean questions
const TRIVIA_QUESTIONS = [
    { q: "ChatGPT was developed by Google.", a: false },
    { q: "Python is currently the most popular language for AI.", a: true },
    { q: "GPUs are less efficient than CPUs for training neural networks.", a: false },
    { q: "A 'Tensor' is a mathematical object used in AI data representation.", a: true },
    { q: "The 'T' in GPT stands for 'Training'.", a: false }, // Transformer
    { q: "NVIDIA's CEO is Jensen Huang.", a: true },
    { q: "OpenAI is a non-profit organization.", a: false }, // Capped profit
    { q: "Machine Learning is a subset of Artificial Intelligence.", a: true },
    { q: "Deep Blue defeated Garry Kasparov in Chess in 1997.", a: true },
    { q: "The Turing Test measures a machine's physical strength.", a: false },
]

export function TriviaGame() {
    const [current, setCurrent] = useState(0)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(30)
    const [isActive, setIsActive] = useState(false)
    const [isOver, setIsOver] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(t => t - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            endGame()
        }
        return () => clearInterval(interval)
    }, [isActive, timeLeft])

    const startGame = () => {
        setIsActive(true)
        setIsOver(false)
        setScore(0)
        setCurrent(0)
        setTimeLeft(30)
    }

    const handleAnswer = (val: boolean) => {
        if (!isActive) return

        const correct = TRIVIA_QUESTIONS[current].a === val
        if (correct) {
            setScore(s => s + 100)
        } else {
            setScore(s => Math.max(0, s - 50)) // Penalty
        }

        if (current < TRIVIA_QUESTIONS.length - 1) {
            setCurrent(c => c + 1)
        } else {
            endGame()
        }
    }

    const endGame = () => {
        setIsActive(false)
        setIsOver(true)
        saveScore(score)
    }

    const saveScore = async (finalScore: number) => {
        if (finalScore === 0) return
        setSaving(true)
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // @ts-ignore
                await supabase.from('game_scores' as any).insert({
                    user_id: user.id,
                    game_type: 'trivia_ai',
                    score: finalScore,
                    metadata: { type: 'rapid_fire' }
                })
            }
        } catch (error) {
            console.error("Failed to save score", error)
        } finally {
            setSaving(false)
        }
    }

    if (isOver) {
        return (
            <Card className="p-8 text-center border-slate-200 shadow-lg bg-white max-w-lg mx-auto">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Trophy className="w-10 h-10" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Time's Up!</h2>
                <div className="text-4xl font-black text-slate-900 mb-4">{score} Pts</div>

                <div className="flex gap-4 justify-center">
                    <Button onClick={startGame} variant="outline" className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Replay
                    </Button>
                    <Button disabled={saving} className="bg-slate-900 text-white gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trophy className="w-4 h-4" />}
                        {saving ? "Saving..." : "Leaderboard"}
                    </Button>
                </div>
            </Card>
        )
    }

    if (!isActive) {
        return (
            <Card className="p-8 text-center border-slate-200 shadow-lg bg-white max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Rapid Fire Trivia</h2>
                <p className="text-slate-500 mb-8">
                    Answer as many AI & Tech questions as possible in 30 seconds.
                    <br /><br />
                    <span className="text-green-600 font-bold">+100 for Correct</span>
                    <br />
                    <span className="text-red-500 font-bold">-50 for Wrong</span>
                </p>
                <Button onClick={startGame} className="bg-blue-600 text-white w-full h-12 text-lg rounded-full">
                    Start Timer
                </Button>
            </Card>
        )
    }

    return (
        <Card className="p-6 bg-white border-slate-200 shadow-md max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-slate-500 font-mono font-bold">
                    <Clock className="w-4 h-4" /> {timeLeft}s
                </div>
                <div className="text-2xl font-black text-blue-600">{score}</div>
            </div>

            <Progress value={(timeLeft / 30) * 100} className="mb-8 h-2" />

            <div className="text-center mb-8 h-[120px] flex items-center justify-center">
                <h3 className="text-2xl font-bold text-slate-800 leading-snug">
                    {TRIVIA_QUESTIONS[current].q}
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    onClick={() => handleAnswer(true)}
                    className="h-16 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-xl"
                >
                    <Check className="mr-2" /> TRUE
                </Button>
                <Button
                    onClick={() => handleAnswer(false)}
                    className="h-16 bg-rose-500 hover:bg-rose-600 text-white text-lg font-bold rounded-xl"
                >
                    <X className="mr-2" /> FALSE
                </Button>
            </div>

            <div className="mt-6 text-center text-xs text-slate-400 uppercase tracking-widest">
                Question {current + 1} of {TRIVIA_QUESTIONS.length}
            </div>
        </Card>
    )
}
