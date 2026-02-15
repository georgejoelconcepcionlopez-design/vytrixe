
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const DATA = [
    {
        category_slug: 'consumer',
        trends: [
            { trend_id: 'digital-nomad-hubs-2025-v3', query: 'best cities for digital nomads 2025', country_code: 'us', seo_title: 'Top Digital Nomad Hubs 2025', seo_description: 'Strategic analysis' },
            { trend_id: 'minimalist-tech-lifestyle-v3', query: 'dumb phones vs smartphones 2025', country_code: 'us', seo_title: 'The Rise of Minimalist Tech', seo_description: 'Strategic analysis' },
            { trend_id: 'sustainable-fashion-tech-v3', query: 'eco-friendly clothing manufacturing AI', country_code: 'us', seo_title: 'AI in Sustainable Fashion', seo_description: 'Strategic analysis' },
            { trend_id: 'gen-alpha-spending-trends-v3', query: 'how gen alpha spends money', country_code: 'us', seo_title: 'Gen Alpha Luxury Spending Habits', seo_description: 'Strategic analysis' },
            { trend_id: 'creator-economy-maturation-v3', query: 'subscription models for creators', country_code: 'us', seo_title: 'Creator Economy 2.0 Growth', seo_description: 'Strategic analysis' }
        ]
    },
    {
        category_slug: 'sports',
        trends: [
            { trend_id: 'f1-engine-regulations-2026-v3', query: 'F1 2026 power unit changes', country_code: 'us', seo_title: 'F1 2026 Engine Regulation Impacts', seo_description: 'Strategic analysis' },
            { trend_id: 'nfl-streaming-exclusive-era-v3', query: 'NFL games on Netflix Peacock', country_code: 'us', seo_title: 'NFL Exclusive Streaming Rights Shift', seo_description: 'Strategic analysis' },
            { trend_id: 'ai-scouting-in-football-v3', query: 'how big data changed football recruitment', country_code: 'us', seo_title: 'AI Data Scouting in Soccer', seo_description: 'Strategic analysis' },
            { trend_id: 'world-cup-2026-infrastructure-v3', query: 'World Cup 2026 venues updates', country_code: 'us', seo_title: 'World Cup 2026 Stadium Readiness', seo_description: 'Strategic analysis' },
            { trend_id: 'wnba-expansion-economics-v3', query: 'WNBA revenue growth 2025', country_code: 'us', seo_title: 'The Economics of WNBA Expansion', seo_description: 'Strategic analysis' }
        ]
    }
]

async function seed() {
    console.log('🚀 Seeding Trends with Confirmed Schema...')

    const { data: categories } = await supabase.from('categories').select('*')
    if (!categories) return

    for (const group of DATA) {
        const cat = categories.find(c => c.slug === group.category_slug)
        if (!cat) {
            console.log(`⚠️ Category not found: ${group.category_slug}`)
            continue
        }

        const trends = group.trends.map(t => ({
            ...t,
            category_id: cat.id
        }))

        const { error } = await supabase.from('trends').insert(trends)

        if (error) {
            console.error(`❌ Failed ${group.category_slug}:`, error.message)
        } else {
            console.log(`✅ Seeded 5 trends for ${group.category_slug}`)
        }
    }
}

seed()
