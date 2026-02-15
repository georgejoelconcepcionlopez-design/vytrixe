import Parser from 'rss-parser';
import * as cheerio from 'cheerio';

const parser = new Parser();

export interface TrendItem {
    title: string;
    description?: string;
    link: string;
    source: string;
    pubDate: string;
    score: number;
    category: 'ai' | 'tech' | 'crypto' | 'finance' | 'general';
}

export class TrendEngine {

    // 1. Google Trends (Daily Search Trends RSS)
    static async fetchGoogleTrends(geo = 'US'): Promise<TrendItem[]> {
        try {
            const feed = await parser.parseURL(`https://trends.google.com/trends/trendingsearches/daily/rss?geo=${geo}`);
            return feed.items.map(item => ({
                title: item.title || '',
                description: item.contentSnippet || '',
                link: item.link || '',
                source: 'Google Trends',
                pubDate: item.pubDate || new Date().toISOString(),
                score: 85, // Base score for Google Trends
                category: 'general' // Needs further classification
            }));
        } catch (error) {
            console.error('Error fetching Google Trends:', error);
            return [];
        }
    }

    // 2. CoinGecko Trending (Crypto AI Tokens)
    static async fetchCryptoTrends(): Promise<TrendItem[]> {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
            if (!response.ok) throw new Error('CoinGecko API Error');
            const data = await response.json();

            return data.coins.map((coin: any) => ({
                title: `${coin.item.name} (${coin.item.symbol})`,
                description: `Trending rank #${coin.item.market_cap_rank}. Price: ${coin.item.data.price}`,
                link: `https://www.coingecko.com/en/coins/${coin.item.id}`,
                source: 'CoinGecko',
                pubDate: new Date().toISOString(),
                score: 90, // High relevance for crypto audience
                category: 'crypto'
            }));
        } catch (error) {
            console.error('Error fetching CoinGecko:', error);
            return [];
        }
    }

    // 3. Industry RSS Feeds (AI & Tech)
    static async fetchIndustryNews(): Promise<TrendItem[]> {
        const feeds = [
            'https://openai.com/blog/rss.xml',
            'https://blogs.nvidia.com/feed/',
            'https://techcrunch.com/category/artificial-intelligence/feed/'
        ];

        let allItems: TrendItem[] = [];

        for (const url of feeds) {
            try {
                const feed = await parser.parseURL(url);
                const items = feed.items.slice(0, 3).map(item => ({
                    title: item.title || '',
                    description: item.contentSnippet || '',
                    link: item.link || '',
                    source: new URL(url).hostname,
                    pubDate: item.pubDate || new Date().toISOString(),
                    score: 75,
                    category: 'ai' as const
                }));
                allItems = [...allItems, ...items];
            } catch (e) {
                console.error(`Error fetching RSS ${url}:`, e);
            }
        }
        return allItems;
    }

    // Master Aggregator
    static async getTopTrends(): Promise<TrendItem[]> {
        const [google, crypto, news] = await Promise.all([
            this.fetchGoogleTrends(),
            this.fetchCryptoTrends(),
            this.fetchIndustryNews()
        ]);

        // Filter for AI/Tech keywords in Google Trends
        const aiKeywords = ['ai', 'artificial intelligence', 'nvidia', 'chatgpt', 'openai', 'robot', 'automation', 'data'];
        const filteredGoogle = google.filter(item =>
            aiKeywords.some(kw => item.title.toLowerCase().includes(kw))
        ).map(item => ({ ...item, category: 'ai' as const, score: 95 }));

        const all = [...filteredGoogle, ...crypto, ...news];

        // Sort by Score
        return all.sort((a, b) => b.score - a.score).slice(0, 10);
    }
}
