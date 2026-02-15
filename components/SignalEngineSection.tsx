
"use client"

import { CheckCircle2 } from "lucide-react"

export function SignalEngineSection() {
    return (
        <section className="py-24 bg-[#02040A] relative overflow-hidden border-y border-white/5">
            {/* Background Tech Gird */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Technical Specs */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center rounded bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-400 border border-cyan-500/20">
                            CORE_SYSTEM_V2
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
                                Vytrixe Signal Engine
                            </h2>
                            <p className="text-xl text-cyan-400/80 font-mono">Multi-layer AI detection model</p>
                        </div>

                        <p className="text-slate-400 text-lg leading-relaxed">
                            Our proprietary engine processes 500M+ signals daily to isolate true breakout velocity from background noise.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Search Acceleration Tracking",
                                "Engagement Spike Detection",
                                "Cross-Platform Velocity Correlation",
                                "Geo Momentum Mapping"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="h-5 w-5 text-cyan-500" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column: Abstract Data Visualization */}
                    <div className="relative h-[400px] w-full bg-[#050814] rounded-xl border border-white/10 overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
                        {/* Header Bar */}
                        <div className="absolute top-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                            <div className="w-2 h-2 rounded-full bg-green-500/50" />
                        </div>

                        {/* Visualization Container */}
                        <div className="absolute inset-0 top-8 p-8 flex items-end justify-center gap-4 md:gap-8">
                            {/* Bar 1 */}
                            <div className="w-12 md:w-16 bg-gradient-to-t from-cyan-900/20 to-cyan-500/20 border border-cyan-500/30 rounded-t-sm relative group overflow-hidden animate-[pulse_4s_ease-in-out_infinite]">
                                <div className="absolute bottom-0 w-full bg-cyan-500/40 transition-all duration-1000 animate-[bounce_3s_infinite]" style={{ height: '45%' }} />
                                <div className="absolute top-0 w-full h-[1px] bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                            </div>

                            {/* Bar 2 (Main) */}
                            <div className="w-12 md:w-16 bg-gradient-to-t from-purple-900/20 to-purple-500/20 border border-purple-500/30 rounded-t-sm relative group overflow-hidden animate-[pulse_5s_ease-in-out_infinite]">
                                <div className="absolute bottom-0 w-full bg-purple-500/40 transition-all duration-1000 animate-[bounce_4s_infinite]" style={{ height: '75%' }} />
                                <div className="absolute top-0 w-full h-[1px] bg-purple-400 shadow-[0_0_10px_#a855f7]" />
                            </div>

                            {/* Bar 3 */}
                            <div className="w-12 md:w-16 bg-gradient-to-t from-green-900/20 to-green-500/20 border border-green-500/30 rounded-t-sm relative group overflow-hidden animate-[pulse_6s_ease-in-out_infinite]">
                                <div className="absolute bottom-0 w-full bg-green-500/40 transition-all duration-1000 animate-[bounce_5s_infinite]" style={{ height: '60%' }} />
                                <div className="absolute top-0 w-full h-[1px] bg-green-400 shadow-[0_0_10px_#22c55e]" />
                            </div>
                        </div>

                        {/* Overlay Scan Line */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[20%] w-full animate-[scan_4s_linear_infinite]" />

                        {/* Floating Data Points */}
                        <div className="absolute top-1/3 left-1/4 px-2 py-1 bg-black/80 text-[10px] font-mono text-cyan-400 border border-cyan-500/30 rounded backdrop-blur animate-pulse">
                            VEL: +84%
                        </div>
                        <div className="absolute top-1/2 right-1/4 px-2 py-1 bg-black/80 text-[10px] font-mono text-purple-400 border border-purple-500/30 rounded backdrop-blur animate-pulse delay-75">
                            ACCEL: HIGH
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
