
import { Zap } from 'lucide-react'

export function VelocityBadge({ score }: { score: number }) {
    // Dynamically calculate color based on velocity
    const getIntensity = (s: number) => {
        if (s > 95) return 'text-rose-500 border-rose-500/30 bg-rose-500/10'
        if (s > 80) return 'text-orange-500 border-orange-500/30 bg-orange-500/10'
        if (s > 50) return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
        return 'text-slate-400 border-white/5 bg-white/5'
    }

    const intensityClass = getIntensity(score)
    const velocityVal = (score * 1.5).toFixed(0)

    return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-tighter ${intensityClass}`}>
            <Zap className={`h-3 w-3 ${score > 80 ? 'fill-current' : ''}`} />
            Velocity: {velocityVal}v/m
        </div>
    )
}
