import { createAdminClient } from '@/lib/supabase/admin';

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
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
}

function mapDatabaseArticle(article: any): FormattedArticle {
    return {
        id: article.id,
        slug: article.slug,
        title: article.title || article.content?.en?.title || 'Untitled Report',
        excerpt: article.excerpt || article.content?.en?.excerpt || 'A detailed intelligence report.',
        bodyHtml: article.content && typeof article.content === 'string' ? article.content : article.content?.en?.body,
        imageUrl: article.cover_image || article.image_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        category: article.category || article.category_details?.name || article.category_obj?.name || 'Intelligence',
        author: article.author?.name || 'Vytrixe AI',
        createdAt: new Date(article.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }),
        seoTitle: article.seo_title,
        seoDescription: article.seo_description,
        keywords: article.keywords,
    };
}

export async function getLatestArticles(limit: number = 20): Promise<FormattedArticle[]> {
    const supabase = createAdminClient();
    if (!supabase) {
        console.warn("Supabase client not initialized. Returning empty articles.");
        return [];
    }

    // Fetch published articles (using published_at as indicator for new engine)
    const { data: articles, error } = await (supabase as any)
        .from('articles')
        .select(`
            *,
            author:authors(name),
            category_details:categories(name, slug)
        `)
        .not('published_at', 'is', null) // Only published
        .order('published_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching latest articles:", error);
        // Fallback: try fetching without joins if they fail
        const { data: simpleArticles } = await (supabase as any)
            .from('articles')
            .select('*')
            .not('published_at', 'is', null)
            .order('published_at', { ascending: false })
            .limit(limit);

        return (simpleArticles || []).map(mapDatabaseArticle);
    }

    return (articles || []).map(mapDatabaseArticle);
}

export async function getArticlesByCategory(categorySlug: string, limit: number = 20): Promise<FormattedArticle[]> {
    const supabase = createAdminClient();
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
            category_details:categories(name, slug)
        `)
        .or(`category.eq.${categoryData.name},category_id.eq.${categoryData.id}`)
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error(`Error fetching articles for category ${categorySlug}:`, error);
        return [];
    }

    return (articles || []).map(mapDatabaseArticle);
}

export async function getArticleBySlug(slug: string): Promise<FormattedArticle | null> {
    const supabase = createAdminClient();
    if (!supabase) {
        console.warn("Supabase client not initialized. Returning null article.");
        return null;
    }

    const { data: article, error } = await (supabase as any)
        .from('articles')
        .select(`
            *,
            author:authors(name, is_ai, bio),
            category_details:categories(name, slug)
        `)
        .eq('slug', slug)
        .maybeSingle();

    if (error || !article) {
        if (error) console.error("Error fetching article by slug:", error);
        return null;
    }

    return mapDatabaseArticle(article);
}
