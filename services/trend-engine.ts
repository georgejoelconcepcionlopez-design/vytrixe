import { fetchRSSTrends, RawTrend } from './rss-fetcher';
import { fetchRedditTrends } from './reddit-fetcher';
import { fetchTwitterTrends } from './twitter-fetcher';

export interface TrendTopic {
    title: string;
    keywords: string[];
    category: string;
    score: number;
    source: string;
    timestamp: Date;
}

export async function processAllTrends(): Promise<TrendTopic[]> {
    console.log('[Trend Engine] Initiating multi-source trend collection...');

    // 1. Fetch from all sources concurrently
    const [rssData, redditData, twitterData] = await Promise.all([
        fetchRSSTrends(),
        fetchRedditTrends(),
        fetchTwitterTrends()
    ]);

    const rawTrendsList: RawTrend[] = [...rssData, ...redditData, ...twitterData];

    // 2. Normalize and remove duplicates (by exact title or similarity)
    const uniqueTrendsMap = new Map<string, RawTrend>();
    rawTrendsList.forEach(trend => {
        // A simple normalization for deduplication
        const normalizedTitle = trend.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, ' ');
        // Keep the latest or first seen instance; here we just use the unique normalized title as key
        if (!uniqueTrendsMap.has(normalizedTitle)) {
            uniqueTrendsMap.set(normalizedTitle, trend);
        }
    });

    const uniqueRawTrends = Array.from(uniqueTrendsMap.values());

    // 3. Score and Classify
    const processedTrends: TrendTopic[] = uniqueRawTrends.map(raw => {
        const keywords = extractKeywords(raw.title);
        const category = categorizeTopic(keywords, raw.title);
        const score = calculateScore(raw.title, raw.source);

        return {
            title: raw.title,
            keywords,
            category,
            score,
            source: raw.source,
            timestamp: raw.published_at || new Date()
        };
    });

    // 4. Rank by score descending
    processedTrends.sort((a, b) => b.score - a.score);

    console.log(`[Trend Engine] Processed ${processedTrends.length} unique trends.`);
    return processedTrends;
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

// Simple heuristic scoring (0 to 100)
function calculateScore(title: string, source: string): number {
    let score = 50; // Base score

    // Give a boost if multiple sources or specific high-signal words are present
    const lowerTitle = title.toLowerCase();

    if (source.includes('Twitter')) score += 15;
    if (source.includes('Reddit')) score += 10;

    if (lowerTitle.includes('launch') || lowerTitle.includes('announce')) score += 20;
    if (lowerTitle.includes('exclusive') || lowerTitle.includes('break')) score += 15;
    if (lowerTitle.includes('fail') || lowerTitle.includes('crash')) score += 10;

    return Math.min(Math.max(score, 0), 100);
}
