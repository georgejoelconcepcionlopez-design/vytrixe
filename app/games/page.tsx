import { Navbar } from "@/components/Navbar";

export default function GamesPage() {
    return (
        <div className="container mx-auto py-20 px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Juegos Mentales
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
                Sharpen your mind with our AI-powered cognitive challenges.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder Game Cards */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-colors">
                        <div className="h-40 bg-black/20 rounded-md mb-4 flex items-center justify-center">
                            <span className="text-4xl">🧩</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Cognitive Test {i}</h3>
                        <p className="text-sm text-slate-400">Coming Soon</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
