
-- Expansion Logging Setup
-- Run this in the Supabase SQL Editor

create table if not exists public.expansion_log (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.categories(id) on delete set null,
  trend_id text not null,
  status text not null, -- 'success', 'error'
  message text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.expansion_log enable row level security;

-- Policies for anon access (API access)
drop policy if exists "Allow anon insert" on public.expansion_log;
create policy "Allow anon insert" on public.expansion_log 
for insert with check (true);

drop policy if exists "Allow anon select" on public.expansion_log;
create policy "Allow anon select" on public.expansion_log 
for select using (true);

-- Index for performance
create index if not exists idx_expansion_log_trend on public.expansion_log(trend_id);
create index if not exists idx_expansion_log_status on public.expansion_log(status);
