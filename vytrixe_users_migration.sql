-- Migration: Extend Users Table for Vytrixe Features
-- Run this in your Supabase SQL Editor

-- 1. Update Enums (Safe add)
DO $$ BEGIN
    ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'editor';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Extend Users Table
ALTER TABLE public.users 
  ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en',
  ADD COLUMN IF NOT EXISTS favorite_categories TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS newsletter_opt_in BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS notification_prefs JSONB DEFAULT '{"email": true, "push": false}'::jsonb,
  ADD COLUMN IF NOT EXISTS watchlist JSONB DEFAULT '[]'::jsonb; -- Array of symbols/IDs

-- 3. Indexing
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- 4. Update Trigger (Handle new fields on signup)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url, preferred_language)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'language', 'en')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
