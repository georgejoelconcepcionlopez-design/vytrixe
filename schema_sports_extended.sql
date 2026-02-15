
-- 1. Sports Matches Table
create table if not exists sports_matches (
  id uuid default uuid_generate_v4() primary key,
  country_code text references countries(code) not null,
  league text not null,
  home_team text not null,
  away_team text not null,
  home_score int default 0,
  away_score int default 0,
  status text not null, -- 'LIVE', 'FINISHED', 'SCHEDULED'
  match_time timestamptz not null,
  is_live boolean default false,
  created_at timestamptz default now()
);

-- 2. Team Stats Table
create table if not exists teams_stats (
  id uuid default uuid_generate_v4() primary key,
  country_code text references countries(code) not null,
  team_name text not null,
  league text not null,
  wins int default 0,
  losses int default 0,
  draws int default 0,
  points int default 0,
  popularity_score float default 0,
  updated_at timestamptz default now()
);

-- 3. Indexes
create index if not exists idx_matches_live on sports_matches(country_code, is_live) where is_live = true;
create index if not exists idx_stats_points on teams_stats(country_code, points desc);

-- 4. RLS
alter table sports_matches enable row level security;
alter table teams_stats enable row level security;

create policy "Public matches view" on sports_matches for select using (true);
create policy "Public stats view" on teams_stats for select using (true);

-- 5. Build Verification RPC
create or replace function public.check_sports_extended_schema()
returns json
language plpgsql security definer
as $$
declare
  has_matches boolean;
  has_stats boolean;
begin
  select exists (select from information_schema.tables where table_name = 'sports_matches') into has_matches;
  select exists (select from information_schema.tables where table_name = 'teams_stats') into has_stats;
  
  return json_build_object('matches_table', has_matches, 'stats_table', has_stats);
end;
$$;
