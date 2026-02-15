import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const GEN_CONTENT_JSON = (title: string, focus: string) => JSON.stringify({
    introduction: `The landscape of ${focus} is undergoing a seismic shift in 2025. As institutional capital floods into the sector, the disparity between market leaders and legacy players is widening at an unprecedented rate.`,
    word_count: 1450,
    velocity_score: (Math.random() * (99.9 - 85.0) + 85.0).toFixed(1),
    sections: [
        {
            heading: "Why This Matters",
            content: "For enterprise decision-makers, this trend represents a critical inflection point. Implementation of this technology is projected to cut operational costs by 40% for median-sized enterprises within the next 18 months."
        },
        {
            heading: "Market Impact & 2025 Outlook",
            content: "Analysts project a CAGR of over 22% for this vertical. The key driver is no longer just 'innovation' but 'integration'—how rapidly companies can deploy these tools to cut costs. Revenue impact is projected to add $400B to global GDP this year."
        },
        {
            heading: "Investment Thesis",
            content: "For investors, the strategy should focus on 'pick-and-shovel' infrastructure plays rather than speculative applications. Companies building the underlying compute and data layers are poised for sustainable growth."
        },
        {
            heading: "Enterprise Strategy",
            content: "CIOs must prioritize data sovereignty and governance. The 'wait and see' approach is effectively a decision to become obsolete in a market moving at this velocity."
        }
    ],
    faq: [
        { question: "How does this affect stock prices?", answer: "Short term volatility is expected, but long term fundamentals point to a supercycle." },
        { question: "Is it too late to invest?", answer: "We are currently in the early majority phase, suggesting significant upside remains." }
    ]
});

const articles = [
    // 5 PILLAR ARTICLES
    {
        title: "AI Market 2025 Forecast: Why the $1.8 Trillion Valuation is Just the Beginning",
        category: "ai",
        revenue_focus: "high-cpm",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80",
        content: GEN_CONTENT_JSON("AI Market Growth", "Artificial Intelligence")
    },
    {
        title: "Nvidia Revenue Outlook: The Blackwell Chip Supercycle Explained",
        category: "tech",
        revenue_focus: "investing",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
        content: GEN_CONTENT_JSON("Nvidia's Blackwell Architecture", "Semiconductor Infrastructure")
    },
    {
        title: "OpenAI Enterprise: How the Fortune 500 is Deploying GPT-5 Models",
        category: "ai",
        revenue_focus: "enterprise",
        image: "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80",
        content: GEN_CONTENT_JSON("GPT-5 Deployment", "Generative AI")
    },
    {
        title: "Top 5 AI Stocks to Buy in 2025: Beyond the Magnificent Seven",
        category: "finance",
        revenue_focus: "investing",
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80",
        content: GEN_CONTENT_JSON("Undervalued AI Stocks", "Equity Markets")
    },
    {
        title: "The Future of AI Infrastructure: Data Centers, Energy, and the $100B CapEx Boom",
        category: "tech",
        revenue_focus: "infrastructure",
        image: "https://images.unsplash.com/photo-1558494949-efafa0778c43?auto=format&fit=crop&q=80",
        content: GEN_CONTENT_JSON("AI Data Centers", "Energy & Infrastructure")
    },

    // 25 DRAFTS
    ...[
        "Global Semiconductor Supply Chain: The 2025 Bottleneck Analysis",
        "AI in Healthcare: The $45 Billion Radiology Revolution",
        "Generative AI in Law: Automating the Billable Hour",
        "Cybersecurity in 2025: AI vs. AI Warfare",
        "Sovereign AI: Why Nations Are Hoarding GPUs",
        "The Death of SaaS: How Agentic AI Replaces Subscriptions",
        "Fintech 3.0: The End of Traditional Banking Interfaces",
        "Crypto & AI: The Rise of Decentralized Compute Networks",
        "Ethereum vs. Solana: The Battle for Decentralized Infrastructure",
        "Bitcoin ETF Flows: Institutional Strategy for Q3 2025",
        "The Metaverse Pivot: Industrial Digital Twins Explained",
        "Quantum Computing: When Will It Break Encryption?",
        "Space Economy: SpaceX's Starship and Market Impact",
        "Green Energy for AI: The Nuclear Fusion Bet",
        "Autonomous Agents: The Next Trillion Dollar Vertical",
        "Apple's AI Strategy: Private Cloud Compute Deep Dive",
        "Microsoft Copilot: Enterprise Adoption Metrics 2025",
        "Google Gemini vs. GPT-5: The Benchmark Wars",
        "Tesla's Optimus Bot: Labor Market Disruption Forecast",
        "Amazon AWS vs. Azure: The Cloud AI Revenue War",
        "Palantir Technologies: Defense Tech in a Geopolitical Crisis",
        "Snowflake vs. Databricks: The Data Lakehouse Verdict",
        "Synthetic Data: Solving the AI Training Data Shortage",
        "Edge AI: Processing Intelligence on Device",
        "The API Economy: Monetizing Intelligence in 2025"
    ].map(title => ({
        title,
        category: title.toLowerCase().includes('bitcoin') || title.toLowerCase().includes('crypto') ? 'crypto' : 'tech',
        revenue_focus: 'general',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
        content: JSON.stringify({
            introduction: `Draft Report: Comprehensive analysis of ${title}. This report highlights the imminent shifts in the market structure and the opportunities for early adopters.`,
            sections: [
                { heading: "Executive Summary", content: "Pending analysis..." },
                { heading: "Data Points", content: "Pending data aggregation..." }
            ],
            velocity_score: (Math.random() * (95.0 - 80.0) + 80.0).toFixed(1)
        })
    }))
];

async function seedCampaign() {
    console.log(`Seeding ${articles.length} High-RPM Articles...`);

    // First, get valid category IDs for mapping text categories to UUIDs
    const { data: categories } = await supabase.from('categories').select('id, slug');
    const categoryMap: Record<string, string> = {};
    if (categories) {
        categories.forEach((c: any) => categoryMap[c.slug] = c.id);
    }

    // Helper to get category ID or default to 'tech' (or a known UUID if available)
    for (const article of articles) {
        // Map string category to DB UUID
        let catId = categoryMap[article.category];
        if (!catId) catId = categoryMap['tech'] || categoryMap['ai']; // Fallback

        const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // 1. Upsert Trend (Minimal fields to avoid schema errors)
        const { data: trendData, error: trendError } = await supabase
            .from('trends')
            .upsert({
                country_code: 'us',
                title: article.title,
                slug: slug
                // Removed query, score, is_active
            }, { onConflict: 'slug' })
            .select()
            .single();

        if (trendError) {
            console.error(`Trend Insert Error (${article.title}):`, trendError.message);
            continue;
        }

        // 2. Insert Article linked to Trend
        const { error } = await supabase.from('trend_articles').insert({
            trend_id: trendData.id,
            country_code: 'us',
            title: article.title,
            seo_title: article.title,
            seo_description: article.title + " - Comprehensive market analysis and 2025 outlook.",
            content_html: article.content, // Now JSON string
            category_id: catId,
            author_id: null, // Optional
            created_at: new Date().toISOString()
        });

        if (error) {
            console.error(`Failed to insert article: ${article.title}`, error.message);
        } else {
            console.log(`Published: ${article.title}`);
        }
    }
    console.log("Campaign Seeding Complete.");
}

seedCampaign();
