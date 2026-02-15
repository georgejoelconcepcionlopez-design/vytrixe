# Environment Requirements

To run the TrendNova News Portal, the following environment variables are required in your `.env.local` file:

## Database
- `NEXT_PUBLIC_SUPABASE_URL`: (Existing) Supabase URL for Trends & Sports data.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Existing) Supabase Anon Key.
- `MONGODB_URI`: **[NEW]** Your MongoDB connection string.

## News & AI
- `NEWS_API_KEY`: **[NEW]** API Key from [NewsAPI.org](https://newsapi.org/) or similar news provider.
- `OPENAI_API_KEY`: **[NEW]** OpenAI API key for article rewriting.

## Admin
- `ADMIN_API_KEY`: **[NEW]** A secure string to protect your sync/refresh endpoints.
