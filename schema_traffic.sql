
-- Traffic Efficiency & Subscribers
-- Used for the newsletter and traffic engine

CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    source TEXT DEFAULT 'homepage',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- RLS
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe" 
ON subscribers FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view subscribers" 
ON subscribers FOR SELECT 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email LIKE '%@trendnova.com')); 
-- Note: In a real app, use a proper roles table. This is a shorthand for the MVP.
