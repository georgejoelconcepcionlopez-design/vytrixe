
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function probeColumns() {
    console.log('🔍 Probing columns in trends...')
    const { data, error } = await supabase.from('trends').select('*').limit(1)
    if (error) {
        console.error('❌ SELECT failed:', error.message)
    } else {
        const columns = data.length > 0 ? Object.keys(data[0]) : []
        console.log('✅ Columns found:', columns.join(', '))

        // Detailed check
        const target = 'query'
        if (columns.includes(target)) {
            console.log(`✅ Column [${target}] exists.`)
        } else {
            console.log(`❌ Column [${target}] MISSING.`)
        }
    }
}

probeColumns()
