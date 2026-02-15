import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | Vytrixe Intelligence',
    description: 'Privacy Policy for Vytrixe Intelligence. Learn how we collect, use, and protect your data.',
    alternates: {
        canonical: 'https://vytrixe.com/privacy-policy',
    },
}

export default function PrivacyPolicy() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <main className="min-h-screen bg-[#0B0F14] text-slate-300 font-sans pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Privacy Policy</h1>
                <p className="mb-12 text-slate-400">Last Updated: {lastUpdated}</p>

                <div className="space-y-8 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            Welcome to Vytrixe Intelligence ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our products and services (collectively, "Products"). This policy outlines our data handling practices and your rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Data Collection & Usage</h2>
                        <p className="mb-4">
                            We collect information to provide better services to all our users. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>Usage Data:</strong> Information about how you use our website, such as pages visited, time spent, and navigation paths.</li>
                            <li><strong>Device Information:</strong> We may collect information about the device you use to access Vytrixe, including the hardware model, operating system, and unique device identifiers.</li>
                            <li><strong>Cookies:</strong> We use cookies to store user preferences and track user trends.</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">3. Advertising & Google AdSense</h2>
                        <p className="mb-4">
                            We use third-party vendors, including Google, to serve ads based on your prior visits to our website or other websites.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to Vytrixe and/or other sites on the Internet.</li>
                            <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Google Ads Settings</a>.</li>
                            <li>Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">www.aboutads.info</a>.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Google Analytics</h2>
                        <p className="mb-4">
                            We use Google Analytics to understand how visitors engage with our site. Google Analytics uses cookies to collect information such as how often users visit this site, what pages they visit when they do so, and what other sites they used prior to coming to this site. We use the information we get from Google Analytics only to improve this site. Google Analytics collects only the IP address assigned to you on the date you visit this site, rather than your name or other identifying information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Protection Rights</h2>
                        <p className="mb-4">
                            Depending on your location, you may have the following rights:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>The right to access – You have the right to request copies of your personal data.</li>
                            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:contact@vytrixe.com" className="text-cyan-400 hover:underline">contact@vytrixe.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}
