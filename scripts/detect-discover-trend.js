const https = require('https');
const fs = require('fs');
const path = require('path');
const Parser = require('rss-parser');
const parser = new Parser();

const GOOGLE_TRENDS_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=US';

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml'
    }
};

console.log("Fetching trends for Google Discover...");

https.get(GOOGLE_TRENDS_URL, options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', async () => {
        if (res.statusCode !== 200) {
            console.error(`Status Code: ${res.statusCode}`);
            useFallback();
            return;
        }

        try {
            const feed = await parser.parseString(data);

            // Look for high-engagement tech/finance topics
            const keywords = ['Nvidia', 'OpenAI', 'Crypto', 'Bitcoin', 'Tesla', 'Apple', 'Crash', 'Surge', 'Breakthrough', 'Warning', 'Alert'];
            let selectedTrend = null;

            for (const item of feed.items) {
                const title = item.title || '';
                if (keywords.some(kw => title.toLowerCase().includes(kw.toLowerCase()))) {
                    selectedTrend = item;
                    break;
                }
            }

            if (selectedTrend) {
                console.log("Found Discover Trend:", selectedTrend.title);
                generatePrompt(selectedTrend);
            } else {
                console.log("No specific high-engagement trend found.");
                useFallback(); // Fallback to a guaranteed engagement topic
            }

        } catch (e) {
            console.error("Parse error:", e);
            useFallback();
        }
    });

}).on('error', (e) => {
    console.error("Network error:", e);
    useFallback();
});

function useFallback() {
    console.log("Using Fallback Discover Trend.");
    // 2026 Context Fallback - High Engagement
    generatePrompt({
        title: "Bitcoin Power Law",
        'ht:approx_traffic': "10M+",
        'ht:news_item': [{
            'ht:news_item_title': "Bitcoin Breaks $150k Barrier: The Power Law Model Was Right",
            'ht:news_item_url': "https://vytrixe.com/news/bitcoin-150k"
        }]
    });
}

function generatePrompt(trend) {
    const topic = trend.title;
    const traffic = trend['ht:approx_traffic'] || 'High';
    const newsItems = trend['ht:news_item'] || [];
    const newsTitle = newsItems.length > 0 ? newsItems[0]['ht:news_item_title'] : 'Breaking News';

    // Google Discover optimization: Emotional, Curiosity, Listicle

    const prompt = `
# Article Generation Task: Google Discover - ${topic}

**Source Trend**: ${topic} (Traffic: ${traffic})
**Target Audience**: Mobile users, detailed interest, high engagement.

## Article Requirements
- **Style**: Magazine-quality feature, Google Discover optimized.
- **Length**: 1200+ words.
- **Visuals**: Primary focus on large, high-res imagery instructions.

## 1. Headlines & Metadata
- **Main SEO Title**: "${topic}: Why Experts Are Calling This The 'Event of the Decade'"
- **Alternative Viral Title**: "The Simple Reason ${topic} Changes Everything For Investors"
- **Meta Description**: "It’s not just hype. New data reveals why ${topic} is signaling a massive shift in the market. Here are the 5 charts you need to see." (155 chars)

## 2. Structure & Hooks
### **The Hook (First 100 Words)**
- Start with a strong statement or a question.
- "If you looked at the charts yesterday, you might have missed the single most important signal in the last 10 years."
- **Formatting**: Short sentences. Bold key phrases.

### **The "Why Now" Section**
- Explain the urgency. Why is this trending *today*?
- Use bullet points for readability on mobile.

### **5 Key Takeaways (Listicle Format)**
1. **The Numbers Don't Lie**: Deep dive into the data.
2. **Institutional Activity**: Who is buying/selling?
3. **The 'X' Factor**: The hidden variable nobody is talking about.
4. **Historical Context**: How this compares to 2000 or 2008.
5. **The 2026 Projection**: Where we go from here.

### **Actionable Advice**
- "Here’s what to watch for in the next 48 hours."

## 3. Visual Prompting (Critical for Discover)
- **Featured Image**: "High-contrast, 3D render of a glowing gold Bitcoin symbol (or relevant icon for ${topic}) shattering a glass ceiling, dark background with neon teal highlights, 16:9 aspect ratio."
- **Chart Placeholder**: "Insert interactive chart showing 5-year growth trajectory."

## 4. Internal Linking Strategy
- "If you missed our coverage on [Previous Related Trend], catch up here."
- Link to /topic/markets
- Link to /topic/crypto (if applicable)

## 5. Structured Data (JSON-LD)
- schema.org/NewsArticle
- headline: (Viral Title)
- image: (Featured Image URL)
`;

    const outputPath = path.join(process.cwd(), 'article_task_discover.md');
    fs.writeFileSync(outputPath, prompt);
    console.log(`Discover Prompt saved to ${outputPath}`);
}
