import { createClient } from '../supabase/server';

export interface NewsArticle {
    title: string;
    description: string;
    content: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    author?: string;
    source: {
        name: string;
    };
}

export async function importNews(articles: NewsArticle[], category: string) {
    const supabase = await createClient();

    const results = {
        imported: 0,
        skipped: 0,
        errors: 0,
    };

    for (const article of articles) {
        try {
            const slug = article.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            // Avoid duplicates by slug
            const { data: existing, error: fetchError } = await (supabase as any)
                .from('news')
                .select('id')
                .eq('slug', slug)
                .maybeSingle();

            if (fetchError) {
                console.error('Error checking existing article:', fetchError);
                results.errors++;
                continue;
            }

            if (existing) {
                results.skipped++;
                continue;
            }

            const { error: insertError } = await (supabase as any)
                .from('news')
                .insert([{
                    title: article.title,
                    slug: slug,
                    content: article.content || article.description || '',
                    category: category,
                    image: article.urlToImage || 'https://images.unsplash.com/photo-1504711432869-5d593f5f203e?auto=format&fit=crop&q=80&w=800',
                    source: article.source?.name || 'External',
                    author: article.author || 'Vytrixe AI',
                    is_trending: false,
                    views: 0,
                    created_at: new Date(article.publishedAt || Date.now()).toISOString()
                }]);

            if (insertError) throw insertError;
            results.imported++;
        } catch (error) {
            console.error('Error importing article:', error);
            results.errors++;
        }
    }

    return results;
}

export async function syncAll() {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    if (!NEWS_API_KEY) throw new Error('News API Key missing');

    const categories = ['business', 'technology', 'science', 'health', 'entertainment', 'sports'];
    const totalResults: any = {};

    for (const category of categories) {
        try {
            const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${NEWS_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'ok') {
                totalResults[category] = await importNews(data.articles, category);
            } else {
                totalResults[category] = { error: data.message };
            }
        } catch (err: any) {
            totalResults[category] = { error: err.message };
        }
    }

    return totalResults;
}
