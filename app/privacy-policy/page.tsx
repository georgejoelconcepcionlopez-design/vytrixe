
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Privacy Policy | Vytrixe",
    description: "How Vytrixe collects, uses, and protects your data.",
}

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans py-20 px-4">
            <div className="container mx-auto max-w-3xl prose prose-neutral dark:prose-invert">
                <h1>Privacy Policy</h1>
                <p className="text-muted-foreground">Effective Date: February 17, 2026</p>

                <h3>1. Data Collection</h3>
                <p>We believe in data minimization. We collect only what is necessary to provide our service:</p>
                <ul>
                    <li><strong>Usage Data:</strong> We may collect anonymous analytics data (pages visited, time spent) to improve our content.</li>
                    <li><strong>Contact Information:</strong> If you subscribe to our newsletter or contact us, we store your email address solely for communication purposes.</li>
                </ul>

                <h3>2. Cookies and Tracking</h3>
                <p>We use cookies to enhance user experience and analyze traffic. You can control cookie preferences through your browser settings. We may use third-party services like Google Analytics that also utilize cookies.</p>

                <h3>3. Advertising</h3>
                <p>We may display advertisements from third-party networks (such as Google AdSense). These vendors may use cookies to serve ads based on your prior visits to our website or other websites.</p>

                <h3>4. Third-Party Links</h3>
                <p>Our articles may contain links to external sites. We are not responsible for the content or privacy practices of these third-party websites.</p>

                <h3>5. Data Security</h3>
                <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>

                <h3>6. Contact Us</h3>
                <p>If you have questions about this policy, please contact us at privacy@vytrixe.com.</p>
            </div>
        </main>
    )
}
