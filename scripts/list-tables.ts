
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function listTables() {
    console.log('📋 Listing all accessible tables via head requests...')
    const commonNames = ['news', 'articles', 'countries', 'users', 'trends', 'trend_articles', 'categories', 'authors', 'sports_news', 'sports_matches', 'teams_stats', 'subscribers']

    for (const name of commonNames) {
        const { error } = await supabase.from(name).select('*', { head: true })
        if (error) {
            console.log(`❌ [${name}]: ${error.message} (${error.code})`)
        } else {
            console.log(`✅ [${name}]: Accessible`)
        }
    }

    console.log('\n🧪 Testing SELECT on each...')
    for (const name of commonNames) {
        // Try to get one row to see columns
        const { data, error } = await supabase.from(name).select('*').limit(1)
        if (error) {
            console.log(`❌ [${name}] SELECT: ${error.message} (${error.code})`)
        } else {
            console.log(`✅ [${name}] SELECT: Success. Columns: ${Object.keys(data[0] || {}).join(', ')}`)
        }
    }
}

listTables()
