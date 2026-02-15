
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const DATA = [
    {
        category_slug: 'ai-tech',
        trends: [
            { trend_id: 'gpt-5-rumors-2025', title: 'GPT-5 Model Architecture Rumors', query: 'GPT-5 capabilities architecture', country_code: 'us', score: 98 },
            { trend_id: 'humanoid-robot-adoption', title: 'Enterprise Humanoid Robot Adoption', query: 'humanoid robots for logistics', country_code: 'us', score: 94 },
            { trend_id: 'ai-chip-shortage-outlook', title: '2025 AI Chip Supply Chain Outlook', query: 'Nvidia Blackwell supply constraints', country_code: 'us', score: 96 },
            { trend_id: 'generative-video-sora-competitors', title: 'OpenAI Sora vs competitors 2025', query: 'best AI video generators 2025', country_code: 'us', score: 92 },
            { trend_id: 'agile-ai-agents', title: 'Autonomous AI Agents in Enterprise', query: 'AI agents for workflow automation', country_code: 'us', score: 97 }
        ]
    },
    {
        category_slug: 'finance',
        trends: [
            { trend_id: 'bitcoin-institutional-inflow', title: 'Institutional Bitcoin Inflow Analysis', query: 'Blackrock BTC ETF holdings', country_code: 'us', score: 99 },
            { trend_id: 'us-inflation-pivot-2025', title: 'Federal Reserve Inflation Pivot Strategy', query: 'Fed interest rate cuts 2025', country_code: 'us', score: 95 },
            { trend_id: 'eth-layer-2-dominance', title: 'Ethereum Layer 2 TVL Dominance', query: 'best L2 networks by TVL', country_code: 'us', score: 91 },
            { trend_id: 'tokenized-real-estate-growth', title: 'RWA Tokenization Market Size', query: 'real estate blockchain tokenization', country_code: 'us', score: 89 },
            { trend_id: 'stablecoin-regulations-us', title: 'US Stablecoin Regulatory Framework', query: 'Lummis-Gillibrand stablecoin bill', country_code: 'us', score: 93 }
        ]
    },
    {
        category_slug: 'consumer',
        trends: [
            { trend_id: 'digital-nomad-hubs-2025-v2', title: 'Top Digital Nomad Hubs 2025', query: 'best cities for digital nomads 2025', country_code: 'us', score: 88 },
            { trend_id: 'minimalist-tech-lifestyle-v2', title: 'The Rise of Minimalist Tech', query: 'dumb phones vs smartphones 2025', country_code: 'us', score: 85 },
            { trend_id: 'sustainable-fashion-tech-v2', title: 'AI in Sustainable Fashion', query: 'eco-friendly clothing manufacturing AI', country_code: 'us', score: 82 },
            { trend_id: 'gen-alpha-spending-trends-v2', title: 'Gen Alpha Luxury Spending Habits', query: 'how gen alpha spends money', country_code: 'us', score: 90 },
            { trend_id: 'creator-economy-maturation-v2', title: 'Creator Economy 2.0 Growth', query: 'subscription models for creators', country_code: 'us', score: 87 }
        ]
    },
    {
        category_slug: 'sports',
        trends: [
            { trend_id: 'f1-engine-regulations-2026-v2', title: 'F1 2026 Engine Regulation Impacts', query: 'F1 2026 power unit changes', country_code: 'us', score: 94 },
            { trend_id: 'nfl-streaming-exclusive-era-v2', title: 'NFL Exclusive Streaming Rights Shift', query: 'NFL games on Netflix Peacock', country_code: 'us', score: 96 },
            { trend_id: 'ai-scouting-in-football-v2', title: 'AI Data Scouting in Soccer', query: 'how big data changed football recruitment', country_code: 'us', score: 89 },
            { trend_id: 'world-cup-2026-infrastructure-v2', title: 'World Cup 2026 Stadium Readiness', query: 'World Cup 2026 venues updates', country_code: 'us', score: 93 },
            { trend_id: 'wnba-expansion-economics-v2', title: 'The Economics of WNBA Expansion', query: 'WNBA revenue growth 2025', country_code: 'us', score: 91 }
        ]
    }
]

async function seed() {
    console.log('🚀 Seeding High-Intent Trends for Domination...')

    const { data: categories } = await supabase.from('categories').select('*')
    if (!categories) return

    for (const group of DATA) {
        const cat = categories.find(c => c.slug === group.category_slug)
        if (!cat) continue

        const trends = group.trends.map(t => ({
            ...t,
            category_id: cat.id
        }))

        const { error } = await supabase.from('trends').upsert(trends, { onConflict: 'trend_id' })

        if (error) {
            console.error(`❌ Failed ${group.category_slug}:`, error.message)
        } else {
            console.log(`✅ Seeded 5 trends for ${group.category_slug}`)
        }
    }
}

seed()
