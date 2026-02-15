
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function check() {
    const { data: categories } = await supabase.from('categories').select('*')
    for (const cat of categories || []) {
        const { count } = await supabase.from('trends').select('*', { count: 'exact', head: true }).eq('category_id', cat.id)
        console.log(`Cat: ${cat.name} (${cat.id}) | Trends: ${count}`)
    }
}
check()
