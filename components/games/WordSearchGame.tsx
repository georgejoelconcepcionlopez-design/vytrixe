"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface WordSearchProps {
    words: string[]
}

const GRID_SIZE = 10

export function WordSearchGame({ words }: WordSearchProps) {
    const [grid, setGrid] = useState<string[][]>([])
    const [foundWords, setFoundWords] = useState<string[]>([])
    const [selection, setSelection] = useState<{ r: number, c: number }[]>([])
    const [isSelecting, setIsSelecting] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(() => {
        generateGrid()
    }, [])

    const generateGrid = () => {
        // Empty grid
        const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''))
        const placedWords: string[] = []

        words.forEach(word => {
            // Try to place word
            let placed = false
            let attempts = 0
            while (!placed && attempts < 50) {
                const dir = Math.floor(Math.random() * 3) // 0: horiz, 1: vert, 2: diag
                const r = Math.floor(Math.random() * GRID_SIZE)
                const c = Math.floor(Math.random() * GRID_SIZE)

                if (canPlace(newGrid, word, r, c, dir)) {
                    place(newGrid, word, r, c, dir)
                    placedWords.push(word)
                    placed = true
                }
                attempts++
            }
        })

        // Fill empty
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (newGrid[r][c] === '') {
                    newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26))
                }
            }
        }
        setGrid(newGrid)
        setFoundWords([])
        setScore(0)
    }

    const canPlace = (g: string[][], w: string, r: number, c: number, dir: number) => {
        if (dir === 0 && c + w.length > GRID_SIZE) return false
        if (dir === 1 && r + w.length > GRID_SIZE) return false
        if (dir === 2 && (c + w.length > GRID_SIZE || r + w.length > GRID_SIZE)) return false

        for (let i = 0; i < w.length; i++) {
            const char = w[i]
            const nr = dir === 1 || dir === 2 ? r + i : r
            const nc = dir === 0 || dir === 2 ? c + i : c
            if (g[nr][nc] !== '' && g[nr][nc] !== char) return false
        }
        return true
    }

    const place = (g: string[][], w: string, r: number, c: number, dir: number) => {
        for (let i = 0; i < w.length; i++) {
            const char = w[i]
            const nr = dir === 1 || dir === 2 ? r + i : r
            const nc = dir === 0 || dir === 2 ? c + i : c
            g[nr][nc] = char
        }
    }

    const handleMouseDown = (r: number, c: number) => {
        setIsSelecting(true)
        setSelection([{ r, c }])
    }

    const handleMouseEnter = (r: number, c: number) => {
        if (!isSelecting) return
        const start = selection[0]
        // Calculate line (Bresenhamish or just simple math for straight lines)
        // Only allow straight lines
        if (r === start.r) {
            // Horizontal
            const path = []
            const min = Math.min(c, start.c)
            const max = Math.max(c, start.c)
            for (let i = min; i <= max; i++) path.push({ r, c: i })
            setSelection(path)
        } else if (c === start.c) {
            // Vertical
            const path = []
            const min = Math.min(r, start.r)
            const max = Math.max(r, start.r)
            for (let i = min; i <= max; i++) path.push({ r: i, c })
            setSelection(path)
        } else if (Math.abs(r - start.r) === Math.abs(c - start.c)) {
            // Diagonal
            const path = []
            const dr = r > start.r ? 1 : -1
            const dc = c > start.c ? 1 : -1
            let nr = start.r
            let nc = start.c
            while (nr !== r + dr) {
                path.push({ r: nr, c: nc })
                nr += dr
                nc += dc
            }
            setSelection(path)
        }
    }

    const handleMouseUp = () => {
        setIsSelecting(false)
        const selectedWord = selection.map(pos => grid[pos.r][pos.c]).join('')
        const reversedWord = selectedWord.split('').reverse().join('')

        if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
            setFoundWords([...foundWords, selectedWord])
            setScore(score + 100)
        } else if (words.includes(reversedWord) && !foundWords.includes(reversedWord)) {
            setFoundWords([...foundWords, reversedWord])
            setScore(score + 100)
        }

        setSelection([])
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            <Card className="p-6 bg-[#0A0F1F] border-cyan-500/20 select-none">
                <div className="flex justify-between mb-4">
                    <span className="text-cyan-400 font-bold">Score: {score}</span>
                    <Button variant="ghost" size="sm" onClick={generateGrid}><RefreshCcw className="w-4 h-4" /></Button>
                </div>
                <div
                    className="grid gap-1 bg-slate-900 p-2 rounded"
                    style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
                    onMouseLeave={() => setIsSelecting(false)}
                    onMouseUp={handleMouseUp}
                >
                    {grid.map((row, r) => (
                        row.map((char, c) => {
                            const isSelected = selection.some(s => s.r === r && s.c === c)
                            // Check if part of found word? Tricky without storing found coords.
                            // For simplicity, we just highlight selected currently.
                            return (
                                <div
                                    key={`${r}-${c}`}
                                    className={cn(
                                        "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-mono font-bold text-sm md:text-lg rounded cursor-pointer transition-colors",
                                        isSelected ? "bg-cyan-500 text-white shadow-[0_0_10px_cyan]" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                                    )}
                                    onMouseDown={() => handleMouseDown(r, c)}
                                    onMouseEnter={() => handleMouseEnter(r, c)}
                                >
                                    {char}
                                </div>
                            )
                        })
                    ))}
                </div>
            </Card>

            <Card className="p-6 bg-[#0A0F1F] border-cyan-500/20 w-full md:w-64">
                <h3 className="text-xl font-bold text-white mb-4">Words to Find</h3>
                <div className="flex flex-wrap gap-2">
                    {words.map(word => (
                        <span
                            key={word}
                            className={cn(
                                "px-2 py-1 rounded text-xs",
                                foundWords.includes(word) ? "bg-green-500/20 text-green-400 line-through decoration-green-500" : "bg-slate-800 text-slate-300"
                            )}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </Card>
        </div>
    )
}
