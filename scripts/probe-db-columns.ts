
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function probe() {
    const { data: trends } = await supabase.from('trends').select('*').limit(1)
    console.log('Trends columns:', Object.keys(trends?.[0] || {}))

    const { data: trend_articles } = await supabase.from('trend_articles').select('*').limit(1)
    console.log('Trend Articles columns:', Object.keys(trend_articles?.[0] || {}))
}
probe()
