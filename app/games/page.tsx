"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Search, Trophy, ArrowLeft, Zap, Hash, TrendingUp, HelpCircle } from "lucide-react"
import { QuizGame } from "@/components/games/QuizGame"
import { WordSearchGame } from "@/components/games/WordSearchGame"
import { ReactionGame } from "@/components/games/ReactionGame"
import { MemoryGame } from "@/components/games/MemoryGame"
import { NumberGuessGame } from "@/components/games/NumberGuessGame"
import { CryptoSimGame } from "@/components/games/CryptoSimGame"
import { TriviaGame } from "@/components/games/TriviaGame"
import { cn } from "@/lib/utils"

type GameType = "lobby" | "quiz" | "word-search" | "reaction" | "memory" | "number-guess" | "crypto-sim" | "trivia"

export default function GamesPage() {
    const [view, setView] = useState<GameType>("lobby")

    const GAMES_LIST = [
        { id: 'quiz', title: 'Market IQ Quiz', desc: 'Test your financial knowledge.', icon: Brain, color: 'blue' },
        { id: 'word-search', title: 'Trend Hunter', desc: 'Find hidden market terms.', icon: Search, color: 'purple' },
        { id: 'reaction', title: 'Reaction Speed', desc: 'Test your trading reflexes.', icon: Zap, color: 'yellow' },
        { id: 'memory', title: 'Pattern Match', desc: 'Memorize visual patterns.', icon: Brain, color: 'pink' },
        { id: 'number-guess', title: 'Algo Guess', desc: 'Crack the numeric code.', icon: Hash, color: 'emerald' },
        { id: 'crypto-sim', title: 'Crypto Sim', desc: 'Predict market movements.', icon: TrendingUp, color: 'indigo' },
        { id: 'trivia', title: 'Rapid Fire AI', desc: '30s Tech Trivia Challenge.', icon: HelpCircle, color: 'cyan' },
    ]

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Conditional Back Button for Games */}
            {view !== "lobby" && (
                <div className="container mx-auto px-4 py-4 flex items-center">
                    <Button
                        variant="ghost"
                        onClick={() => setView("lobby")}
                        className="gap-2 text-slate-600 hover:text-slate-900"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Lobby
                    </Button>
                </div>
            )}

            <main className="container mx-auto px-4 py-12">
                {view === "lobby" && (
                    <div className="max-w-6xl mx-auto text-center space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                                Vytrixe <span className="text-blue-600">Cognitive Labs</span>
                            </h1>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Sharpen your financial mind with our AI-powered challenges.
                                Compete for the top spot on the global analyst leaderboard.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {GAMES_LIST.map((game) => (
                                <Card
                                    key={game.id}
                                    className="group relative overflow-hidden border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer bg-white"
                                    onClick={() => setView(game.id as GameType)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="p-8 flex flex-col items-center gap-6 relative z-10">
                                        <div className={`w-16 h-16 rounded-2xl bg-${game.color}-50 flex items-center justify-center text-${game.color}-600 group-hover:scale-110 transition-transform`}>
                                            <game.icon className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-slate-900">{game.title}</h3>
                                            <p className="text-sm text-slate-500">{game.desc}</p>
                                        </div>
                                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full">
                                            Play Now
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-slate-200">
                            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-widest">
                                <Trophy className="w-4 h-4" /> Global Leaderboard Coming Soon
                            </div>
                        </div>
                    </div>
                )}

                {/* Game Views */}
                {view === "quiz" && <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4"><QuizGame /></div>}
                {view === "word-search" && <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4"><WordSearchGame /></div>}
                {view === "reaction" && <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4"><ReactionGame /></div>}
                {view === "memory" && <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4"><MemoryGame /></div>}
                {view === "number-guess" && <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4"><NumberGuessGame /></div>}
                {view === "crypto-sim" && <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4"><CryptoSimGame /></div>}
                {view === "trivia" && <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4"><TriviaGame /></div>}
            </main>
        </div>
    )
}
