import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSchema() {
    console.log('Inspecting "trends" table...');

    // Attempt to insert a dummy record to see what columns fail or succeed, 
    // or just select * limit 1 to see returned structure if any data exists.

    const { data, error } = await supabase.from('trends').select('*').limit(1);

    if (error) {
        console.error('Error selecting from trends:', error.message);
    } else {
        console.log('Success? Data:', data);
        if (data.length > 0) {
            console.log('Columns found:', Object.keys(data[0]));
        } else {
            console.log('Table is empty, cannot infer columns from data.');
        }
    }
}

inspectSchema();
