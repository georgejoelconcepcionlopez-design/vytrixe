
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkTables() {
    const { data, error } = await supabase.rpc('get_tables') // Usually not a default RPC

    // Alternative: Try to select from common tables
    const tables = ['countries', 'users', 'trends', 'trend_articles', 'categories', 'authors']
    for (const t of tables) {
        const { error } = await supabase.from(t).select('count', { count: 'exact', head: true })
        if (error) {
            console.log(`❌ Table [${t}] error: ${error.message}`)
        } else {
            console.log(`✅ Table [${t}] exists.`)
        }
    }
}

checkTables()
