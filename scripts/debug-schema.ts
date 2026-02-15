
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function debugSchema() {
    console.log('🔍 Comprehensive Schema Diagnosis...')

    // 1. Check if we can see the trends table at all
    const { data: trends, error: tErr } = await supabase.from('trends').select('*').limit(1)
    if (tErr) {
        console.log(`❌ Trends SELECT error: ${tErr.message}`)
    } else {
        console.log(`✅ Trends table is visible for SELECT. Found ${trends.length} rows.`)
        if (trends.length > 0) {
            console.log(`📊 Sample row keys: ${Object.keys(trends[0]).join(', ')}`)
            if ('category_id' in trends[0]) {
                console.log('✅ category_id exists in trends table.')
            } else {
                console.log('❌ category_id DOES NOT exist in trends table yet.')
            }
        }
    }

    // 2. Check categories
    const { data: cats, error: cErr } = await supabase.from('categories').select('*').limit(1)
    if (cErr) console.log(`❌ Categories SELECT error: ${cErr.message}`)
    else console.log(`✅ Categories table is visible.`)

    // 3. Try a minimal insert to test policy
    const { error: iErr } = await supabase.from('trends').insert([{
        title: 'Diagnostic',
        slug: 'diag-' + Math.random(),
        query: 'diag',
        country_code: 'us'
    }])
    if (iErr) {
        console.log(`❌ Trends INSERT test error: ${iErr.message} (${iErr.code})`)
    } else {
        console.log(`✅ Trends INSERT test successful! Policies are working.`)
    }
}

debugSchema()
