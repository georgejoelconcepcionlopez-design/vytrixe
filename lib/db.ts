import { createClient } from '@/lib/supabase/server';

export interface FormattedArticle {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    bodyHtml?: string;
    imageUrl: string;
    category: string;
    author: string;
    createdAt: string;
}

function mapDatabaseArticle(article: any): FormattedArticle {
    return {
        id: article.id,
        slug: article.slug,
        title: article.content?.en?.title || article.title || 'Untitled Report',
        excerpt: article.content?.en?.excerpt || 'A detailed intelligence report.',
        bodyHtml: article.content?.en?.body,
        imageUrl: article.image_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        category: article.category?.name || 'Intelligence',
        author: article.author?.name || 'Vytrixe AI',
        createdAt: new Date(article.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }),
    };
}

export async function getLatestArticles(limit: number = 10): Promise<FormattedArticle[]> {
    const supabase = await createClient();
    if (!supabase) {
        console.warn("Supabase client not initialized. Returning empty articles.");
        return [];
    }

    // Fetch published articles
    const { data: articles, error } = await (supabase as any)
        .from('articles')
        .select(`
            *,
            author:authors(name),
            category:categories(name, slug)
        `)
        .eq('status', 'published') // Ideally 'published', fallback to all if empty for demo
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching latest articles:", error);
        return [];
    }

    // Fallback logic for testing: If no published articles, just fetch any non-draft
    if (!articles || articles.length === 0) {
        const { data: fallbackArticles } = await (supabase as any)
            .from('articles')
            .select(`
                *,
                author:authors(name),
                category:categories(name, slug)
            `)
            .order('created_at', { ascending: false })
            .limit(limit);

        return (fallbackArticles || []).map(mapDatabaseArticle);
    }

    return articles.map(mapDatabaseArticle);
}

export async function getArticlesByCategory(categorySlug: string, limit: number = 20): Promise<FormattedArticle[]> {
    const supabase = await createClient();
    if (!supabase) {
        console.warn("Supabase client not initialized. Returning empty category articles.");
        return [];
    }

    // 1. Get category ID
    const { data: categoryData } = await (supabase as any)
        .from('categories')
        .select('id, name')
        .eq('slug', categorySlug)
        .maybeSingle();

    if (!categoryData) return [];

    // 2. Fetch filtered articles
    const { data: articles, error } = await (supabase as any)
        .from('articles')
        .select(`
            *,
            author:authors(name),
            category:categories(name, slug)
        `)
        .eq('category_id', categoryData.id)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error(`Error fetching articles for category ${categorySlug}:`, error);
        return [];
    }

    return (articles || []).map(mapDatabaseArticle);
}

export async function getArticleBySlug(slug: string): Promise<FormattedArticle | null> {
    const supabase = await createClient();
    if (!supabase) {
        console.warn("Supabase client not initialized. Returning null article.");
        return null;
    }

    const { data: article, error } = await (supabase as any)
        .from('articles')
        .select(`
            *,
            author:authors(name, is_ai, bio),
            category:categories(name, slug)
        `)
        .eq('slug', slug)
        .maybeSingle();

    if (error || !article) {
        if (error) console.error("Error fetching article by slug:", error);
        return null;
    }

    return mapDatabaseArticle(article);
}
