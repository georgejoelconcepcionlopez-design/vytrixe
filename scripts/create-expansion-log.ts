
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

dotenv.config({ path: '.env.local' })

async function run() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const sql = fs.readFileSync('schema_expansion_log.sql', 'utf8')
    console.log('Running SQL to create expansion_log...')
    const { error } = await supabase.rpc('execute_sql_debug', { sql_query: sql })
    if (error) {
        console.log('❌ Failed via RPC:', error.message)
        console.log('Trying direct table check...')
        const { error: checkErr } = await supabase.from('expansion_log').select('*').limit(0)
        if (checkErr) {
            console.log('❌ expansion_log table MISSING.')
        } else {
            console.log('✅ expansion_log table ALREADY EXISTS.')
        }
    } else {
        console.log('✅ SQL Success')
    }
}
run()
