
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyTable() {
    console.log('🧪 Verifying expansion_log table...')

    const { data, error } = await supabase
        .from('expansion_log')
        .select('*')
        .limit(0)

    if (error) {
        if (error.code === '42P01') {
            console.log('❌ Table MISSING: expansion_log does not exist.')
        } else if (error.code === '42501') {
            console.log('❌ Permission Denied: RLS might be blocking or anon role lacks select.')
        } else {
            console.log('❌ Error:', error.message)
        }
        process.exit(1)
    } else {
        console.log('✅ Success: expansion_log table exists and is accessible!')
        process.exit(0)
    }
}

verifyTable()
