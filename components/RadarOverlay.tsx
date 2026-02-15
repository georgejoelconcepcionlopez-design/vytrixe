
"use client"

export function RadarOverlay() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.08]">
            <div className="relative w-[600px] h-[600px] rounded-full border border-primary/30">
                <div className="absolute inset-0 rounded-full border border-primary/20 scale-[0.8]" />
                <div className="absolute inset-0 rounded-full border border-primary/10 scale-[0.6]" />
                <div className="absolute inset-0 rounded-full border border-primary/5 scale-[0.4]" />

                {/* Scanning Line */}
                <div className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-primary origin-left animate-[spin_4s_linear_infinite]"
                    style={{ transformOrigin: "0% 50%" }}
                />
                <div className="absolute top-1/2 left-1/2 w-1/2 h-12 bg-gradient-to-t from-transparent to-primary/10 origin-left animate-[spin_4s_linear_infinite]"
                    style={{ transformOrigin: "0% 50%", filter: 'blur(8px)', transform: 'rotate(-20deg)' }}
                />
            </div>
        </div>
    )
}
