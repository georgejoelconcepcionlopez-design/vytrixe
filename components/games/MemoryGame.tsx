"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCcw, DollarSign, Brain, Zap, Globe, TrendingUp, Search, Lock, Database } from "lucide-react"
import { cn } from "@/lib/utils"

const ICONS = [DollarSign, Brain, Zap, Globe, TrendingUp, Search, Lock, Database]

// 4x4 grid = 16 cards = 8 pairs
interface Card {
    id: number
    iconIndex: number
    isFlipped: boolean
    isMatched: boolean
}

export function MemoryGame() {
    const [cards, setCards] = useState<Card[]>([])
    const [moves, setMoves] = useState(0)
    const [firstCard, setFirstCard] = useState<number | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isWon, setIsWon] = useState(false)

    useEffect(() => {
        initializeGame()
    }, [])

    const initializeGame = () => {
        const pairs = [...Array(8).keys()]
        const deck = [...pairs, ...pairs]
            .sort(() => Math.random() - 0.5)
            .map((iconIndex, id) => ({
                id,
                iconIndex,
                isFlipped: false,
                isMatched: false
            }))

        setCards(deck)
        setMoves(0)
        setFirstCard(null)
        setIsProcessing(false)
        setIsWon(false)
    }

    const handleCardClick = (id: number) => {
        if (isProcessing || cards[id].isFlipped || cards[id].isMatched) return

        // Flip card
        const newCards = [...cards]
        newCards[id].isFlipped = true
        setCards(newCards)

        if (firstCard === null) {
            setFirstCard(id)
        } else {
            setMoves(m => m + 1)
            setIsProcessing(true)

            // Check match
            if (cards[firstCard].iconIndex === cards[id].iconIndex) {
                newCards[firstCard].isMatched = true
                newCards[id].isMatched = true
                setCards(newCards)
                setFirstCard(null)
                setIsProcessing(false)

                // Check win
                if (newCards.every(c => c.isMatched)) {
                    setIsWon(true)
                }
            } else {
                // No match
                setTimeout(() => {
                    const resetCards = [...newCards]
                    resetCards[firstCard].isFlipped = false
                    resetCards[id].isFlipped = false
                    setCards(resetCards)
                    setFirstCard(null)
                    setIsProcessing(false)
                }, 1000)
            }
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-white">Moves: {moves}</span>
                <Button onClick={initializeGame} variant="outline" className="border-cyan-500/50 text-cyan-400">
                    <RefreshCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {cards.map((card) => {
                    const Icon = ICONS[card.iconIndex]
                    return (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className={cn(
                                "aspect-square rounded-lg cursor-pointer transition-all duration-500 transform perspective-1000 relative",
                                card.isFlipped ? "rotate-y-180" : ""
                            )}
                        >
                            <div className={cn(
                                "w-full h-full flex items-center justify-center rounded-lg border-2 text-3xl transition-all duration-300",
                                card.isFlipped
                                    ? card.isMatched
                                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_cyan]"
                                        : "bg-slate-800 border-slate-600 text-white"
                                    : "bg-[#0A0F1F] border-cyan-900 hover:border-cyan-500/50"
                            )}>
                                {card.isFlipped ? <Icon className="w-8 h-8" /> : <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-md" />}
                            </div>
                        </div>
                    )
                })}
            </div>

            {isWon && (
                <div className="mt-8 text-center animate-bounce">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        Victory! 🎉
                    </h3>
                    <p className="text-slate-400">Completed in {moves} moves</p>
                </div>
            )}
        </div>
    )
}
