-- Ensure 'news' table has the SEO automation columns
-- The frontend is reading from 'news', so we must apply changes here.

DO $$ 
BEGIN 
    -- Add columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'revenue_focus') THEN
        ALTER TABLE news ADD COLUMN revenue_focus TEXT DEFAULT 'general';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'trend_score') THEN
        ALTER TABLE news ADD COLUMN trend_score FLOAT DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'status') THEN
        -- Safely cast or default if needed, assuming text or enum
        ALTER TABLE news ADD COLUMN status TEXT DEFAULT 'published'; 
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'meta_title') THEN
        ALTER TABLE news ADD COLUMN meta_title TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'meta_description') THEN
        ALTER TABLE news ADD COLUMN meta_description TEXT;
    END IF;
END $$;
