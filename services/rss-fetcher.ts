import Parser from 'rss-parser';

export interface RawTrend {
    title: string;
    source: string;
    url?: string;
    published_at?: Date;
    upvotes?: number;
    comments?: number;
}

const parser = new Parser();

const RSS_FEEDS = [
    { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
    { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/' },
    { name: 'Wired', url: 'https://www.wired.com/feed/rss' },
    { name: 'Nvidia Blog', url: 'https://blogs.nvidia.com/feed/' }
];

export async function fetchRSSTrends(): Promise<RawTrend[]> {
    const trends: RawTrend[] = [];

    for (const feed of RSS_FEEDS) {
        try {
            const feedData = await parser.parseURL(feed.url);
            // Get top 5 recent items per feed
            const items = feedData.items.slice(0, 5);

            items.forEach(item => {
                if (item.title && item.link) {
                    trends.push({
                        title: item.title,
                        source: `RSS - ${feed.name}`,
                        url: item.link,
                        published_at: item.isoDate ? new Date(item.isoDate) : new Date()
                    });
                }
            });
        } catch (error) {
            console.error(`[RSS Fetcher] Failed to fetch feed ${feed.name}:`, error);
        }
    }

    return trends;
}
