
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Search, Trophy, ArrowLeft, Zap, Hash, TrendingUp, HelpCircle, Terminal } from "lucide-react"
import { QuizGame } from "@/components/games/QuizGame"
import { WordSearchGame } from "@/components/games/WordSearchGame"
import { ReactionGame } from "@/components/games/ReactionGame"
import { MemoryGame } from "@/components/games/MemoryGame"
import { NumberGuessGame } from "@/components/games/NumberGuessGame"
import { CryptoSimGame } from "@/components/games/CryptoSimGame"
import { TriviaGame } from "@/components/games/TriviaGame"
import { cn } from "@/lib/utils"

type GameType = "lobby" | "quiz" | "word-search" | "reaction" | "memory" | "number-guess" | "crypto-sim" | "trivia"

export default function LabPage() {
    const [view, setView] = useState<GameType>("lobby")

    const SIMULATORS_LIST = [
        { id: 'quiz', title: 'Market IQ Eval', desc: 'Assess your financial knowledge baseline.', icon: Brain, color: 'text-blue-400' },
        { id: 'word-search', title: 'Pattern Recognition', desc: 'Identify hidden market signals.', icon: Search, color: 'text-purple-400' },
        { id: 'reaction', title: 'Execution Latency', desc: 'Test your trade execution speed.', icon: Zap, color: 'text-yellow-400' },
        { id: 'memory', title: 'Visual Memory', desc: 'Recall complex chart patterns.', icon: Brain, color: 'text-pink-400' },
        { id: 'number-guess', title: 'Algo Decryption', desc: 'Reverse engineer the numeric sequence.', icon: Hash, color: 'text-emerald-400' },
        { id: 'crypto-sim', title: 'Trading Simulator', desc: 'Predict asset price action.', icon: TrendingUp, color: 'text-indigo-400' },
        { id: 'trivia', title: 'Rapid Fire Intel', desc: '30s High-frequency trivia.', icon: HelpCircle, color: 'text-cyan-400' },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* Conditional Back Button for Games */}
            {view !== "lobby" && (
                <div className="container mx-auto px-4 py-6 flex items-center">
                    <Button
                        variant="ghost"
                        onClick={() => setView("lobby")}
                        className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4" /> Return to Lab
                    </Button>
                </div>
            )}

            <main className="container mx-auto px-4 py-12">
                {view === "lobby" && (
                    <div className="max-w-6xl mx-auto space-y-16">
                        <div className="text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full border border-border">
                                <Terminal className="w-4 h-4 text-primary" />
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Vytrixe R&D</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                                Innovation <span className="text-primary">Lab</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Experimental strategic simulators designed to sharpen your analytical edge.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {SIMULATORS_LIST.map((sim) => (
                                <Card
                                    key={sim.id}
                                    className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
                                    onClick={() => setView(sim.id as GameType)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="p-8 flex flex-col items-start gap-6 relative z-10">
                                        <div className={`p-3 rounded-lg bg-secondary border border-border group-hover:bg-background transition-colors`}>
                                            <sim.icon className={`w-8 h-8 ${sim.color}`} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{sim.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{sim.desc}</p>
                                        </div>
                                        <div className="w-full pt-4 border-t border-border mt-auto flex items-center justify-between">
                                            <span className="text-xs font-mono text-muted-foreground">v1.0.2</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                                Initialize &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center pt-8 border-t border-border">
                            <div className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium uppercase tracking-widest">
                                <Trophy className="w-4 h-4 text-yellow-500" /> Analyst Leaderboard - System Offline
                            </div>
                        </div>
                    </div>
                )}

                {/* Game Views - Wrapped in consistent container */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {view === "quiz" && <div className="max-w-2xl mx-auto"><QuizGame /></div>}
                    {view === "word-search" && <div className="max-w-4xl mx-auto"><WordSearchGame /></div>}
                    {view === "reaction" && <div className="max-w-xl mx-auto"><ReactionGame /></div>}
                    {view === "memory" && <div className="max-w-3xl mx-auto"><MemoryGame /></div>}
                    {view === "number-guess" && <div className="max-w-xl mx-auto"><NumberGuessGame /></div>}
                    {view === "crypto-sim" && <div className="max-w-2xl mx-auto"><CryptoSimGame /></div>}
                    {view === "trivia" && <div className="max-w-xl mx-auto"><TriviaGame /></div>}
                </div>
            </main>
        </div>
    )
}
