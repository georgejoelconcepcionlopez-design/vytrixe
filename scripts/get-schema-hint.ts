
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function getColumns() {
    console.log('--- TRENDS ---')
    const { data: tCols, error: tErr } = await supabase.rpc('get_table_columns_debug', { table_name: 'trends' })
    if (tErr) {
        // Fallback: try to select a non-existent column to see the error message
        const { error: fErr } = await supabase.from('trends').select('non_existent_debug_column').limit(1)
        console.log('Trends columns hint:', fErr?.message)
    } else {
        console.log('Trends columns:', tCols)
    }

    console.log('--- TREND_ARTICLES ---')
    const { data: aCols, error: aErr } = await supabase.rpc('get_table_columns_debug', { table_name: 'trend_articles' })
    if (aErr) {
        const { error: fErr } = await supabase.from('trend_articles').select('non_existent_debug_column').limit(1)
        console.log('Trend_articles columns hint:', fErr?.message)
    } else {
        console.log('Trend_articles columns:', aCols)
    }
}

getColumns()
