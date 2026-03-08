import { RawTrend } from './rss-fetcher';

const SUBREDDITS = ['technology', 'artificial', 'CryptoCurrency', 'startups', 'worldnews'];

export async function fetchRedditTrends(): Promise<RawTrend[]> {
    const trends: RawTrend[] = [];

    for (const sub of SUBREDDITS) {
        try {
            const response = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=5`, {
                headers: {
                    'User-Agent': 'VytrixeTrendEngine/1.0.0'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const posts = data.data?.children || [];

            posts.forEach((post: any) => {
                const item = post.data;
                // Ignore stickied posts or those without sufficient score
                if (!item.stickied && item.score > 50) {
                    trends.push({
                        title: item.title,
                        source: `Reddit - r/${sub}`,
                        url: `https://reddit.com${item.permalink}`,
                        published_at: new Date(item.created_utc * 1000)
                    });
                }
            });

        } catch (error) {
            console.error(`[Reddit Fetcher] Failed to fetch subreddit r/${sub}:`, error);
        }
    }

    return trends;
}
