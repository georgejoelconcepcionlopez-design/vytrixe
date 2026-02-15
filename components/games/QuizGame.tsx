"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Timer, Trophy, AlertCircle, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Question {
    question: string
    options: string[]
    answer: string
}

interface QuizGameProps {
    title: string
    questions: Question[]
    timePerQuestion?: number // seconds
    onComplete?: (score: number) => void
}

export function QuizGame({ title, questions, timePerQuestion = 15, onComplete }: QuizGameProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(timePerQuestion)
    const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start')
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (gameState === 'playing' && !isAnswered) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleTimeUp()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [gameState, isAnswered, timeLeft])

    const handleTimeUp = () => {
        setIsAnswered(true)
        setTimeout(nextQuestion, 2000)
    }

    const startGame = () => {
        setGameState('playing')
        setCurrentQuestionIndex(0)
        setScore(0)
        setTimeLeft(timePerQuestion)
        setIsAnswered(false)
        setSelectedOption(null)
    }

    const handleAnswer = (option: string) => {
        if (isAnswered) return
        setSelectedOption(option)
        setIsAnswered(true)

        if (option === questions[currentQuestionIndex].answer) {
            setScore((prev) => prev + 100 + (timeLeft * 10)) // Score based on accuracy + speed
        }

        setTimeout(nextQuestion, 1500)
    }

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1)
            setTimeLeft(timePerQuestion)
            setIsAnswered(false)
            setSelectedOption(null)
        } else {
            setGameState('end')
            if (onComplete) onComplete(score)
        }
    }

    if (gameState === 'start') {
        return (
            <Card className="w-full max-w-2xl mx-auto p-8 text-center bg-[#0A0F1F] border-cyan-500/20">
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">{title}</h2>
                <p className="text-slate-400 mb-8">Test your knowledge with {questions.length} questions. Speed counts!</p>
                <Button onClick={startGame} size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8">
                    Start Quiz
                </Button>
            </Card>
        )
    }

    if (gameState === 'end') {
        return (
            <Card className="w-full max-w-2xl mx-auto p-8 text-center bg-[#0A0F1F] border-cyan-500/20">
                <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                <h2 className="text-3xl font-bold mb-2 text-white">Quiz Complete!</h2>
                <p className="text-2xl font-mono text-cyan-400 mb-6">Score: {score}</p>
                <Button onClick={startGame} variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950">
                    <RefreshCcw className="w-4 h-4 mr-2" /> Play Again
                </Button>
            </Card>
        )
    }

    const currentQuestion = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex) / questions.length) * 100

    return (
        <Card className="w-full max-w-2xl mx-auto p-6 bg-[#0A0F1F] border-cyan-500/20">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">Question {currentQuestionIndex + 1}/{questions.length}</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 font-mono">
                    <Timer className="w-4 h-4" />
                    <span>{timeLeft}s</span>
                </div>
            </div>

            <Progress value={progress} className="h-1 mb-8 bg-slate-800" />

            <h3 className="text-xl md:text-2xl font-bold mb-8 text-white min-h-[60px]">
                {currentQuestion.question}
            </h3>

            <div className="grid gap-4">
                {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === option
                    const isCorrect = option === currentQuestion.answer

                    let btnClass = "justify-start h-auto py-4 text-left text-lg border-slate-700 hover:bg-slate-800 hover:text-white"

                    if (isAnswered) {
                        if (isCorrect) btnClass = "justify-start h-auto py-4 text-left text-lg bg-green-500/20 border-green-500 text-green-400"
                        else if (isSelected) btnClass = "justify-start h-auto py-4 text-left text-lg bg-red-500/20 border-red-500 text-red-400"
                        else btnClass = "justify-start h-auto py-4 text-left text-lg border-slate-700 opacity-50"
                    }

                    return (
                        <Button
                            key={idx}
                            variant="outline"
                            className={btnClass}
                            onClick={() => handleAnswer(option)}
                            disabled={isAnswered}
                        >
                            <span className="mr-4 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
                                {String.fromCharCode(65 + idx)}
                            </span>
                            {option}
                        </Button>
                    )
                })}
            </div>

            <div className="mt-6 flex justify-between items-center text-slate-500 text-sm">
                <span>Score: {score}</span>
            </div>
        </Card>
    )
}
