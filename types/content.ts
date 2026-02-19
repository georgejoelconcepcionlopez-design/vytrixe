import { CategorySlug } from '@/lib/categories';

export type ContentCategory = CategorySlug;

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
    content?: string;
    metadata?: Record<string, any>;
}

// Unified Data Store
// data/content/index.ts
