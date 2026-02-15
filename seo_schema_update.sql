-- Add SEO Automation columns to vytrixe_articles
ALTER TABLE vytrixe_articles 
ADD COLUMN IF NOT EXISTS revenue_focus TEXT, -- e.g., 'high-cpm', 'enterprise', 'consumer'
ADD COLUMN IF NOT EXISTS trend_score FLOAT DEFAULT 0,
ADD COLUMN IF NOT EXISTS keyword_metrics JSONB DEFAULT '{}'::jsonb; -- { volume: 1000, cpc: 2.50 }

-- Update status type if needed (it matches already, but checking)
-- ALTER TYPE article_status ADD VALUE IF NOT EXISTS 'pending-review';
