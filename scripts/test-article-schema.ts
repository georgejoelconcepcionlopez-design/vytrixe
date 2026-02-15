
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function testArticleInsert() {
    console.log('🧪 Testing insert with trend_articles...')
    // Note: I need to know the columns. I'll try the common ones first.
    const { error } = await supabase.from('trend_articles').insert([{
        trend_id: 'test-slug', // Assuming it's a text field linking to trends.trend_id
        country_code: 'us',
        title: 'Test Article Title',
        content_html: '<div>Test content</div>',
        seo_title: 'Test SEO Title',
        seo_description: 'Test SEO Description'
    }])

    if (error) {
        console.log('❌ Insert failed:', error.message)
        // Try to get columns via select error hint
        const { error: hErr } = await supabase.from('trend_articles').select('non_existent').limit(1)
        console.log('Hint:', hErr?.message)
    } else {
        console.log('✅ Insert SUCCESS!')
    }
}

testArticleInsert()
