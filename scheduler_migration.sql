-- Enable pg_cron and pg_net extensions
-- Note: These extensions must be enabled in your Supabase Dashboard if this script fails.
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the Schedule
-- Runs every 5 minutes
-- Replace 'YOUR_PROJECT_URL' and 'YOUR_CRON_SECRET' with actual values from your environment.
-- Since we cannot inject env vars into SQL easily here, this is a template.

SELECT cron.schedule(
    'vytrixe-auto-publish', -- Job name
    '*/5 * * * *',          -- Every 5 minutes
    $$
    select
        net.http_get(
            url:='https://vytrixe.com/api/cron/publish',
            headers:='{"Authorization": "Bearer YOUR_CRON_SECRET"}'::jsonb
        ) as request_id;
    $$
);

-- To verify: select * from cron.job;
-- To unschedule: select cron.unschedule('vytrixe-auto-publish');
