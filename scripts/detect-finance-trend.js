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

console.log("Fetching finance trends...");

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

            const financeKeywords = ['Stock', 'Market', 'Finance', 'Crypto', 'Bitcoin', 'Earnings', 'Revenue', 'Economy', 'Fed', 'Rate', 'Inflation', 'Nvidia', 'Tesla', 'Apple', 'MicroStrategy', 'Dow', 'Nasdaq', 'S&P'];
            let selectedTrend = null;

            for (const item of feed.items) {
                const title = item.title || '';
                // Check title and traffic/news titles
                if (financeKeywords.some(kw => title.toLowerCase().includes(kw.toLowerCase()))) {
                    selectedTrend = item;
                    break;
                }
            }

            if (selectedTrend) {
                console.log("Found Finance Trend:", selectedTrend.title);
                generatePrompt(selectedTrend);
            } else {
                console.log("No specific Finance trend found.");
                useFallback();
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
    console.log("Using Fallback Finance Trend.");
    // 2026 Context Fallback
    generatePrompt({
        title: "Nvidia Q4 Earnings",
        'ht:approx_traffic': "5M+",
        'ht:news_item': [{
            'ht:news_item_title': "Nvidia Shatters Estimates with $40B Revenue Guidance",
            'ht:news_item_url': "https://vytrixe.com/news/nvidia-earnings"
        }]
    });
}

function generatePrompt(trend) {
    const topic = trend.title;
    const traffic = trend['ht:approx_traffic'] || 'High';
    const newsItems = trend['ht:news_item'] || [];
    const newsTitle = newsItems.length > 0 ? newsItems[0]['ht:news_item_title'] : 'Market Alert';
    const newsUrl = newsItems.length > 0 ? newsItems[0]['ht:news_item_url'] : '#';

    const prompt = `
# Article Generation Task: ${topic}

**Source Trend**: ${topic} (Traffic: ${traffic})
**Context**: ${newsTitle} - ${newsUrl}

## Article Requirements
- **Topic**: ${topic} (Focus on Financial Markets)
- **Length**: 1200+ words
- **Tone**: Analytical, Investor-Focused, Data-Driven
- **SEO Keyword**: "${topic} stock forecast", "${topic} analysis", "${topic} reaction"

## Structure
1. **Title**: SEO-Optimized Title (e.g., "${topic}: Market Reaction & 2026 Price Targets")
2. **Meta Description**: 155 chars, highlighting key metrics.
3. **Sections**:
   - **Introduction**: Market context, opening price reaction.
   - **Market Relevance**: (H2) Why this moves the index/sector.
   - **Data & Metrics**: (H2) Key revenue/earnings numbers vs expectations.
   - **Financial Implication**: (H2) Institutional flows and analyst upgrades/downgrades.
   - **Long-term Projection**: (H2) 12-month outlook and sector rotation effects.
   - **Conclusion**: Buy/Sell/Hold context (educational only).

## Internal Linking
- Link to: /topic/markets
- Link to: /topic/crypto (if applicable)
- Link to: /news/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}

## Featured Image Prompt
"Financial dashboard visualization of ${topic}, bullish green charts, neon data overlay, cinematic depth of field, 8k resolution."
`;

    // Write to artifact directly
    // Note: In real agent execution we write to a file first.
    // The agent will then pick it up.
    // I will write to 'article_task_finance.md' in the artifacts dir is tricky from here without abs path?
    // I'll write to local cwd and let the agent move/read it.
    const outputPath = path.join(process.cwd(), 'article_task_finance.md');
    fs.writeFileSync(outputPath, prompt);
    console.log(`Finance Prompt saved to ${outputPath}`);
}
