export type BilingualContent = {
    title: string
    summary: string
    body: string
    metaTitle: string
    metaDescription: string
}

export type ArticleContent = {
    en: BilingualContent
    es: BilingualContent
}

export interface VytrixeArticle {
    id: string
    slug: string
    category: 'ai' | 'tech' | 'startups' | 'crypto' | 'trending'
    status: 'draft' | 'pending-review' | 'published'
    is_breaking: boolean
    is_live: boolean
    is_premium: boolean
    image_url?: string
    published_at?: string
    updated_at: string
    created_at: string
    auto_publish_at?: string
    content: ArticleContent
    metadata?: Record<string, any>
}

export interface VytrixeProfile {
    id: string
    email: string
    full_name: string | null
    avatar_url: string | null
    role: 'free' | 'pro' | 'admin' | 'editor'
    is_premium: boolean
    preferred_language: 'en' | 'es'
    favorite_categories: string[]
    notification_prefs: { email: boolean; push: boolean }
    watchlist: string[]
    created_at: string
    updated_at: string
}
