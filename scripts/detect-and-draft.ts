import Parser from 'rss-parser';
import * as fs from 'fs';
import * as path from 'path';

const parser = new Parser();

const GOOGLE_TRENDS_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=US';

async function fetchTrends() {
    try {
        console.log("Fetching Trends...");
        const response = await fetch(GOOGLE_TRENDS_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.error(`Fetch failed: ${response.status} ${response.statusText}`);
            // Fallback to manual mock or alternative feed if 404
            if (response.status === 404 || response.status === 429) {
                console.log("Google Trends blocked/changed. Using fallback data for 'AI'.");
                generatePrompt({
                    title: "DeepSeek-V3",
                    'ht:approx_traffic': "2M+",
                    'ht:news_item': [{
                        'ht:news_item_title': "DeepSeek-V3 Open Source Model Challenges GPT-4",
                        'ht:news_item_url': "https://example.com/deepseek"
                    }]
                });
                return;
            }
        }

        const text = await response.text();
        const feed = await parser.parseString(text);

        console.log(`Fetched ${feed.items.length} trends.`);

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
            // Try to find ANY tech
            selectedTrend = feed.items[0];
            console.log("No specific AI trend found, using top trend:", selectedTrend.title);
        } else if (selectedTrend) {
            console.log("Found AI Trend:", selectedTrend.title);
        }

        if (selectedTrend) {
            generatePrompt(selectedTrend);
        } else {
            console.error("No trends found.");
        }

    } catch (error) {
        console.error("Error fetching trends:", error);
        // Fallback
        generatePrompt({
            title: "Nvidia Blackwell",
            'ht:approx_traffic': "500K+",
            'ht:news_item': [{
                'ht:news_item_title': "Nvidia Blackwell Chips Sold Out Until 2026",
                'ht:news_item_url': "https://nvidianews.com"
            }]
        });
    }
}

function generatePrompt(trend: any) {
    const topic = trend.title;
    const traffic = trend['ht:approx_traffic'] || 'High';
    const newsItems = trend['ht:news_item'] || [];
    const newsTitle = newsItems.length > 0 ? newsItems[0]['ht:news_item_title'] : 'Breaking News';
    const newsUrl = newsItems.length > 0 ? newsItems[0]['ht:news_item_url'] : '#';

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

fetchTrends();
