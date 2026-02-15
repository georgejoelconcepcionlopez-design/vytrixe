
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            authors: {
                Row: {
                    avatar_url: string | null
                    bio: string | null
                    created_at: string
                    credentials: string | null
                    id: string
                    linkedin_url: string | null
                    name: string
                    slug: string
                    twitter_url: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    bio?: string | null
                    created_at?: string
                    credentials?: string | null
                    id?: string
                    linkedin_url?: string | null
                    name: string
                    slug: string
                    twitter_url?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    bio?: string | null
                    created_at?: string
                    credentials?: string | null
                    id?: string
                    linkedin_url?: string | null
                    name?: string
                    slug?: string
                    twitter_url?: string | null
                }
                Relationships: []
            }
            categories: {
                Row: {
                    created_at: string
                    description: string | null
                    icon: string | null
                    id: string
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    icon?: string | null
                    id?: string
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    icon?: string | null
                    id?: string
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            expansion_log: {
                Row: {
                    category_id: string | null
                    created_at: string
                    id: string
                    message: string | null
                    status: string | null
                    trend_id: string | null
                }
                Insert: {
                    category_id?: string | null
                    created_at?: string
                    id?: string
                    message?: string | null
                    status?: string | null
                    trend_id?: string | null
                }
                Update: {
                    category_id?: string | null
                    created_at?: string
                    id?: string
                    message?: string | null
                    status?: string | null
                    trend_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "expansion_log_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                ]
            }
            subscribers: {
                Row: {
                    created_at: string
                    email: string
                    id: string
                    source: string | null
                }
                Insert: {
                    created_at?: string
                    email: string
                    id?: string
                    source?: string | null
                }
                Update: {
                    created_at?: string
                    email?: string
                    id?: string
                    source?: string | null
                }
                Relationships: []
            }
            trend_articles: {
                Row: {
                    author_id: string | null
                    category_id: string | null
                    content_html: string | null
                    country_code: string
                    created_at: string
                    id: string
                    seo_description: string | null
                    seo_title: string | null
                    trend_id: string
                }
                Insert: {
                    author_id?: string | null
                    category_id?: string | null
                    content_html?: string | null
                    country_code: string
                    created_at?: string
                    id?: string
                    seo_description?: string | null
                    seo_title?: string | null
                    trend_id: string
                }
                Update: {
                    author_id?: string | null
                    category_id?: string | null
                    content_html?: string | null
                    country_code?: string
                    created_at?: string
                    id?: string
                    seo_description?: string | null
                    seo_title?: string | null
                    trend_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "trend_articles_author_id_fkey"
                        columns: ["author_id"]
                        isOneToOne: false
                        referencedRelation: "authors"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "trend_articles_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                ]
            }
            trends: {
                Row: {
                    author_id: string | null
                    category_id: string | null
                    content_html: string | null
                    country_code: string
                    created_at: string
                    id: string
                    query: string | null
                    seo_description: string | null
                    seo_title: string | null
                    trend_id: string
                }
                Insert: {
                    author_id?: string | null
                    category_id?: string | null
                    content_html?: string | null
                    country_code: string
                    created_at?: string
                    id?: string
                    query?: string | null
                    seo_description?: string | null
                    seo_title?: string | null
                    trend_id: string
                }
                Update: {
                    author_id?: string | null
                    category_id?: string | null
                    content_html?: string | null
                    country_code?: string
                    created_at?: string
                    id?: string
                    query?: string | null
                    seo_description?: string | null
                    seo_title?: string | null
                    trend_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "trends_author_id_fkey"
                        columns: ["author_id"]
                        isOneToOne: false
                        referencedRelation: "authors"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "trends_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
