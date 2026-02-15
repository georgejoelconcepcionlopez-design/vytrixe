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

console.log("Fetching company trends...");

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

            // List of companies to track
            const companies = [
                'Nvidia', 'NVDA',
                'Microsoft', 'MSFT',
                'Google', 'Alphabet', 'GOOGL',
                'Apple', 'AAPL',
                'Tesla', 'TSLA',
                'AMD',
                'Intel', 'INTC',
                'Meta',
                'Palantir', 'PLTR',
                'Super Micro', 'SMCI',
                'Coinbase', 'COIN',
                'Amazon', 'AMZN',
                'OpenAI'
            ];

            const companyCounts = {};
            let topTrendItem = null;
            let maxMentions = 0;
            let topCompany = null;

            for (const item of feed.items) {
                const title = (item.title || '').toLowerCase();
                const snippet = (item.contentSnippet || '').toLowerCase();
                const combined = title + " " + snippet;

                for (const company of companies) {
                    if (combined.includes(company.toLowerCase())) {
                        // Normalize company name (e.g. MSFT -> Microsoft)
                        let normalized = company;
                        if (['NVDA'].includes(company)) normalized = 'Nvidia';
                        if (['MSFT'].includes(company)) normalized = 'Microsoft';
                        if (['GOOGL', 'Alphabet'].includes(company)) normalized = 'Google';
                        if (['AAPL'].includes(company)) normalized = 'Apple';
                        if (['TSLA'].includes(company)) normalized = 'Tesla';
                        if (['PLTR'].includes(company)) normalized = 'Palantir';
                        if (['COIN'].includes(company)) normalized = 'Coinbase';
                        if (['AMZN'].includes(company)) normalized = 'Amazon';
                        if (['INTC'].includes(company)) normalized = 'Intel';

                        companyCounts[normalized] = (companyCounts[normalized] || 0) + 1;

                        // Keep track of the first trend item for this company to use as context
                        if (!topTrendItem || companyCounts[normalized] > maxMentions) {
                            topTrendItem = item;
                            maxMentions = companyCounts[normalized];
                            topCompany = normalized;
                        }
                    }
                }
            }

            if (topCompany) {
                console.log(`Found Top Company: ${topCompany} (${maxMentions} mentions)`);
                generatePrompt(topCompany, topTrendItem);
            } else {
                console.log("No specific Company trend found.");
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
    console.log("Using Fallback Company Trend.");
    generatePrompt("Palantir", {
        title: "Palantir AI Platform Growth",
        'ht:approx_traffic': "1M+",
        'ht:news_item': [{
            'ht:news_item_title': "Palantir Stock Surges on AIP Bootcamps Demand",
            'ht:news_item_url': "https://vytrixe.com/news/palantir-aip"
        }]
    });
}

function generatePrompt(company, trend) {
    const topic = trend.title;
    const traffic = trend['ht:approx_traffic'] || 'High';
    const newsItems = trend['ht:news_item'] || [];
    const newsTitle = newsItems.length > 0 ? newsItems[0]['ht:news_item_title'] : 'Market Update';
    const newsUrl = newsItems.length > 0 ? newsItems[0]['ht:news_item_url'] : '#';

    const prompt = `
# Article Generation Task: ${company}

**Source Trend**: ${topic} (Traffic: ${traffic})
**Context**: ${newsTitle} - ${newsUrl}

## Article Requirements
- **Topic**: ${company} in AI/Markets
- **Length**: 1200+ words
- **Tone**: Professional, Analytical, Investor-Centric
- **SEO Keyword**: "${company} stock analysis", "${company} AI strategy", "Buy ${company} stock 2026"

## Structure
1. **Title**: SEO-Optimized Title containing "${company}" and the trend.
2. **Meta Description**: 155 chars, summary + CTA.
3. **Structured Data**: JSON-LD \`NewsArticle\` schema required.
4. **Sections**:
   - **Company Overview**: Brief background and current market position.
   - **Why This Trend Matters**: (H2) Connection to the specific news event.
   - **Data-Backed Impact**: (H2) Financials, user growth, or revenue impact.
   - **Competitive Analysis**: (H2) ${company} vs Peers (e.g. vs Competitor X).
   - **Investor Perspective**: (H2) Valuation, risks, and upside potential.
   - **Future Forecast**: (H2) 2026-2027 Outlook.

## Internal Linking
- Link to: /topic/markets
- Link to: /topic/ai
- Link to: /news/${company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}

## Featured Image Prompt
"Cinematic office shot of ${company} headquarters with holographic stock ticker overlay, futuristic analytics, business tech atmosphere, 8k."
`;

    const outputPath = path.join(process.cwd(), 'article_task_company.md');
    fs.writeFileSync(outputPath, prompt);
    console.log(`Company Prompt saved to ${outputPath}`);
}
