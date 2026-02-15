
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function getColumns() {
    // Try to get columns for trend_articles
    const { data, error } = await supabase.from('trend_articles').select('*').limit(1)
    if (error) {
        console.error('Error:', error.message)
    } else {
        // If there's no data, we can't get keys from an object. 
        // We'll try to insert a dummy row if empty, or just use the information_schema query if we could.
        // Actually, I'll try to insert a row with all possible columns and see what sticks.
        console.log('Sample row data:', data[0])
        if (data.length > 0) {
            console.log('Columns:', Object.keys(data[0]))
        }
    }
}

getColumns()
