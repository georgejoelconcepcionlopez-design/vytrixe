-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('free', 'pro', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Categories
INSERT INTO categories (name, slug) VALUES 
('AI', 'ai'),
('Technology', 'technology'),
('Crypto', 'crypto'),
('Startups', 'startups'),
('Business', 'business'),
('Viral', 'viral'),
('Tools', 'tools')
ON CONFLICT (slug) DO NOTHING;

-- 3. Tags
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Authors
CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  is_ai BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed an AI Author
INSERT INTO authors (name, bio, is_ai) VALUES 
('Vytrixe AI', 'Automated intelligence and trends agent.', true)
ON CONFLICT DO NOTHING;

-- 5. Trending Topics
CREATE TABLE IF NOT EXISTS trending_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  category TEXT REFERENCES categories(slug) ON DELETE SET NULL,
  score FLOAT DEFAULT 0,
  source TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  processed BOOLEAN DEFAULT false
);

-- 6. Images
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  alt_text TEXT,
  format TEXT, -- 16:9, etc.
  resolution TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. SEO Metadata
CREATE TABLE IF NOT EXISTS seo_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  twitter_card TEXT,
  schema_markup JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Ad Settings
CREATE TABLE IF NOT EXISTS ad_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  placement_name TEXT UNIQUE NOT NULL,
  ad_code TEXT,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed ad placeholders
INSERT INTO ad_settings (placement_name, ad_code) VALUES
('home_top', '<!-- Adsterra Banner -->'),
('article_mid', '<!-- Adsterra Native -->'),
('feed_inline', '<!-- Adsterra Inline -->'),
('sidebar', '<!-- Adsterra Sidebar -->')
ON CONFLICT (placement_name) DO NOTHING;

-- 9. Articles
DO $$ BEGIN
    CREATE TYPE article_status AS ENUM ('draft', 'pending-review', 'scheduled', 'published');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE RESTRICT,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  seo_id UUID REFERENCES seo_metadata(id) ON DELETE SET NULL,
  status article_status NOT NULL DEFAULT 'draft',
  
  -- Bilingual Content
  -- en: { title, subtitle, excerpt, content, faq }, es: { ... }
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  image_url TEXT,
  
  -- Publish Scheduling
  published_at TIMESTAMPTZ,
  auto_publish_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Article_Tags association
CREATE TABLE IF NOT EXISTS article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_trending_topics_score ON trending_topics(score DESC);

-- RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE trending_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Public read for categories" ON categories FOR SELECT USING (true);
    CREATE POLICY "Public read for tags" ON tags FOR SELECT USING (true);
    CREATE POLICY "Public read for authors" ON authors FOR SELECT USING (true);
    CREATE POLICY "Public read for trending" ON trending_topics FOR SELECT USING (processed = false);
    CREATE POLICY "Public read for published articles" ON articles FOR SELECT USING (status = 'published' AND published_at <= now());
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 11. SEO Pages
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON seo_pages(slug);
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
    CREATE POLICY "Public read for seo pages" ON seo_pages FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
