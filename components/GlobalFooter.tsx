
import Link from 'next/link'
import { Globe, Cpu, TrendingUp, Twitter, Linkedin, Github, ShieldCheck, Mail, Zap, Lock } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { AdPlaceholder } from '@/components/AdPlaceholder'

export function GlobalFooter() {
    return (
        <footer className="bg-[#02040A] border-t border-white/5 pt-20 pb-12 font-sans">
            <div className="container mx-auto px-4">

                {/* Brand Header */}
                <div className="mb-16">
                    <Link href="/" className="inline-block group mb-6">
                        <Logo variant="default" size="lg" />
                    </Link>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xl">
                        VYTRIXE is a global technology and market intelligence platform delivering real-time insights across AI, Tech, Startups, and Crypto.
                    </p>
                </div>

                {/* Footer Ad Placement */}
                <AdPlaceholder slot="footer-slot-789" className="mb-16 min-h-[90px]" />

                {/* 4-Column Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-20">

                    {/* Column 1: Markets */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">Markets</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">About VYTRIXE</Link></li>
                            <li><Link href="/markets" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Global Markets</Link></li>
                            <li><Link href="/category/ai" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">AI Intelligence</Link></li>
                            <li><Link href="/category/tech" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Technology</Link></li>
                            <li><Link href="/category/startups" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Startups</Link></li>
                            <li><Link href="/category/crypto" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Crypto Assets</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Platform */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">Platform</h4>
                        <ul className="space-y-3">
                            <li><Link href="/insights" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Deep Insights</Link></li>
                            <li><Link href="/breaking" className="text-sm text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> Live Coverage</Link></li>
                            <li><Link href="/newsletter" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Newsletter</Link></li>
                            <li><Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">My Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: VYTRIXE PRO */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 flex items-center gap-2">Vytrixe Pro <Lock className="h-3 w-3" /></h4>
                        <ul className="space-y-3">
                            <li><Link href="/pro" className="text-sm text-white hover:text-cyan-400 transition-colors font-bold flex items-center gap-2">Upgrade Now <Zap className="h-3 w-3 text-cyan-500" /></Link></li>
                            <li><span className="text-sm text-slate-500 font-medium cursor-not-allowed">Ad-Free Experience</span></li>
                            <li><span className="text-sm text-slate-500 font-medium cursor-not-allowed">Premium Signals</span></li>
                            <li><span className="text-sm text-slate-500 font-medium cursor-not-allowed">API Access</span></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Contact */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Legal</h4>
                        <ul className="space-y-3">
                            <li><Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Terms of Service</Link></li>
                            <li><Link href="/cookie-policy" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Cookie Policy</Link></li>
                            <li><Link href="/editorial-policy" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Editorial Policy</Link></li>
                            <li><Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors font-medium mt-4 block">Contact Support</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Systems Operational
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-slate-600 font-bold text-[10px] uppercase tracking-widest">
                            <ShieldCheck className="h-3 w-3" />
                            SSL Secured
                        </div>
                    </div>

                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                        &copy; 2026 VYTRIXE Intelligence. All rights reserved.
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="#" className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a href="#" className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            <Linkedin className="h-4 w-4" />
                        </a>
                        <a href="#" className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            <Github className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
