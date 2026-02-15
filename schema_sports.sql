
-- 1. Create Sports News Table
create table if not exists sports_news (
  id uuid default uuid_generate_v4() primary key,
  country_code text references countries(code) not null,
  title text not null,
  description text,
  source text,
  url text not null,
  image_url text,
  published_at timestamptz,
  category text default 'sports',
  popularity_score float default 0,
  created_at timestamptz default now()
);

-- 2. Create Index for Performance
create index if not exists idx_sports_country_popularity 
on sports_news(country_code, popularity_score desc);

-- 3. Enable RLS
alter table sports_news enable row level security;

-- 4. Create Policy (Public Read)
create policy "Public sports news are viewable by everyone" 
on sports_news for select using (true);

-- 5. Helper RPC to check sports schema (Optional, reusing pattern)
create or replace function public.check_sports_schema()
returns json
language plpgsql security definer
as $$
declare
  found_table boolean;
begin
  select exists (
    select from information_schema.tables 
    where table_name = 'sports_news'
  ) into found_table;
  
  return json_build_object('table_exists', found_table);
end;
$$;
