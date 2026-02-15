
"use client"

import { Lock } from "lucide-react"

export function ProBanner() {
    return (
        <div className="container mx-auto px-4 py-8 relative z-10">
            <div className="relative group overflow-hidden rounded-xl border border-cyan-500/30 bg-[#050814]/80 backdrop-blur-md p-6 md:p-8 text-center transition-all duration-300 hover:border-cyan-500/60 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.2)]">

                {/* Shine Effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2 md:mb-0">
                        <Lock className="h-5 w-5" />
                    </div>

                    <div className="text-left">
                        <h3 className="text-lg font-bold text-white">
                            Upgrade to Pro for Early Access Signals
                        </h3>
                        <p className="text-sm text-slate-400">
                            Get prediction alerts 4 hours before they trend virally. <span className="text-cyan-400 font-semibold">(Coming Soon)</span>
                        </p>
                    </div>

                    <div className="hidden md:block w-[1px] h-8 bg-white/10 mx-4" />

                    <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-not-allowed opacity-80">
                        Join Waitlist
                    </button>
                </div>
            </div>
        </div>
    )
}
