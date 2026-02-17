
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Terms of Service | Vytrixe",
    description: "Terms and conditions for accessing the Vytrixe platform.",
}

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans py-20 px-4">
            <div className="container mx-auto max-w-3xl prose prose-neutral dark:prose-invert">
                <h1>Terms of Service</h1>
                <p className="text-muted-foreground">Last Updated: February 17, 2026</p>

                <h3>1. Introduction</h3>
                <p>Welcome to Vytrixe ("we," "our," or "us"). By accessing or using our website, services, and intelligence reports, you agree to be bound by these Terms of Service.</p>

                <h3>2. Intellectual Property</h3>
                <p>All content published on Vytrixe, including articles, charts, data visualizations, and code, is the exclusive property of Vytrixe AI & Market Intelligence Lab. Unauthorized reproduction or commercial redistribution is strictly prohibited.</p>

                <h3>3. Disclaimer of Financial Advice</h3>
                <p>Vytrixe is an information platform. <strong>We do not provide financial, investment, or legal advice.</strong> All content is for educational and informational purposes only. Trading financial assets involves significant risk. You are solely responsible for your investment decisions.</p>

                <h3>4. User Conduct</h3>
                <p>You agree not to misuse our services, including but not limited to: scraping our data without permission, attempting to breach our security, or using our platform for illegal activities.</p>

                <h3>5. Limitation of Liability</h3>
                <p>Vytrixe shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of our platform or reliance on any information provided.</p>

                <h3>6. Modifications</h3>
                <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of updated terms.</p>
            </div>
        </main>
    )
}
