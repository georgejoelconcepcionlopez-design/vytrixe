import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Cookie Policy | Vytrixe Intelligence',
    description: 'Cookie Policy for Vytrixe Intelligence. Understand how we use cookies to improve your experience.',
    alternates: {
        canonical: 'https://vytrixe.com/cookie-policy',
    },
}

export default function CookiePolicy() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <main className="min-h-screen bg-[#0B0F14] text-slate-300 font-sans pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Cookie Policy</h1>
                <p className="mb-12 text-slate-400">Last Updated: {lastUpdated}</p>

                <div className="space-y-8 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies</h2>
                        <p>
                            Cookies are small text files that are sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. How Vytrixe Uses Cookies</h2>
                        <p className="mb-4">
                            When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Essential cookies:</strong> To enable certain functions of the Service.</li>
                            <li><strong>Analytics cookies:</strong> To provide analytics and better understand how our services are used.</li>
                            <li><strong>Advertising cookies:</strong> To enable advertisements delivery, including behavioral advertising.</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Cookies & AdSense</h2>
                        <p className="mb-4">
                            In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
                        </p>
                        <p>
                            Google, as a third-party vendor, uses cookies to serve ads on your site. Google's use of the DART cookie enables it to serve ads to your users based on their visit to your sites and other sites on the Internet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Your Choices Regarding Cookies</h2>
                        <p>
                            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
                        </p>
                        <p className="mt-4 text-sm text-slate-400">
                            Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}
