
import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { CheckCircle2, Zap, BarChart2, Lock } from "lucide-react"

export const metadata: Metadata = {
    title: "Vytrixe PRO | Advanced Intelligence",
    description: "Unlock institutional-grade trend analytics, data exports, and early alerts.",
}

export default function ProPage() {
    return (
        <main className="min-h-screen bg-[#02040A] text-white selection:bg-cyan-500/30">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#02040A] to-[#02040A]" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-400 mb-6">
                        <Zap className="mr-2 h-3 w-3" />
                        Professional Tier
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                        See the Future <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Before It Happens</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
                        Get 48-hour early access to viral trend signals, raw data exports, and ad-free browsing.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold h-14 px-8 rounded-full">
                            Upgrade to PRO
                        </Button>
                        <Button size="lg" variant="outline" className="border-slate-700 hover:bg-white/5 text-white h-14 px-8 rounded-full">
                            View Sample Report
                        </Button>
                    </div>
                </div>
            </section>

            {/* Pricing Card */}
            <section className="container mx-auto px-4 pb-24">
                <div className="max-w-md mx-auto bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold">Analyst Access</h3>
                        <p className="text-slate-400">For creators and market researchers.</p>
                    </div>
                    <div className="flex items-baseline mb-8">
                        <span className="text-5xl font-bold">$29</span>
                        <span className="text-slate-500 ml-2">/month</span>
                    </div>

                    <ul className="space-y-4 mb-8">
                        {[
                            "Unlimited Search Velocity Data",
                            "Ad-Free Experience",
                            "Daily Alpha Alerts (Email)",
                            "CSV Data Exports",
                            "Priority API Access"
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                                <span className="text-slate-300">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold h-12 rounded-xl">
                        Start 7-Day Free Trial
                    </Button>
                    <p className="text-center text-xs text-slate-500 mt-4">Cancel anytime. Secure payment via Stripe.</p>
                </div>
            </section>

            {/* Enterprise Teaser */}
            <section className="container mx-auto px-4 py-12 border-t border-white/5 text-center">
                <h4 className="text-slate-400 mb-4 flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" /> Need Enterprise API access?
                </h4>
                <a href="mailto:sales@vytrixe.com" className="text-cyan-400 hover:underline">Contact Sales</a>
            </section>
        </main>
    )
}
