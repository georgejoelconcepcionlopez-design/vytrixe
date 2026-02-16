"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, RefreshCw, Loader2, Trophy, Bitcoin, DollarSign, TrendingUp, LineChart, PieChart, Wallet, Activity, Globe } from "lucide-react"

const ICONS = [Bitcoin, DollarSign, TrendingUp, LineChart, PieChart, Wallet, Activity, Globe]

type CardType = {
    id: number
    iconId: number
    isFlipped: boolean
    isMatched: boolean
}

export function MemoryGame() {
    const [cards, setCards] = useState<CardType[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [saving, setSaving] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(() => {
        initializeGame()
    }, [])

    const initializeGame = () => {
        // Create pairs
        const gameIcons = [...ICONS.slice(0, 6)] // Use 6 icons for 12 cards (3x4 grid) or 4x3
        const newCards: CardType[] = []

        gameIcons.forEach((_, index) => {
            newCards.push({ id: index * 2, iconId: index, isFlipped: false, isMatched: false })
            newCards.push({ id: index * 2 + 1, iconId: index, isFlipped: false, isMatched: false })
        })

        // Shuffle
        newCards.sort(() => Math.random() - 0.5)

        setCards(newCards)
        setFlippedCards([])
        setMoves(0)
        setIsComplete(false)
        setScore(0)
    }

    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2) return // Prevent clicking more than 2

        const clickedCard = cards.find(c => c.id === id)
        if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return

        // Flip logic
        const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c)
        setCards(newCards)

        const newFlipped = [...flippedCards, id]
        setFlippedCards(newFlipped)

        if (newFlipped.length === 2) {
            setMoves(m => m + 1)
            checkForMatch(newFlipped, newCards)
        }
    }

    const checkForMatch = (currentFlipped: number[], currentCards: CardType[]) => {
        const [id1, id2] = currentFlipped
        const card1 = currentCards.find(c => c.id === id1)
        const card2 = currentCards.find(c => c.id === id2)

        if (card1 && card2 && card1.iconId === card2.iconId) {
            // Match found
            setTimeout(() => {
                setCards(prev => prev.map(c =>
                    c.id === id1 || c.id === id2
                        ? { ...c, isMatched: true, isFlipped: true }
                        : c
                ))
                setFlippedCards([])

                // Check win condition
                const allMatched = currentCards.every(c => c.isMatched || c.id === id1 || c.id === id2) // Basic check
                // Actually need to check state after update, or track match count
                if (currentCards.filter(c => c.isMatched).length + 2 === currentCards.length) {
                    handleWin()
                }
            }, 500)
        } else {
            // No match
            setTimeout(() => {
                setCards(prev => prev.map(c =>
                    c.id === id1 || c.id === id2
                        ? { ...c, isFlipped: false }
                        : c
                ))
                setFlippedCards([])
            }, 1000)
        }
    }

    const handleWin = () => {
        setIsComplete(true)
        // Score calculation: (Ideal moves / Actual moves) * 1000
        // Ideal moves for 6 pairs is 6.
        // Penalty for time could be added but let's keep simple.
        const calculatedScore = Math.max(100, Math.floor((12 / (moves + 1)) * 5000))
        setScore(calculatedScore)
        saveScore(calculatedScore)
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
                    game_type: 'memory',
                    score: finalScore,
                    metadata: { moves }
                })
            }
        } catch (error) {
            console.error("Failed to save score", error)
        } finally {
            setSaving(false)
        }
    }

    if (isComplete) {
        return (
            <Card className="p-8 text-center border-slate-200 shadow-lg bg-white max-w-lg mx-auto">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        <Brain className="w-10 h-10" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Memory Master!</h2>
                <div className="text-4xl font-black text-blue-600 mb-4">{score} Pts</div>
                <p className="text-slate-500 mb-8">Solved in {moves} moves</p>

                <div className="flex gap-4 justify-center">
                    <Button onClick={initializeGame} variant="outline" className="gap-2">
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
        <Card className="p-6 bg-white border-slate-200 shadow-md max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Pattern Recognition</h2>
                    <p className="text-sm text-slate-500">Moves: {moves}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={initializeGame}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 h-[400px]">
                {cards.map(card => {
                    const Icon = ICONS[card.iconId]
                    return (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className={`
                                relative rounded-xl cursor-pointer transition-all duration-300 transform preserve-3d
                                ${card.isFlipped ? 'rotate-y-180' : ''}
                                flex items-center justify-center
                            `}
                        >
                            {/* Front (Hidden) */}
                            <div className={`
                                absolute inset-0 bg-slate-100 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-colors
                                flex items-center justify-center
                                ${card.isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                            `}>
                                <Brain className="w-6 h-6 text-slate-300" />
                            </div>

                            {/* Back (Revealed) */}
                            <div className={`
                                absolute inset-0 bg-blue-50 rounded-xl border-2 border-blue-200
                                flex items-center justify-center
                                ${card.isFlipped ? 'opacity-100' : 'opacity-0'}
                            `}>
                                <Icon className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
