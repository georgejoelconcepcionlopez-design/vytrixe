
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function verify() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        console.error('Missing Supabase URL or Key in .env.local');
        process.exit(1);
    }

    const supabase = createClient(url, key);

    console.log('Verifying Schema...');

    // Try to call the RPC function created in schema_update.sql
    const { data, error } = await supabase.rpc('check_trends_schema');

    if (error) {
        console.error('RPC Error:', error.message);
        console.log('Did you run the schema_update.sql in Supabase Query Editor?');
        // Fallback: Try to select the columns directly
        console.log('Attempting direct select fallback...');
        const { data: fallbackData, error: fallbackError } = await supabase.from('trends').select('growth_percent, category').limit(1);
        if (fallbackError) {
            console.error('Direct Select Error:', fallbackError.message);
            console.error('❌ Schema update NOT found.');
        } else {
            console.log('✅ Direct select success! Columns exist.');
        }
    } else {
        console.log('RPC Response:', data);

        // Check columns
        const cols = data.columns || [];
        const idxs = data.indexes || [];

        const hasGrowth = cols.includes('growth_percent');
        const hasCategory = cols.includes('category');
        console.log(`Column 'growth_percent': ${hasGrowth ? '✅' : '❌'}`);
        console.log(`Column 'category': ${hasCategory ? '✅' : '❌'}`);

        // Check indexes
        const hasIdxScore = idxs.includes('trends_country_score_idx');
        const hasIdxGrowth = idxs.includes('trends_growth_idx');
        console.log(`Index 'trends_country_score_idx': ${hasIdxScore ? '✅' : '❌'}`);
        console.log(`Index 'trends_growth_idx': ${hasIdxGrowth ? '✅' : '❌'}`);
    }
}

verify();
