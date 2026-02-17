
import { Metadata } from 'next'
import { Terminal, Shield, Globe, Cpu } from 'lucide-react'

export const metadata: Metadata = {
    title: "About Vytrixe | Global Intelligence Lab",
    description: "Vytrixe is an independent strategic intelligence platform analyzing the intersection of artificial intelligence, capital markets, and sovereign infrastructure.",
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Decoding the <span className="text-primary">Machine Age</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Vytrixe is an independent strategic intelligence lab. We provide institutional-grade analysis on the rapid evolution of AI infrastructure, global capital flows, and the geopolitics of compute.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary rounded-lg"><Terminal className="w-6 h-6 text-primary" /></div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Technical Depth</h3>
                                <p className="text-muted-foreground">We look beyond the hype. Our analysis focuses on the physical constraints of the AI supply chain—energy, thermal, and packaging.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary rounded-lg"><Globe className="w-6 h-6 text-blue-400" /></div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Global Perspective</h3>
                                <p className="text-muted-foreground">Technology does not exist in a vacuum. We track sovereign AI initiatives and the shifting alliances of the semiconductor trade.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary rounded-lg"><Cpu className="w-6 h-6 text-purple-400" /></div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Market Signals</h3>
                                <p className="text-muted-foreground">We correlate technological breakthroughs with market movements, providing a clear signal in a noisy information landscape.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary rounded-lg"><Shield className="w-6 h-6 text-green-400" /></div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Zero Noise</h3>
                                <p className="text-muted-foreground">No clickbait. No rumors. Just verified intelligence and strategic outlooks for decision-makers.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-16 text-center">
                    <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        To build the terminal for the next industrial revolution. Vytrixe aims to be the definitive source of truth for the AI economy, bridging the gap between Silicon Valley engineering and Wall Street capital.
                    </p>
                </div>
            </div>
        </main>
    )
}
