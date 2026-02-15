
-- Trend Articles Table for SEO content
create table if not exists trend_articles (
  id uuid default uuid_generate_v4() primary key,
  trend_id text not null, -- Can function as a slug or ID
  country_code text references countries(code) not null,
  seo_title text,
  seo_description text,
  content_html text, -- Storing as text (JSON stringified or raw HTML)
  created_at timestamptz default now()
);

-- Index for fast lookup by slug/trend_id
create index if not exists idx_articles_trend_country on trend_articles(trend_id, country_code);
create index if not exists idx_trend_articles_trend_id on trend_articles(trend_id);

-- Prevent duplicates
alter table trend_articles add constraint trend_articles_trend_country_key unique (trend_id, country_code);

-- RLS
alter table trend_articles enable row level security;
create policy "Public articles view" on trend_articles for select using (true);
create policy "Anon can insert articles" on trend_articles for insert with check (true);
create policy "Anon can update articles" on trend_articles for update using (true);
