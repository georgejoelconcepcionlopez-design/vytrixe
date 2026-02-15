
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function probe() {
    console.log('📡 Probing table name variations...')
    const names = ['trends', 'trend', 'trend_data', 'insight_trends', 'market_trends']

    for (const name of names) {
        const { error } = await supabase.from(name).select('*', { head: true })
        if (!error) {
            console.log(`🎯 FOUND: [${name}] is visible via HEAD request.`)
            // Now try a real select
            const { error: sErr } = await supabase.from(name).select('*').limit(1)
            if (sErr) {
                console.log(`   ⚠️ [${name}] SELECT error: ${sErr.message} (${sErr.code})`)
            } else {
                console.log(`   ✅ [${name}] SELECT SUCCESS!`)
            }
        } else {
            console.log(`   ❌ [${name}] error: ${error.message} (${error.code})`)
        }
    }
}

probe()
