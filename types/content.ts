
export type ContentCategory = 'AI' | 'Tech' | 'Finance' | 'Crypto' | 'Startups' | 'Marketing' | 'Global' | 'Sports' | 'Culture';

export interface ContentItem {
    id: string;
    title: string;
    summary: string;
    category: ContentCategory;
    slug: string;
    image_url: string;
    created_at: string;
    author?: string;
    tags?: string[];
    is_featured?: boolean;
    dateDisplay?: string;
}

// Unified Data Store
// data/content/index.ts
