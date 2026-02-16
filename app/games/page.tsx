"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Search, Trophy, ArrowLeft } from "lucide-react"
import { QuizGame } from "@/components/games/QuizGame"
import { WordSearchGame } from "@/components/games/WordSearchGame"
import { cn } from "@/lib/utils"

type GameType = "lobby" | "quiz" | "word-search"

export default function GamesPage() {
    const [view, setView] = useState<GameType>("lobby")

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Conditional Navbar or Back Button */}
            {view === "lobby" ? (
                <Navbar />
            ) : (
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
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                                Vytrixe <span className="text-blue-600">Cognitive Labs</span>
                            </h1>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Sharpen your financial mind with our AI-powered challenges.
                                Compete for the top spot on the global analyst leaderboard.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Quiz Card */}
                            <Card
                                className="group relative overflow-hidden border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer bg-white"
                                onClick={() => setView("quiz")}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="p-8 flex flex-col items-center gap-6 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                        <Brain className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-slate-900">Market IQ Quiz</h3>
                                        <p className="text-slate-500">Test your knowledge on global trends, economics, and AI technology.</p>
                                    </div>
                                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full">
                                        Start Challenge
                                    </Button>
                                </div>
                            </Card>

                            {/* Word Search Card */}
                            <Card
                                className="group relative overflow-hidden border-slate-200 hover:border-purple-200 hover:shadow-lg transition-all cursor-pointer bg-white"
                                onClick={() => setView("word-search")}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="p-8 flex flex-col items-center gap-6 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                        <Search className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-slate-900">Trend Hunter</h3>
                                        <p className="text-slate-500">Find hidden market terms in a dynamic grid generated from real-time news.</p>
                                    </div>
                                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full">
                                        Start Search
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        <div className="pt-12 border-t border-slate-200">
                            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-widest">
                                <Trophy className="w-4 h-4" /> Global Leaderboard Coming Soon
                            </div>
                        </div>
                    </div>
                )}

                {view === "quiz" && (
                    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <QuizGame />
                    </div>
                )}

                {view === "word-search" && (
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <WordSearchGame />
                    </div>
                )}
            </main>
        </div>
    )
}
