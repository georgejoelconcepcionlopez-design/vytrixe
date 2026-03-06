import { Flame, Activity, Zap, Shield, Rocket } from "lucide-react";

export const metadata = {
    title: "About | Vytrixe",
    description: "The premier intelligence platform for AI, Tech, and Global Markets.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary uppercase tracking-wider">
                        Vytrixe Directive
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Intelligence for the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">AI Supercycle</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We filter the noise of the hype cycle to deliver high-signal intelligence for the physical and digital infrastructure powering the future.
                    </p>
                </div>

                <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 border-b border-border pb-4 flex items-center gap-2">
                        <TargetIcon className="w-6 h-6 text-primary" /> Our Mission
                    </h2>
                    <div className="prose prose-invert max-w-none text-lg leading-relaxed text-slate-300">
                        <p>
                            Vytrixe was engineered to solve a specific problem: the information asymmetry in the AI and technology markets. While mainstream media focuses on consumer applications and stock tickers, the real shifts are happening in sovereign wealth allocation, energy grid modernization, and semiconductor supply chains.
                        </p>
                        <p>
                            We utilize an array of autonomous intelligence agents to aggregate, analyze, and synthesize breaking technical and market data into actionable insights for our readership.
                        </p>
                    </div>
                </section>

                <section className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-card border border-border p-8 rounded-2xl">
                        <Zap className="w-8 h-8 text-cyan-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Signal Over Noise</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We don't publish press releases. We publish the second-order effects of those press releases on the broader macro environment.
                        </p>
                    </div>
                    <div className="bg-card border border-border p-8 rounded-2xl">
                        <Shield className="w-8 h-8 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Institutional Grade</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Written for the architects of capital and code. Our analysis assumes a high baseline of technical and financial literacy.
                        </p>
                    </div>
                </section>

            </div>
        </main>
    );
}

function TargetIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    )
}
