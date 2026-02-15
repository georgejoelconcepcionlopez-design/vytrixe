
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function testArticle() {
    console.log('🧪 Final check for trend_articles...')
    const { error } = await supabase.from('trend_articles').insert([{
        trend_id: 'test-slug',
        country_code: 'us',
        seo_title: 'Test',
        seo_description: 'Test',
        content_html: 'Test'
    }])
    if (error) console.log('❌ Failed:', error.message)
    else console.log('✅ Article Insert Success')
}

testArticle()
