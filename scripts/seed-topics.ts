import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const HIGH_CPM_TOPICS = [
    { name: 'Artificial Intelligence', slug: 'ai', description: 'Global Intelligence on AI, LLMs, and Neural Networks.' },
    { name: 'Nvidia', slug: 'nvidia', description: 'Updates on Nvidia (NVDA), GPUs, and Hardware Infrastructure.' },
    { name: 'OpenAI', slug: 'openai', description: 'Latest news on ChatGPT, GPT-5, and OpenAI Enterprise.' },
    { name: 'Global Markets', slug: 'markets', description: 'Macro-economic analysis, Forex, and Central Bank policies.' },
    { name: 'Crypto Assets', slug: 'crypto', description: 'Institutional crypto adoption, ETFs, and Tokenization.' },
    { name: 'Big Data', slug: 'data', description: 'Enterprise Data warehousing, Snowflake, and Databricks coverage.' }
];

async function seedTopics() {
    console.log('Seeding High-CPM Topics...');

    for (const topic of HIGH_CPM_TOPICS) {
        const { error } = await supabase
            .from('categories')
            .upsert({
                name: topic.name,
                slug: topic.slug,
                description: topic.description,
                icon: 'cpu' // Default icon
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`Error seeding ${topic.name}:`, error.message);
        } else {
            console.log(`Synced: ${topic.name}`);
        }
    }
    console.log('Topic Seeding Complete.');
}

seedTopics();
