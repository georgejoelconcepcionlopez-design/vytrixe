
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function getRealColumns() {
    console.log('📋 Fetching real column names from information_schema...')
    const { data, error } = await supabase.rpc('get_table_columns_debug', { table_name: 'trends' })
    if (error) {
        // If RPC doesn't exist, try a dummy insert with an invalid column to trigger an error message that lists columns
        console.log('⚠️ RPC failed, trying trigger insert...')
        const { error: iErr } = await supabase.from('trends').insert([{ non_existent_column: 'test' }])
        if (iErr) {
            console.log('🔍 Error message hint:', iErr.message)
        }
    } else {
        console.log('✅ Columns:', data)
    }
}

// Since I don't have the RPC, let's just use the 'select from trends' but check the error for missing columns
async function checkByError() {
    console.log('🧪 Checking query column via deliberate error...')
    const { error } = await supabase.from('trends').select('query').limit(1)
    if (error) {
        console.log(`❌ Query column check: ${error.message} (${error.code})`)
    } else {
        console.log('✅ Query column exists!')
    }
}

checkByError()
