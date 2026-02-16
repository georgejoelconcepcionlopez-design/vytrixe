"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, RefreshCw, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const GRID_SIZE = 10
const WORDS = ["NVIDIA", "CRYPTO", "STOCKS", "BOND", "YIELD", "AI", "FUNDS"]

export function WordSearchGame() {
    const [grid, setGrid] = useState<string[][]>([])
    const [foundWords, setFoundWords] = useState<string[]>([])
    const [selectedCells, setSelectedCells] = useState<{ r: number, c: number }[]>([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [saving, setSaving] = useState(false)

    // Generate Grid on Mount
    useEffect(() => {
        initializeGame()
    }, [])

    const initializeGame = () => {
        // Simple grid generation logic for demo purposes
        // In a real app, use a proper word search generator algorithm
        const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''))

        // Fill with random letters
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26))
            }
        }

        // Place WORDS (simplified horizontal placement for stability)
        WORDS.forEach((word, idx) => {
            const row = idx
            const startCol = 0
            for (let i = 0; i < word.length; i++) {
                newGrid[row][startCol + i] = word[i]
            }
        })

        setGrid(newGrid)
        setFoundWords([])
        setScore(0)
        setGameOver(false)
        setSelectedCells([])
    }

    const handleCellClick = (r: number, c: number) => {
        if (gameOver) return

        const isSelected = selectedCells.some(cell => cell.r === r && cell.c === c)
        let newSelection

        if (isSelected) {
            newSelection = selectedCells.filter(cell => cell.r !== r || cell.c !== c)
        } else {
            newSelection = [...selectedCells, { r, c }]
        }

        setSelectedCells(newSelection)

        // Check against words
        const selectedWord = newSelection
            .sort((a, b) => (a.r - b.r) || (a.c - b.c))
            .map(cell => grid[cell.r][cell.c])
            .join("")

        if (WORDS.includes(selectedWord) && !foundWords.includes(selectedWord)) {
            const newFound = [...foundWords, selectedWord]
            setFoundWords(newFound)
            setScore(prev => prev + (selectedWord.length * 50))
            setSelectedCells([]) // Reset selection

            if (newFound.length === WORDS.length) {
                finishGame(score + (selectedWord.length * 50))
            }
        }
    }

    const finishGame = async (finalScore: number) => {
        setGameOver(true)
        setSaving(true)
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // @ts-ignore - game_scores table exists but types are not generated yet
                await supabase.from('game_scores' as any).insert({
                    user_id: user.id,
                    game_type: 'word-search',
                    score: finalScore,
                    metadata: { words_found: WORDS.length }
                })
            }
        } catch (error) {
            console.error("Failed to save score", error)
        } finally {
            setSaving(false)
        }
    }

    return (
        <Card className="p-6 md:p-8 bg-white border-slate-200 shadow-md">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Trend Hunter</h2>
                    <p className="text-sm text-slate-500">Find {WORDS.length} hidden market terms</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-purple-600">{score}</span>
                    <span className="text-xs text-slate-400 block uppercase tracking-wider">Points</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-10 gap-1 bg-slate-100 p-2 rounded-lg border border-slate-200">
                        {grid.map((row, r) => (
                            row.map((letter, c) => {
                                const isSelected = selectedCells.some(cell => cell.r === r && cell.c === c)
                                return (
                                    <button
                                        key={`${r}-${c}`}
                                        onClick={() => handleCellClick(r, c)}
                                        className={cn(
                                            "aspect-square flex items-center justify-center text-sm sm:text-base font-bold rounded-sm transition-colors",
                                            isSelected
                                                ? "bg-purple-600 text-white shadow-md scale-95"
                                                : "bg-white text-slate-700 hover:bg-purple-50"
                                        )}
                                    >
                                        {letter}
                                    </button>
                                )
                            })
                        ))}
                    </div>
                </div>

                {/* Word List */}
                <div className="w-full md:w-48 space-y-4">
                    <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Target Words</h3>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                        {WORDS.map(word => (
                            <div
                                key={word}
                                className={cn(
                                    "px-3 py-2 rounded-md text-sm font-medium transition-all",
                                    foundWords.includes(word)
                                        ? "bg-green-100 text-green-700 line-through opacity-50"
                                        : "bg-slate-50 text-slate-600"
                                )}
                            >
                                {word}
                            </div>
                        ))}
                    </div>

                    {gameOver && (
                        <div className="mt-8 pt-6 border-t border-slate-100 text-center animate-in fade-in zoom-in">
                            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <h4 className="font-bold text-slate-900 mb-4">Complete!</h4>
                            <Button onClick={initializeGame} className="w-full bg-[#0f172a] text-white">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                                {saving ? "Saving..." : "Play Again"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}
