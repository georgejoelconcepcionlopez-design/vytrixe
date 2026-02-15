import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of Service | Vytrixe Intelligence',
    description: 'Terms of Service for Vytrixe Intelligence. Read our terms regarding usage, intellectual property, and liability.',
    alternates: {
        canonical: 'https://vytrixe.com/terms-of-service',
    },
}

export default function TermsOfService() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <main className="min-h-screen bg-[#0B0F14] text-slate-300 font-sans pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Terms of Service</h1>
                <p className="mb-12 text-slate-400">Last Updated: {lastUpdated}</p>

                <div className="space-y-8 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using Vytrixe Intelligence ("Vytrixe"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property</h2>
                        <p>
                            The Site and its original content, features, and functionality are owned by Vytrixe and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                        </p>
                    </section>

                    <section className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">3. No Financial Advice Disclaimer</h2>
                        <p className="mb-4">
                            The content provided on Vytrixe is for informational and educational purposes only. It does not constitute financial, investment, legal, or tax advice.
                        </p>
                        <p>
                            You should not make any financial decision based on the information presented on this site without conducting your own due diligence and consulting with a qualified professional financial advisor. Vytrixe assumes no responsibility for any investment decisions made by users.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                        <p>
                            In no event shall Vytrixe, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at: <a href="mailto:contact@vytrixe.com" className="text-cyan-400 hover:underline">contact@vytrixe.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}
