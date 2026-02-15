
-- 1. Authors Table
create table if not exists authors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  bio text,
  credentials text, -- e.g. "Senior Market Analyst", "Crypto Expert"
  avatar_url text,
  twitter_url text,
  linkedin_url text,
  created_at timestamptz default now()
);

-- 2. Categories Table
create table if not exists categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  icon text, -- lucide icon name
  created_at timestamptz default now()
);

-- 3. Add Author and Category to Trend Articles & Trends
alter table trend_articles add column if not exists author_id uuid references authors(id) on delete set null;
alter table trend_articles add column if not exists category_id uuid references categories(id) on delete set null;
alter table trends add column if not exists category_id uuid references categories(id) on delete set null;

-- Seed initial data
insert into authors (name, slug, bio, credentials, avatar_url) values
('Marcus Thorne', 'marcus-thorne', 'Chief Market Analyst at TrendNova with 15+ years of experience in predictive analytics.', 'Senior Intelligence Lead', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'),
('Sarah Jenkins', 'sarah-jenkins', 'Specializes in digital culture and viral momentum. Former tech journalist.', 'Digital Culture Specialist', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'),
('Dr. Elena Vance', 'elena-vance', 'PhD in Data Science. Leading the algorithmic scoring research at TrendNova.', 'Head of Data Science', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena')
on conflict (slug) do nothing;

insert into categories (name, slug, description, icon) values
('AI & Emerging Tech', 'ai-tech', 'Deep dives into artificial intelligence, machine learning, and future hardware.', 'cpu'),
('Finance & Crypto', 'finance', 'Market signals, cryptocurrency breakouts, and global economic trends.', 'trending-up'),
('Consumer Culture', 'consumer', 'What people are buying, watching, and discussing globally.', 'shopping-bag'),
('Sports Intelligence', 'sports', 'Data-driven insights into global sporting events and athlete momentum.', 'trophy')
on conflict (slug) do nothing;

-- RLS
alter table authors enable row level security;
alter table categories enable row level security;

create policy "Authors viewable by everyone" on authors for select using (true);
create policy "Categories viewable by everyone" on categories for select using (true);
create policy "Admin can manage authors" on authors for all using (true); -- Simplified for setup
create policy "Admin can manage categories" on categories for all using (true);
