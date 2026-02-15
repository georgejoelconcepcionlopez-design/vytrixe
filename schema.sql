-- Enable Extensions
create extension if not exists "uuid-ossp";

-- 1. Countries table
create table countries (
  code text primary key, -- 'us', 'mx', etc.
  name text not null,
  flag_emoji text,
  created_at timestamptz default now()
);

-- Seed initial countries
insert into countries (code, name, flag_emoji) values
('us', 'United States', '🇺🇸'),
('mx', 'Mexico', '🇲🇽'),
('es', 'Spain', '🇪🇸'),
('do', 'Dominican Republic', '🇩🇴')
on conflict (code) do nothing;

-- 2. User Profiles (linked to auth.users)
create type user_role as enum ('free', 'pro', 'admin');

create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role user_role default 'free',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Trends
create table trends (
  id uuid default uuid_generate_v4() primary key,
  country_code text references countries(code) not null,
  title text not null,
  slug text not null,
  query text not null, -- The search query
  volume int default 0,
  score float default 0,
  is_active boolean default true,
  last_updated timestamptz default now(),
  created_at timestamptz default now(),
  unique(country_code, slug)
);

-- 4. Trend History (for analytics/graphs)
create table trend_history (
  id uuid default uuid_generate_v4() primary key,
  trend_id uuid references trends(id) on delete cascade not null,
  volume int,
  score float,
  captured_at timestamptz default now()
);

-- 5. Articles (News associated with trends)
create table articles (
  id uuid default uuid_generate_v4() primary key,
  trend_id uuid references trends(id) on delete cascade not null,
  title text not null,
  url text not null,
  source text,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- 6. Favorites (User saved trends)
create table favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  trend_id uuid references trends(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, trend_id)
);

-- 7. Alerts (Notifications for users)
create table alerts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  trend_id uuid references trends(id) on delete cascade, 
  keyword text, -- Create alert by keyword manually?
  threshold_score float,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Row Level Security (RLS)
alter table countries enable row level security;
alter table users enable row level security;
alter table trends enable row level security;
alter table trend_history enable row level security;
alter table articles enable row level security;
alter table favorites enable row level security;
alter table alerts enable row level security;

-- Policies (Simplified for Base)
-- Public read for countries/trends/articles
create policy "Public countries are viewable by everyone" on countries for select using (true);
create policy "Public trends are viewable by everyone" on trends for select using (true);
create policy "Public history are viewable by everyone" on trend_history for select using (true);
create policy "Public articles are viewable by everyone" on articles for select using (true);

-- User policies
create policy "Users can see their own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);

create policy "Users can see own favorites" on favorites for select using (auth.uid() = user_id);
create policy "Users can insert own favorites" on favorites for insert with check (auth.uid() = user_id);
create policy "Users can delete own favorites" on favorites for delete using (auth.uid() = user_id);

create policy "Users can see own alerts" on alerts for select using (auth.uid() = user_id);
create policy "Users can manage own alerts" on alerts for all using (auth.uid() = user_id);

-- 8. Vytrixe Scalable Articles (Bilingual & Premium)
CREATE TYPE article_status AS ENUM ('draft', 'pending-review', 'published');
CREATE TYPE article_category AS ENUM ('ai', 'tech', 'startups', 'crypto', 'trending');

CREATE TABLE vytrixe_articles (
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
  -- Structure: { en: { title, summary, body, meta... }, es: { ... } }
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Metadata (AI/SEO future proofing)
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_vytrixe_articles_slug ON vytrixe_articles(slug);
CREATE INDEX idx_vytrixe_articles_published_at ON vytrixe_articles(published_at) WHERE status = 'published';
CREATE INDEX idx_vytrixe_articles_content ON vytrixe_articles USING GIN (content);

-- RLS
ALTER TABLE vytrixe_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published articles" ON vytrixe_articles FOR SELECT USING (status = 'published' AND published_at <= now());
CREATE POLICY "Admins have full access" ON vytrixe_articles FOR ALL USING (auth.role() = 'service_role' OR auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
