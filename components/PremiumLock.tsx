
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PremiumLock() {
    return (
        <div className="relative mt-8">
            {/* Blurred Content Placeholder */}
            <div className="space-y-4 filter blur-sm select-none opacity-50 pointer-events-none" aria-hidden="true">
                <p>The strategic implications of this development are far-reaching. Industry analysts predict a shift in market dynamics as key players adjust their portfolios to align with the new regulatory framework.</p>
                <p>Furthermore, early adoption metrics suggest a higher-than-anticipated uptake among enterprise clients, validating the core hypothesis of the initial rollout. This trend is expected to accelerate over the coming quarters.</p>
                <p>Investors should closely monitor the quarterly earnings reports for validated confirmation of these growth vectors. The integration of AI-driven analytics will likely provide a competitive edge.</p>
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-background/90 z-10 p-6 text-center">
                <div className="bg-background/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md mx-auto">
                    <div className="h-12 w-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-cyan-500/30">
                        <Lock className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Vytrixe Pro Exclusive</h3>
                    <p className="text-slate-400 mb-6 text-sm">
                        Unlock this premium deep-dive analysis and gain access to our full suite of market intelligence tools.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/pro">
                            <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold">
                                Upgrade to Pro
                            </Button>
                        </Link>
                        <p className="text-xs text-slate-500">
                            Already a member? <Link href="/login" className="text-cyan-400 hover:underline">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
