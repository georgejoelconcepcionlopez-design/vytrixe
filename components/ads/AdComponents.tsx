import { cn } from "@/lib/utils"

export function AdBanner({ className }: { className?: string }) {
    return (
        <div className={cn("w-full bg-card border border-border/50 rounded flex flex-col items-center justify-center text-muted-foreground/40 text-xs font-mono tracking-widest min-h-[90px] overflow-hidden relative", className)}>
            <span className="relative z-10">AdBanner Placeholder</span>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)]"></div>
        </div>
    )
}

export function AdInline({ className }: { className?: string }) {
    return (
        <div className={cn("w-full max-w-2xl mx-auto bg-card border border-border/50 rounded flex flex-col items-center justify-center text-muted-foreground/40 text-xs font-mono tracking-widest my-8 min-h-[250px] overflow-hidden relative", className)}>
            <span className="relative z-10">AdInline Placeholder</span>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(0,229,255,0.02)_10px,rgba(0,229,255,0.02)_20px)]"></div>
        </div>
    )
}

export function AdSidebar({ className }: { className?: string }) {
    return (
        <div className={cn("w-full bg-card border border-border/50 rounded flex flex-col items-center justify-center text-muted-foreground/40 text-xs font-mono tracking-widest min-h-[600px] overflow-hidden relative", className)}>
            <span className="relative z-10 text-center">AdSidebar<br />Placeholder</span>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,20,0.05)_0%,transparent_70%)]"></div>
        </div>
    )
}

export function AdNative({ className }: { className?: string }) {
    return (
        <div className={cn("w-full bg-background border border-border/50 rounded p-4 flex gap-4 text-muted-foreground/40 text-xs font-mono tracking-widest relative overflow-hidden", className)}>
            <div className="w-24 h-24 bg-card rounded shrink-0 flex items-center justify-center">IMG</div>
            <div className="flex flex-col justify-center space-y-2 flex-1">
                <div className="h-4 bg-card rounded w-3/4"></div>
                <div className="h-3 bg-card rounded w-full"></div>
                <div className="h-3 bg-card rounded w-5/6"></div>
                <span className="text-[10px] text-primary self-end mt-2">Sponsored</span>
            </div>
        </div>
    )
}
