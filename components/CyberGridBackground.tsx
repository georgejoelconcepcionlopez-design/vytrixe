
"use client"

export function CyberGridBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* 
        1. Base Gradient Layer 
        Deep space blue/black base for seamless blending
      */}
            <div className="absolute inset-0 bg-[#02040A]" />

            {/* 
        2. Cyber Perspective Grid 
      */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px),
                              linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, transparent 5%, black 40%, black 70%, transparent 95%)',
                    transform: 'perspective(500px) rotateX(60deg) scale(2)',
                    transformOrigin: 'top center',
                }}
            />

            {/* 
        3. Vertical Light Beams (New)
        Subtle rising columns of light to create scale/depth.
      */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute bottom-0 left-[10%] w-[1px] h-[60%] bg-gradient-to-t from-blue-500/50 to-transparent blur-[2px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-0 right-[20%] w-[2px] h-[50%] bg-gradient-to-t from-cyan-500/30 to-transparent blur-[3px] animate-pulse" style={{ animationDuration: '12s' }} />
                <div className="absolute bottom-0 left-[40%] w-[1px] h-[40%] bg-gradient-to-t from-indigo-500/40 to-transparent blur-[2px] animate-pulse" style={{ animationDuration: '15s' }} />
            </div>

            {/* 
        4. Global Radar Sweep (New)
        A large rotating gradient to simulate a world scan.
      */}
            <div
                className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] origin-center opacity-[0.03] pointer-events-none"
                style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, rgba(0, 194, 255, 0.4) 360deg)',
                    animation: 'spin 20s linear infinite'
                }}
            />

            {/* 
        5. Moving Particles
      */}
            <div className="absolute inset-0 opacity-30 animate-pulse">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" />
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-bounce" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8] animate-ping" style={{ animationDuration: '7s' }} />

                <div className="absolute top-[15%] left-[80%] w-[2px] h-[2px] bg-white rounded-full opacity-50" />
            </div>

            {/* 
        6. Soft Radial Glow
      */}
            <div
                className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[100px]"
                style={{
                    background: 'radial-gradient(circle, rgba(0,194,255,0.4) 0%, rgba(2,4,10,0) 70%)'
                }}
            />

            {/* 
        7. Vignette
      */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02040A_100%)] opacity-80" />
        </div>
    )
}
