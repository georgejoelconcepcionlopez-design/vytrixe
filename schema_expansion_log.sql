
-- 8. Expansion Logs for monitoring
create table if not exists expansion_log (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references categories(id),
  trend_id text,
  status text, -- 'success', 'error'
  message text,
  created_at timestamptz default now()
);

-- RLS for logs
alter table expansion_log enable row level security;
create policy "Anon can insert expansion_log" on expansion_log for insert with check (true);
create policy "Anon can select expansion_log" on expansion_log for select using (true);
