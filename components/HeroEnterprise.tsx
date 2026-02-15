
"use client"

import { NewsletterForm } from "./NewsletterForm"
import { Button } from "@/components/ui/button"
import { WorldMapBackground } from "./WorldMapBackground"
import { RadarOverlay } from "./RadarOverlay"
import { TrustIndicators } from "./TrustIndicators"
import { CyberGridBackground } from "./CyberGridBackground"
import Link from "next/link"
import { ArrowRight, BarChart2 } from "lucide-react"

export function HeroEnterprise() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[#02040A]">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <CyberGridBackground />
                <WorldMapBackground />
            </div>

            <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Content */}
                <div className="space-y-10 pt-10 lg:pt-0">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        v2.0 System Online
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] animate-fade-in-up [animation-delay:150ms]">
                        The Real-Time <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            Intelligence Engine
                        </span>
                        <br /> for Global Trends
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed animate-fade-in-up [animation-delay:300ms]">
                        Detect explosive trends before they go viral. Monitor US, MX, ES, and DO in real time with AI-driven predictive analytics and financial-grade infrastructure.
                    </p>

                    {/* Newsletter Capture */}
                    <div className="animate-fade-in-up [animation-delay:400ms] w-full max-w-md">
                        <NewsletterForm source="hero_section" />
                        <p className="text-xs text-slate-500 mt-2">Join 12,000+ analysts getting daily signals.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up [animation-delay:450ms]">
                        <Link href="/us">
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-gradient-to-r from-[#00C2FF] to-[#0090FF] hover:shadow-[0_0_25px_-5px_#00C2FF] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white font-bold rounded-full border-none">
                                Start Monitoring
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/us">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-slate-700 bg-white/5 backdrop-blur-sm text-slate-200 hover:text-white hover:border-primary/50 hover:bg-primary/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-full">
                                <BarChart2 className="mr-2 h-5 w-5 text-primary" />
                                View Live Dashboard
                            </Button>
                        </Link>
                    </div>

                    <div className="animate-fade-in-up [animation-delay:600ms]">
                        <TrustIndicators />
                    </div>
                </div>

                {/* Right Column: Visuals */}
                <div className="relative h-[400px] lg:h-[700px] flex items-center justify-center animate-fade-in-up [animation-delay:300ms]">
                    {/* Visual Container with Scale Animation */}
                    <div className="relative w-full h-full flex items-center justify-center animate-[float_6s_ease-in-out_infinite]">
                        {/* Radar Effect with Glow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-primary/20 animate-[spin_15s_linear_infinite_reverse] shadow-[0_0_50px_-10px_rgba(0,194,255,0.1)]" />
                            <RadarOverlay />
                        </div>

                        {/* Floating Data Nodes (Decorative) */}
                        <div className="absolute top-[20%] right-[20%] w-4 h-4 bg-blue-500 rounded-full blur-[4px] animate-pulse shadow-[0_0_20px_#3b82f6]" />
                        <div className="absolute bottom-[30%] left-[20%] w-3 h-3 bg-emerald-400 rounded-full blur-[2px] animate-bounce shadow-[0_0_15px_#34d399]" style={{ animationDuration: '4s' }} />
                        <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-purple-500 rounded-full blur-[2px] animate-ping" style={{ animationDuration: '3s' }} />
                    </div>
                </div>
            </div>
        </section>
    )
}
