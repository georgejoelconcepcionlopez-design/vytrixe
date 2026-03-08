import { fetchRSSTrends, RawTrend } from './rss-fetcher';
import { fetchRedditTrends } from './reddit-fetcher';
import { fetchTwitterTrends } from './twitter-fetcher';

export interface TrendTopic {
    title: string;
    keywords: string[];
    category: string;
    score: number;
    upvotes: number;
    comments: number;
    cross_source_hits: number;
    source: string;
    timestamp: Date;
}

export async function processAllTrends(): Promise<TrendTopic[]> {
    console.log('[Trend Engine] Initiating multi-source trend collection...');

    // 1. Fetch from all sources concurrently
    const [rssData, redditData, twitterData, googleData, hnData] = await Promise.all([
        fetchRSSTrends(),
        fetchRedditTrends(),
        fetchTwitterTrends(),
        fetchGoogleTrends(),
        fetchHackerNews()
    ]);

    const rawTrendsList: RawTrend[] = [...rssData, ...redditData, ...twitterData, ...googleData, ...hnData];

    // 2. Normalize and remove duplicates (similarity-based deduplication)
    const uniqueTrendsMap = new Map<string, RawTrend & { count: number }>();

    rawTrendsList.forEach(trend => {
        const normalizedTitle = trend.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, ' ');

        // Simple similarity: if normalized title is already present, increment hit count
        if (uniqueTrendsMap.has(normalizedTitle)) {
            const existing = uniqueTrendsMap.get(normalizedTitle)!;
            existing.count += 1;
            // Prefer Reddit/HN/Google for metadata if available
            if (trend.source.includes('Reddit') || trend.source.includes('Hacker News') || trend.source.includes('Google')) {
                existing.upvotes = (existing.upvotes || 0) + (trend.upvotes || 0);
                existing.comments = (existing.comments || 0) + (trend.comments || 0);
            }
        } else {
            uniqueTrendsMap.set(normalizedTitle, { ...trend, count: 1 });
        }
    });

    const uniqueRawTrends = Array.from(uniqueTrendsMap.values());

    // 3. Score and Classify
    const processedTrends: TrendTopic[] = uniqueRawTrends.map(raw => {
        const keywords = extractKeywords(raw.title);
        const category = categorizeTopic(keywords, raw.title);
        const score = scoreRawTrend(raw, raw.count);

        return {
            title: raw.title,
            keywords,
            category,
            score,
            upvotes: raw.upvotes || 0,
            comments: raw.comments || 0,
            cross_source_hits: raw.count,
            source: raw.source,
            timestamp: raw.published_at || new Date()
        };
    });

    // 4. Rank by score descending and take top 100
    processedTrends.sort((a, b) => b.score - a.score);
    const top100 = processedTrends.slice(0, 100);

    console.log(`[Trend Engine] Processed ${processedTrends.length} unique trends. Returning top 100.`);
    return top100;
}

// Simple keyword extractor
function extractKeywords(title: string): string[] {
    const commonWords = new Set(['the', 'and', 'for', 'in', 'to', 'of', 'a', 'with', 'on', 'is', 'at', 'by']);
    const words = title.split(/[^a-zA-Z0-9]/).filter(w => w.length > 3 && !commonWords.has(w.toLowerCase()));
    return Array.from(new Set(words)); // Unique words
}

// Simple topic classification based on keywords
function categorizeTopic(keywords: string[], title: string): string {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('ai') || lowerTitle.includes('openai') || lowerTitle.includes('chatgpt') || lowerTitle.includes('machine learning') || lowerTitle.includes('nvidia') || lowerTitle.includes('model')) {
        return 'ai';
    }
    if (lowerTitle.includes('crypto') || lowerTitle.includes('bitcoin') || lowerTitle.includes('ethereum') || lowerTitle.includes('blockchain') || lowerTitle.includes('web3')) {
        return 'crypto';
    }
    if (lowerTitle.includes('startup') || lowerTitle.includes('funding') || lowerTitle.includes('vc') || lowerTitle.includes('seed')) {
        return 'startups';
    }
    if (lowerTitle.includes('revenue') || lowerTitle.includes('acquired') || lowerTitle.includes('ceo') || lowerTitle.includes('market') || lowerTitle.includes('business')) {
        return 'business';
    }
    if (lowerTitle.includes('viral') || lowerTitle.includes('tiktok') || lowerTitle.includes('creator')) {
        return 'viral';
    }

    // Default fallback
    return 'technology';
}

async function fetchHackerNews(): Promise<RawTrend[]> {
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const ids = await response.json();
        const top50 = ids.slice(0, 50);

        const stories = await Promise.all(top50.map(async (id: number) => {
            const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return res.json();
        }));

        return stories.map(s => ({
            title: s.title,
            source: 'Hacker News',
            url: `https://news.ycombinator.com/item?id=${s.id}`,
            published_at: new Date(s.time * 1000),
            upvotes: s.score || 0,
            comments: s.descendants || 0
        }));
    } catch (e) {
        console.error('[Trend Engine] HN fetch failed:', e);
        return [];
    }
}

async function fetchGoogleTrends(): Promise<RawTrend[]> {
    try {
        const parser = new (await import('rss-parser')).default();
        const feed = await parser.parseURL('https://trends.google.com/trends/trendingsearches/daily/rss?geo=US');
        return feed.items.map(item => ({
            title: item.title || 'Unknown Trend',
            source: 'Google Trends',
            url: item.link || '',
            published_at: item.isoDate ? new Date(item.isoDate) : new Date()
        }));
    } catch (error) {
        console.error('[Trend Engine] Google Trends fetch failed:', error);
        return [];
    }
}

// Advanced Scoring Algorithm: (upvotes * 0.4) + (comments * 0.3) + (cross_source_hits * 0.3)
export function calculateScore(upvotes: number = 0, comments: number = 0, hits: number = 1): number {
    const upvotesWeight = 0.4;
    const commentsWeight = 0.3;
    const crossSourceWeight = 0.3;

    // Normalize upvotes and comments (roughly)
    const normUpvotes = Math.min(upvotes / 100, 100);
    const normComments = Math.min(comments / 50, 100);
    const normCross = Math.min(hits * 20, 100);

    return (normUpvotes * upvotesWeight) + (normComments * commentsWeight) + (normCross * crossSourceWeight);
}

// Internal wrapper for RawTrend scoring
function scoreRawTrend(raw: RawTrend, count: number): number {
    let score = calculateScore(raw.upvotes || 0, raw.comments || 0, count);

    // Time Decay: decay factor of 0.95 every 4 hours
    const hoursOld = (Date.now() - (raw.published_at?.getTime() || Date.now())) / (1000 * 60 * 60);
    const decay = Math.pow(0.95, hoursOld / 4);

    score = score * decay * 100; // Scale to 0-100+

    // Source Boost
    if (raw.source.includes('Google Trends')) score += 20;
    if (raw.source.includes('Hacker News')) score += 10;

    return Math.min(Math.max(score, 0), 1000); // Allow high scores for viral content
}
