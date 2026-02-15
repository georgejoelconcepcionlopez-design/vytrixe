
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function testInsert() {
    console.log('🧪 Testing insert with user-provided columns...')
    const { error } = await supabase.from('trends').insert([{
        trend_id: 'test-slug-' + Date.now(),
        country_code: 'us',
        seo_title: 'Test SEO Title',
        seo_description: 'Test SEO Description',
        query: 'test query',
        category_id: '05490237-63e8-4049-860b-b56095fc2da6' // AI & Emerging Tech ID from previous check
    }])

    if (error) {
        console.log('❌ Insert failed:', error.message)
        console.log('Error details:', error)
    } else {
        console.log('✅ Insert SUCCESS! Use these columns.')
    }
}

testInsert()
