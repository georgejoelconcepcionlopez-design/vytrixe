const https = require('https');
const fs = require('fs');
const path = require('path');
// Import xml2js (RSS Parser dependency usually has it or similar)
// Or use regex for a quick hack since we just want the first title.
// Actually, let's use rss-parser if available, but feed it the string.
const Parser = require('rss-parser');
const parser = new Parser();

const GOOGLE_TRENDS_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=US';

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml'
    }
};

console.log("Fetching trends via https...");

https.get(GOOGLE_TRENDS_URL, options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', async () => {
        if (res.statusCode !== 200) {
            console.error(`Status Code: ${res.statusCode}`);
            // Fallback
            useFallback();
            return;
        }

        try {
            const feed = await parser.parseString(data);
            console.log(`Parsed ${feed.items.length} items.`);

            const aiKeywords = ['AI', 'Intelligence', 'Nvidia', 'OpenAI', 'GPT', 'Robot', 'Machine', 'Google', 'Microsoft', 'Meta', 'LLM', 'Chip', 'Data', 'Tech', 'Cyber', 'DeepSeek', 'Model'];
            let selectedTrend = null;

            for (const item of feed.items) {
                const title = item.title || '';
                if (aiKeywords.some(kw => title.toLowerCase().includes(kw.toLowerCase()))) {
                    selectedTrend = item;
                    break;
                }
            }

            if (!selectedTrend && feed.items.length > 0) {
                selectedTrend = feed.items[0];
                console.log("No specific AI trend found, using top trend:", selectedTrend.title);
            }

            if (selectedTrend) {
                generatePrompt(selectedTrend);
            } else {
                console.error("No trends found in feed.");
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
    console.log("Using Fallback Data.");
    generatePrompt({
        title: "DeepSeek-V3",
        'ht:approx_traffic': "2M+",
        'ht:news_item': [{
            'ht:news_item_title': "DeepSeek-V3 Open Source Model Challenges GPT-4",
            'ht:news_item_url': "https://example.com/deepseek"
        }]
    });
}

function generatePrompt(trend) {
    const topic = trend.title;
    const traffic = trend['ht:approx_traffic'] || 'High';
    const newsItems = trend['ht:news_item'] || [];
    const newsTitle = newsItems.length > 0 ? newsItems[0]['ht:news_item_title'] : 'Breaking News';
    const newsUrl = newsItems.length > 0 ? newsItems[0]['ht:news_item_url'] : '#';

    // Create the artifact format
    const prompt = `
# Article Generation Task: ${topic}

**Source Trend**: ${topic} (Traffic: ${traffic})
**Context**: ${newsTitle} - ${newsUrl}

## Article Requirements
- **Topic**: ${topic} (Focus on AI/Market impact)
- **Length**: 1200+ words
- **Tone**: Professional, Analytical, authoritative (Vytrixe Style)
- **SEO Keyword**: "${topic}", "${topic} AI impact", "${topic} investment"

## Structure
1. **Title**: Generate an SEO-optimized title (Max 60 chars) invoking urgency or magnitude.
2. **Meta Description**: 155 chars, summary + call to action.
3. **Sections**:
   - **Introduction**: Hook the reader, define the trend event.
   - **Why This Matters**: (H2) Immediate relevance to enterprise/investors.
   - **Market Impact**: (H2) Quantitative analysis (cite potential stats).
   - **Enterprise Adoption**: (H2) How businesses are using/reacting to this.
   - **Investment Outlook**: (H2) "Pick-and-shovel" plays, stock implications.
   - **Conclusion**: Final thought + strategic advice.

## Internal Linking
- Link to: /topic/ai
- Link to: /topic/tech
- Link to: /news/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}

## Featured Image Prompt
"Futuristic visualization of ${topic}, digital art, highly detailed, neon cyan and dark blue color palette, 8k resolution, cinematic lighting."
`;

    const outputPath = path.join(process.cwd(), 'TREND_PROMPT.md');
    fs.writeFileSync(outputPath, prompt);
    console.log(`Prompt saved to ${outputPath}`);
}
