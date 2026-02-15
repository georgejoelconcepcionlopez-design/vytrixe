
-- Update Trends Table
alter table trends 
add column if not exists growth_percent float default 0,
add column if not exists category text default 'general';

-- Add Indexes for Performance
create index if not exists trends_country_score_idx on trends (country_code, score desc);
create index if not exists trends_growth_idx on trends (growth_percent desc);

-- Helper RPC to verify schema from client (Next.js API)
create or replace function public.check_trends_schema()
returns json
language plpgsql security definer
as $$
declare
  found_cols text[];
  found_idxs text[];
begin
  -- Check columns
  select array_agg(column_name::text) into found_cols
  from information_schema.columns
  where table_name = 'trends' and column_name in ('growth_percent', 'category');
  
  -- Check indexes
  select array_agg(indexname::text) into found_idxs
  from pg_indexes
  where tablename = 'trends' and indexname in ('trends_country_score_idx', 'trends_growth_idx');
  
  return json_build_object(
    'columns', coalesce(found_cols, array[]::text[]), 
    'indexes', coalesce(found_idxs, array[]::text[])
  );
end;
$$;
