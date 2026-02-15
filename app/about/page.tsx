
import { Metadata } from 'next'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ShieldCheck, Cpu, Globe } from "lucide-react"

export const metadata: Metadata = {
    title: "About Vytrixe | The Intelligence Engine",
    description: "Vytrixe combines AI velocity tracking with human expertise to detect global viral trends before they explode.",
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#02040A] text-white selection:bg-cyan-500/30 pb-20">
            {/* Hero */}
            <section className="relative py-24 bg-[#050814] overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#02040A] to-[#02040A] pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <Badge variant="outline" className="mb-4 text-cyan-400 border-cyan-500/30">Our Mission</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Democratizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Global Intelligence</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        In an era of information overload, Vytrixe serves as the signal in the noise. We build financial-grade analytics tools for the creator economy, distinguishing true viral velocity from fleeting spikes.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Cpu className="h-8 w-8 text-cyan-400" />,
                            title: "AI-First Velocity",
                            desc: "Our proprietary algorithms process 500M+ signals daily to predict trend trajectories with 94% accuracy."
                        },
                        {
                            icon: <Globe className="h-8 w-8 text-blue-400" />,
                            title: "Global Context",
                            desc: "A trend in Mexico is often a precursor to a movement in Spain. We map cross-border cultural arbitrage opportunities."
                        },
                        {
                            icon: <ShieldCheck className="h-8 w-8 text-emerald-400" />,
                            title: "Radical Integrity",
                            desc: "We prioritize verified data over clickbait. If our systems can't validate a source, we don't report it."
                        }
                    ].map((item, i) => (
                        <Card key={i} className="bg-white/[0.02] border-white/5 hover:border-white/10 transition-colors">
                            <CardContent className="p-8">
                                <div className="mb-6 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center border border-white/10">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Methodology & Story */}
            <section className="container mx-auto px-4 max-w-4xl space-y-16">
                <div className="prose prose-invert prose-lg max-w-none">
                    <h2 className="text-3xl font-bold text-white mb-6">The "Blackbox" Problem</h2>
                    <p className="text-slate-300">
                        Traditional market research is too slow. Social listening tools are too noisy.
                        Vytrixe was founded in 2024 by a team of ex-fintech data scientists who realized that the same models used to track stock momentum could be applied to cultural trends.
                    </p>
                    <p className="text-slate-300">
                        We don't just count likes. We measure <strong>acceleration</strong> (the second derivative of engagement). This allows us to spot the "Alpha Spark" consistent with viral breakouts hours before mainstream discovery.
                    </p>
                </div>

                <div className="bg-gradient-to-r from-cyan-950/30 to-blue-950/30 rounded-2xl p-8 border border-cyan-500/20">
                    <h3 className="text-2xl font-bold text-white mb-4">Our Commitment to Transparency</h3>
                    <ul className="space-y-4">
                        {[
                            "We clearly label AI-assisted analysis vs. human reporting.",
                            "We disclose data confidence intervals for all predictions.",
                            "We maintain strict separation between editorial content and advertising."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300">
                                <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-12 border-t border-white/5">
                    <h2 className="text-3xl font-bold text-white mb-6">The Vytrixe Editorial Desk</h2>
                    <p className="text-slate-300 leading-relaxed mb-6">
                        While our technology provides the speed, our <strong>Vytrixe Editorial Desk</strong> provides the context. Composed of veteran market analysts and cultural strategists, this central body oversees all automated outputs, ensuring every report meets our rigorous standards for accuracy and nuance.
                    </p>
                    <p className="text-slate-400 text-sm">
                        All official reports are published under the "Vytrixe Editorial Desk" byline, representing our collective intelligence.
                    </p>
                </div>
            </section>
        </main>
    )
}
