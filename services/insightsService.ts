
export interface InsightPost {
    slug: string
    title: string
    excerpt: string
    content_html: string
    published_at: string
    author: string
    tags: string[]
}

const MOCK_INSIGHTS: InsightPost[] = [
    {
        slug: "how-trends-go-viral",
        title: "The Anatomy of Virality: How Trends Explode in 2026",
        excerpt: "Understanding the algorithmic triggers that turn a micro-moment into a global phenomenon.",
        published_at: "2026-01-15T10:00:00Z",
        author: "Dr. Elena Vance, Data Scientist",
        tags: ["Algorithms", "Social Media", "Velocity"],
        content_html: `
            <h2>The Mathematics of Momentum</h2>
            <p>Virality isn't magic; it's math. At Vytrixe, we've analyzed over 500,000 viral events to decode the velocity curve. It starts with the <strong>Alpha Spark</strong>—a sudden 300% spike in engagement within the first 15 minutes.</p>
            <h3>The Cross-Platform Echo</h3>
            <p>True virality requires platform bridging. A trend starting on TikTok must migrate to X (formerly Twitter) within 2 hours to sustain 'Escape Velocity'. Our engines look specifically for this migration pattern.</p>
            <h2>Predicting the Peak</h2>
            <p>Most trends follow a Gamma distribution. By measuring the 'Acceleration Factor' (the second derivative of engagement volume), we can predict the peak 4-6 hours before it happens.</p>
        `
    },
    {
        slug: "real-time-intelligence",
        title: "Why Real-Time Intelligence Beats Historical Data",
        excerpt: "In a world where news cycles last minutes, 24-hour delayed reports are obsolete.",
        published_at: "2026-02-01T09:30:00Z",
        author: "Marcus Thorne, Chief Analyst",
        tags: ["Intelligence", "Strategy", "Real-Time"],
        content_html: `
            <h2>The Lag Problem</h2>
            <p>Traditional market research reports what happened yesterday. In high-frequency trading and viral media, 'yesterday' might as well be a decade ago.</p>
            <h3>The Vytrixe Advantage</h3>
            <p>Our systems poll data endpoints every 60 seconds. This allows us to detect anomalies—like a sudden surge in search volume for a specific sneaker brand in Mexico—while competitor dashboards are still rendering yesterday's averages.</p>
        `
    },
    {
        slug: "sports-momentum-modeling",
        title: "Predicting Sports Outcomes via Crowd Sentiment",
        excerpt: "Can millions of fan tweets predict the outcome of a match? The data says yes.",
        published_at: "2026-02-10T14:15:00Z",
        author: "Sarah Jenkins, Sports Lead",
        tags: ["Sports", "Predictive Models", "Case Study"],
        content_html: `
            <h2>The Wisdom of the Crowd</h2>
            <p>During the Copa America, we noticed a correlation between 'Confidence Sentiment' in pre-match chatter and actual team performance. </p>
            <h3>Sentiment Velocity</h3>
            <p>When fan sentiment enters a 'Panic Cascade' (rapid negative acceleration per minute), the on-field team performance often degrades within the next 10 minutes. It's a psychological feedback loop amplified by social media.</p>
        `
    }
]

export async function fetchAllInsights(): Promise<InsightPost[]> {
    return MOCK_INSIGHTS
}

export async function fetchInsight(slug: string): Promise<InsightPost | null> {
    return MOCK_INSIGHTS.find(p => p.slug === slug) || null
}
