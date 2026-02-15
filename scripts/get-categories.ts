
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function getCategories() {
    const { data, error } = await supabase.from('categories').select('id, name, slug')
    if (error) console.error(error)
    else console.log(JSON.stringify(data, null, 2))
}

getCategories()
