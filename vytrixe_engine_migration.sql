-- Vytrixe Autonomous AI Engine Migration

-- Create 'trends' table with advanced scoring fields
CREATE TABLE IF NOT EXISTS public.trends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    source TEXT NOT NULL,
    score FLOAT DEFAULT 0,
    upvotes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    cross_source_hits INTEGER DEFAULT 1,
    keywords TEXT[] DEFAULT '{}',
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure 'articles' table exists with SEO and structured data fields
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT, 
    category TEXT,
    cover_image TEXT,
    seo_title TEXT,
    seo_description TEXT,
    keywords TEXT[] DEFAULT '{}',
    structured_data JSONB DEFAULT '{}'::jsonb,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance and sorting
CREATE INDEX IF NOT EXISTS idx_trends_score ON trends(score DESC);
CREATE INDEX IF NOT EXISTS idx_trends_created_at ON trends(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at) WHERE published_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
