-- Migration: Create Vytrixe Scalable Articles Table
-- Run this in your Supabase SQL Editor

-- 1. Create Enums (if they don't exist)
DO $$ BEGIN
    CREATE TYPE article_status AS ENUM ('draft', 'pending-review', 'published');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE article_category AS ENUM ('ai', 'tech', 'startups', 'crypto', 'trending');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Table
CREATE TABLE IF NOT EXISTS vytrixe_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  category article_category NOT NULL,
  status article_status NOT NULL DEFAULT 'draft',
  
  -- Flags
  is_breaking BOOLEAN DEFAULT false,
  is_live BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  
  -- Media
  image_url TEXT,
  
  -- Timestamps
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  auto_publish_at TIMESTAMPTZ,
  
  -- Content (Bilingual JSONB)
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- 3. Create Indexes
CREATE INDEX IF NOT EXISTS idx_vytrixe_articles_slug ON vytrixe_articles(slug);
CREATE INDEX IF NOT EXISTS idx_vytrixe_articles_published_at ON vytrixe_articles(published_at) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_vytrixe_articles_content ON vytrixe_articles USING GIN (content);

-- 4. RLS Policies
ALTER TABLE vytrixe_articles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Public can view published articles" ON vytrixe_articles FOR SELECT USING (status = 'published' AND published_at <= now());
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Admins have full access" ON vytrixe_articles FOR ALL USING (auth.role() = 'service_role' OR auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
