-- Create the news table for TrendNova
CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    image TEXT,
    category TEXT,
    source TEXT,
    author TEXT DEFAULT 'TrendNova AI',
    views INTEGER DEFAULT 0,
    is_trending BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON news
    FOR SELECT USING (true);

-- Create policy to allow admin insert/update/delete (Requires service role or authenticated admin)
-- Note: Assuming admin operations are done via API route with service role for now.
CREATE POLICY "Allow service role all access" ON news
    FOR ALL USING (auth.role() = 'service_role');

-- Create an index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_news_slug ON news (slug);

-- Create an index on category for hub pages
CREATE INDEX IF NOT EXISTS idx_news_category ON news (category);

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON news
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();
