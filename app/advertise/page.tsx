import { Flame, Target, Users, Zap, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Advertise | Vytrixe",
    description: "Reach decision-makers in AI, Tech, and Global Markets.",
};

export default function AdvertisePage() {
    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Reach the <span className="text-primary">Architects</span><br /> of Tomorrow
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Vytrixe commands an audience of decision-makers, engineers, and strategists actively allocating capital to the AI and technology supercycle.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-card border border-border p-8 rounded-2xl flex flex-col items-center text-center">
                        <Users className="w-12 h-12 text-secondary mb-4" />
                        <h3 className="text-3xl font-bold mb-2">2.5M+</h3>
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Monthly Readers</span>
                    </div>
                    <div className="bg-card border border-border p-8 rounded-2xl flex flex-col items-center text-center">
                        <Target className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-3xl font-bold mb-2">68%</h3>
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Decision Makers</span>
                    </div>
                    <div className="bg-card border border-border p-8 rounded-2xl flex flex-col items-center text-center">
                        <Zap className="w-12 h-12 text-cyan-400 mb-4" />
                        <h3 className="text-3xl font-bold mb-2">Top 5</h3>
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">B2B Intent Score</span>
                    </div>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 p-8 md:p-12 rounded-2xl mb-20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-4">Sponsorship Opportunities</h2>
                        <p className="text-muted-foreground mb-6">
                            From high-impact display takeovers to native intelligence briefings and newsletter sponsorships, we provide the canvas for your strategic narrative.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Premium Display Banners (Adsterra, Direct)</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Sponsored Intelligence Reports</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Daily Newsletter Sponsorship</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Custom Content Clusters</li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <Link href="/contact" className="w-full py-4 bg-primary text-primary-foreground text-center font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                            Get Media Kit <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
