
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function getCols() {
    // Try to get columns for trends
    const { data: tCols, error: tErr } = await supabase.from('trends').select('*').limit(0)
    console.log('Trends columns (via limit 0):', tCols ? Object.keys(tCols[0] || {}) : 'Error: ' + tErr?.message)

    // Alternative: Try to select a row and see if it returns anything
    const { data: tData } = await supabase.from('trends').select('*').limit(1)
    if (tData && tData.length > 0) {
        console.log('Trends actual columns:', Object.keys(tData[0]))
    } else {
        console.log('Trends table is empty, columns unknown.')
    }
}

getCols()
