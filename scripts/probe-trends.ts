
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function probe() {
    const { data, error } = await supabase.from('trends').select('*').limit(1)
    if (error) {
        console.error(error)
        return
    }
    if (data && data.length > 0) {
        console.log('Columns in trends:', Object.keys(data[0]))
    } else {
        console.log('No data in trends table.')
    }
}
probe()
