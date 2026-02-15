
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Editorial Policy | Vytrixe",
    description: "Our standards for accuracy, AI transparency, and independence.",
}

export default function EditorialPolicyPage() {
    return (
        <main className="min-h-screen bg-[#02040A] text-white selection:bg-cyan-500/30 py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8 text-white">Editorial Policy & Standards</h1>

                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400">
                    <p className="lead text-xl text-slate-300">
                        Trust is the currency of intelligence. Our editorial process is designed to rigor, accuracy, and speed.
                    </p>

                    <section className="mb-12">
                        <h3>1. Accuracy & Fact-Checking</h3>
                        <p>
                            Every trend signal is triaged through a multi-stage verification process. While our initial detection is automated via algorithms monitoring search velocity and API signals, all "Insight" level reports are reviewed by human analysts for context and accuracy.
                        </p>
                        <p>
                            We do not publish rumors without clear attribution and verification. Correction requests are processed within 24 hours at <a href="mailto:corrections@vytrixe.com" className="text-cyan-400 hover:underline">corrections@vytrixe.com</a>.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h3>2. AI Transparency Statement</h3>
                        <p>
                            Vytrixe uses Artificial Intelligence to:
                        </p>
                        <ul>
                            <li>Parse large datasets and identify anomalies.</li>
                            <li>Draft initial summaries of data-heavy reports.</li>
                            <li>Structure metadata and classification tags.</li>
                        </ul>
                        <p>
                            However, <strong>AI does not have final editorial authority</strong>. All strategic analysis, predictions, and "Why it matters" segments are crafted or reviewed by domain experts. Content generated primarily by AI is labeled as "Automated Intelligence Brief".
                        </p>
                    </section>

                    <section className="mb-12">
                        <h3>3. Independence & Conflicts of Interest</h3>
                        <p>
                            Vytrixe is an independent publication. Our editorial coverage is not influenced by our advertisers. Sponsored content is clearly labeled as "Partner Content" or "Sponsored".
                        </p>
                        <p>
                            Our analysts are prohibited from trading on non-public information derived from our proprietary datasets before it is released to subscribers.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h3>4. Data Sources</h3>
                        <p>
                            We aggregate public data from:
                        </p>
                        <ul>
                            <li>Search Engine public API trends.</li>
                            <li>Social Media public firehose data (authorized partners).</li>
                            <li>Government open data portals (Census, Bureau of Labor Statistics).</li>
                            <li>Authorized third-party data vendors.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    )
}
