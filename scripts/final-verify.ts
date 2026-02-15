
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function verify() {
    console.log('--- FINAL DEPLOYMENT VERIFICATION ---')

    // 1. Article Count
    const { count: articleCount } = await supabase.from('trend_articles').select('*', { count: 'exact', head: true })
    console.log(`✅ Total articles in trend_articles: ${articleCount}`)

    // 2. Sample Content Check
    const { data: sample } = await supabase.from('trend_articles').select('*').eq('trend_id', 'digital-nomad-hubs-2025-v3').single()
    if (sample) {
        const content = JSON.parse(sample.content_html)
        console.log(`✅ Sample Article: ${sample.seo_title}`)
        console.log(`✅ Word Count Flag: ${content.word_count}`)
        console.log(`✅ FAQ Count: ${content.faq?.length}`)
        console.log(`✅ Sections Count: ${content.sections?.length}`)
    }

    // 3. Log Check
    const { count: logCount } = await supabase.from('expansion_log').select('*', { count: 'exact', head: true })
    console.log(`✅ Total audit logs in expansion_log: ${logCount}`)

    if (articleCount && articleCount >= 30) {
        console.log('🚀 DOMINATION GOAL REACHED')
    } else {
        console.log('⚠️ Under 30 articles detected.')
    }
}
verify()
