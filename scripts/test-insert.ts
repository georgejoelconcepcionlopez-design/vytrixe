
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function testInsert() {
    console.log('🧪 Testing simple insert on trends...')
    const { data, error } = await supabase
        .from('trends')
        .insert([{
            title: 'Test Trend',
            slug: 'test-trend-' + Date.now(),
            query: 'test',
            country_code: 'us',
            category_id: '685d0648-2831-4191-88fc-8f6456740662' // Placeholder or null
        }])
    if (error) console.error('❌ Insert failed:', error)
    else console.log('✅ Insert successful')
}

testInsert()
