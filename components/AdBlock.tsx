export default function AdBlock({ position }: { position: string }) {
    return (
        <div className="my-8 w-full">
            <div className="relative bg-white/[0.02] border border-white/5 rounded-xl h-24 md:h-32 flex flex-col items-center justify-center overflow-hidden">
                {/* AdSense Placeholder */}
                <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                </div>

                <div className="text-[10px] font-black tracking-[0.2em] text-cyan-500/20 uppercase mb-2">
                    Advertisement Space
                </div>
                <div className="text-[8px] font-mono text-slate-600 uppercase">
                    Slot: {position}
                </div>

                {/* Glowing background hint */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent opacity-30" />
            </div>
        </div>
    );
}
