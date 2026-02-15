import { Skeleton } from "@/components/ui/skeleton"

export function HeroSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-12">
            <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-2 w-2 rounded-full bg-cyan-500/50" />
                <Skeleton className="h-4 w-48 bg-cyan-500/10" />
            </div>

            <Skeleton className="h-20 w-3/4 max-w-3xl bg-white/5" />
            <Skeleton className="h-20 w-2/3 max-w-2xl bg-white/5" />

            <div className="space-y-2 w-full max-w-lg flex flex-col items-center mt-4">
                <Skeleton className="h-4 w-full bg-slate-800/50" />
                <Skeleton className="h-4 w-5/6 bg-slate-800/50" />
            </div>

            <div className="flex gap-4 mt-8">
                <Skeleton className="h-12 w-40 rounded-none bg-white/10" />
                <Skeleton className="h-12 w-40 rounded-none bg-white/5" />
            </div>
        </div>
    )
}
