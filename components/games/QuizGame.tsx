"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Trophy, RefreshCw, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const QUESTIONS = [
    {
        id: 1,
        question: "Which company recently surpassed a $3 Trillion market cap driven by AI chip demand?",
        options: ["Microsoft", "Nvidia", "Apple", "Alphabet"],
        answer: "Nvidia"
    },
    {
        id: 2,
        question: "What economic indicator measures the average change in prices paid by consumers?",
        options: ["GDP", "CPI", "RSI", "P/E Ratio"],
        answer: "CPI"
    },
    {
        id: 3,
        question: "Which cryptocurrency popularized the 'Proof of Stake' consensus mechanism?",
        options: ["Bitcoin", "Ethereum", "Dogecoin", "Litecoin"],
        answer: "Ethereum"
    },
    {
        id: 4,
        question: "In trading, what does 'RSI' stand for?",
        options: ["Relative Strength Index", "Real Stock Indicator", "Rate Supply Interest", "Risk Standard Index"],
        answer: "Relative Strength Index"
    },
    {
        id: 5,
        question: "Which sector is currently leading global venture capital investment?",
        options: ["Real Estate", "Artificial Intelligence", "Oil & Gas", "Retail"],
        answer: "Artificial Intelligence"
    }
]

export function QuizGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [saving, setSaving] = useState(false)

    const handleAnswerOptionClick = (option: string) => {
        const correct = option === QUESTIONS[currentQuestion].answer
        setSelectedAnswer(option)
        setIsCorrect(correct)

        if (correct) {
            setScore(score + 100)
        }

        // Auto advance
        setTimeout(() => {
            const nextQuestion = currentQuestion + 1
            if (nextQuestion < QUESTIONS.length) {
                setCurrentQuestion(nextQuestion)
                setSelectedAnswer(null)
                setIsCorrect(null)
            } else {
                setShowScore(true)
                saveScore(score + (correct ? 100 : 0))
            }
        }, 1000)
    }

    const saveScore = async (finalScore: number) => {
        setSaving(true)
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // @ts-ignore - game_scores table exists but types are not generated yet
                await supabase.from('game_scores' as any).insert({
                    user_id: user.id,
                    game_type: 'quiz',
                    score: finalScore,
                    metadata: { total_questions: QUESTIONS.length }
                })
            }
        } catch (error) {
            console.error("Failed to save score", error)
        } finally {
            setSaving(false)
        }
    }

    const resetGame = () => {
        setCurrentQuestion(0)
        setScore(0)
        setShowScore(false)
        setSelectedAnswer(null)
        setIsCorrect(null)
    }

    if (showScore) {
        return (
            <Card className="p-8 text-center border-slate-200 shadow-lg bg-white">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                        <Trophy className="w-10 h-10" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
                <p className="text-slate-500 mb-8">You scored {score} points</p>

                <div className="flex gap-4 justify-center">
                    <Button onClick={resetGame} variant="outline" className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Play Again
                    </Button>
                    <Button className="bg-[#0f172a] text-white" disabled={saving}>
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        {saving ? "Saving..." : "Leaderboard"}
                    </Button>
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-6 md:p-8 bg-white border-slate-200 shadow-md">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Market IQ Challenge</h2>
                    <p className="text-sm text-slate-500">Question {currentQuestion + 1} of {QUESTIONS.length}</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">{score}</span>
                    <span className="text-xs text-slate-400 block uppercase tracking-wider">Points</span>
                </div>
            </div>

            <Progress value={(currentQuestion / QUESTIONS.length) * 100} className="mb-8 h-2 bg-slate-100" />

            <div className="mb-8">
                <h3 className="text-xl font-medium text-slate-800 mb-6 leading-relaxed">
                    {QUESTIONS[currentQuestion].question}
                </h3>
                <div className="grid gap-3">
                    {QUESTIONS[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => !selectedAnswer && handleAnswerOptionClick(option)}
                            disabled={selectedAnswer !== null}
                            className={cn(
                                "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group",
                                selectedAnswer === option
                                    ? isCorrect
                                        ? "bg-green-50 border-green-200 text-green-700"
                                        : "bg-red-50 border-red-200 text-red-700"
                                    : "bg-white border-slate-200 hover:border-blue-200 hover:bg-slate-50 text-slate-700"
                            )}
                        >
                            <span className="font-medium">{option}</span>
                            {selectedAnswer === option && (
                                isCorrect
                                    ? <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    : <XCircle className="w-5 h-5 text-red-600" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </Card>
    )
}
