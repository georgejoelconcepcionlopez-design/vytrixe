
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleArticles = [
    {
        title: 'AI Revolution: TrendNova Launches Global Intelligence Feed',
        slug: 'ai-revolution-trendnova-launches-global-intelligence-feed',
        content: 'TrendNova has officially launched its proprietary Global Intelligence Feed, leveraging advanced AI to detect viral market signals with sub-second latency. The platform aims to democratize access to high-velocity trend data for independent analysts and enterprise teams alike.',
        excerpt: 'Detecting viral market signals with sub-second latency.',
        category: 'technology',
        source: 'TrendNova Internal',
        author: 'Nova Tech Team',
        views: 1250,
        is_trending: true,
        created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
        title: 'Markets React as Search Velocity for Quantum Computing Spikes',
        slug: 'markets-react-as-search-velocity-for-quantum-computing-spikes',
        content: 'A massive spike in search velocity related to quantum computing breakthroughs has triggered significant volatility in tech stocks. TrendNova analytics detected the momentum shift 4 hours before major outlets reported the physical lab results.',
        excerpt: 'Momentum shift detected 4 hours ahead of news cycles.',
        category: 'business',
        source: 'Market Signal AI',
        author: 'TrendNova Analytics',
        views: 850,
        is_trending: false,
        created_at: new Date(Date.now() - 7200000).toISOString(),
    },
    {
        title: 'The Future of Real-Time Analytics in Modern News Portals',
        slug: 'future-of-real-time-analytics-in-modern-news-portals',
        content: 'The landscape of news consumption is shifting from static reports to real-time intelligence nodes. Dynamic dashboards like TrendNova are paving the way for a more reactive and informed digital society.',
        excerpt: 'Shifting from static reports to real-time intelligence nodes.',
        category: 'science',
        source: 'TrendNova Insights',
        author: 'AI Editorial',
        views: 450,
        is_trending: false,
        created_at: new Date(Date.now() - 10800000).toISOString(),
    }
];

async function seed() {
    console.log('--- Homepage Seeding Diagnostic ---');
    console.log('Target URL:', supabaseUrl);

    // Test 1: Simple SELECT to see if table exists
    console.log('\nTest 1: Probing "news" table...');
    const { data: testData, error: testError } = await supabase.from('news').select('id').limit(1);
    if (testError) {
        console.error('❌ Table probe failed:', testError.message, `(${testError.code})`);
        if (testError.code === 'PGRST205') {
            console.log('💡 Table "news" really does not exist in the public schema cache.');
        }
    } else {
        console.log('✅ Table probe successful. Found:', testData.length, 'rows');
    }

    // Test 2: Check count with metadata
    console.log('\nTest 2: Fetching count...');
    const { count, error: countError } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.error('❌ Count fetch failed:', countError.message);
    } else {
        console.log(`✅ Current news count: ${count}`);
    }

    if (countError || count < 3) {
        console.log('\nAction: Attempting to insert 3 sample articles...');
        const { error: insertError } = await supabase
            .from('news')
            .upsert(sampleArticles, { onConflict: 'slug' });

        if (insertError) {
            console.error('❌ Insertion failed:', insertError.message, `(${insertError.code})`);
        } else {
            console.log('✅ Successfully seeded 3 sample articles.');
        }
    } else {
        console.log('\nAction: Skipping seeding as data count is sufficient.');
    }
}

seed();
