
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function probe() {
    console.log('--- TRENDS TABLE ---')
    const { data: tData, error: tErr } = await supabase.from('trends').select('*').limit(1)
    if (tErr) console.log('Error trends:', tErr.message)
    else console.log('Columns trends:', Object.keys(tData[0] || {}))

    console.log('--- TREND_ARTICLES TABLE ---')
    const { data: aData, error: aErr } = await supabase.from('trend_articles').select('*').limit(1)
    if (aErr) console.log('Error trend_articles:', aErr.message)
    else console.log('Columns trend_articles:', Object.keys(aData[0] || {}))
}

probe()
