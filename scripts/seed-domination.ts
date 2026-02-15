
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const DATA = [
    {
        category_slug: 'ai-tech',
        trends: [
            { query: 'OpenAI Sora Video Generation', title: 'OpenAI Sora Breakthrough' },
            { query: 'NVIDIA H200 GPU Demand', title: 'NVIDIA H200 Shortage' },
            { query: 'Apple Vision Pro Workflows', title: 'Vision Pro Enterprise Adoption' },
            { query: 'Claude 3 Opus vs GPT-4', title: 'Anthropic AI Benchmarks' },
            { query: 'Google Gemini 1.5 Pro Context', title: 'Gemini Technical Analysis' },
            { query: 'Stable Diffusion 3 Release', title: 'SD3 Model Architecture' },
            { query: 'Figure-1 AI Robotics', title: 'Humanoid AI Robotics' },
            { query: 'Perplexity AI Search Growth', title: 'AI-Native Search Revolution' },
            { query: 'Mistral Large Benchmarks', title: 'Open-Weight AI Leaders' },
            { query: 'Groq LPU Inference Speed', title: 'Fastest AI Inference' }
        ]
    },
    {
        category_slug: 'finance',
        trends: [
            { query: 'Bitcoin Halving 2024 Prediction', title: 'BTC Halving Impact' },
            { query: 'Ethereum Spot ETF Approval', title: 'ETH ETF Readiness' },
            { query: 'Fed Interest Rate Shift', title: 'FOMC Pivot Data' },
            { query: 'NVDIA Stock Analysis 2026', title: 'NVDA Growth Forecast' },
            { query: 'Solana Ecosystem Growth', title: 'SOL Network Velocity' },
            { query: 'Gold Digital Tokenization', title: 'RWA Asset Class' },
            { query: 'Japan Interest Rate Hike', title: 'Yen Carry Trade Risk' },
            { query: 'MicroStrategy Bitcoin Strategy', title: 'MSTR Treasury Alpha' },
            { query: 'CBDC Implementation Risks', title: 'Digital Sovereign Currencies' },
            { query: 'Wall Street AI Adoption', title: 'Financial AI Agents' }
        ]
    }
]

async function seed() {
    console.log('🚀 Seeding Domination Trends...')

    const { data: categories } = await supabase.from('categories').select('id, slug')
    if (!categories) return

    for (const group of DATA) {
        const cat = categories.find(c => c.slug === group.category_slug)
        if (!cat) continue

        console.log(`\n📂 Category: ${group.category_slug}`)

        const trends = group.trends.map(t => ({
            trend_id: t.query.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''),
            country_code: 'us',
            query: t.query,
            seo_title: `${t.title} | Market Pulse`,
            seo_description: `Latest insights on ${t.query} and its impact for ${group.category_slug}.`,
            category_id: cat.id
        }))

        // Try without onConflict first, let's see if we can just insert
        const { error } = await supabase.from('trends').insert(trends)
        if (error) {
            console.error(`❌ Failed to seed ${group.category_slug}:`, error.message)
            if (error.code === '23505') {
                console.log('💡 Trends already exist, skipping...')
            }
        } else {
            console.log(`✅ Seeded ${trends.length} trends for ${group.category_slug}`)
        }
    }
}

seed()
