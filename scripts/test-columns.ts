
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function testColumns() {
    console.log('🧪 Testing columns in trends...')
    const cols = ['id', 'title', 'slug', 'query', 'country_code', 'category_id']

    for (const col of cols) {
        const { error } = await supabase.from('trends').select(col).limit(1)
        if (error) {
            console.log(`❌ Column [${col}] failed: ${error.message} (${error.code})`)
        } else {
            console.log(`✅ Column [${col}] is OK.`)
        }
    }
}

testColumns()
