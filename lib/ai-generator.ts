/**
 * Vytrixe AI Article Generator
 * Handles long-form article generation from trending topics.
 */

export interface GeneratedArticle {
    title: string;
    slug: string;
    excerpt: string;
    content: string; // HTML formatted
    category: string;
    cover_image: string;
    seo_title: string;
    seo_description: string;
    keywords: string[];
    structured_data?: any;
    published_at: string;
}

export async function generateArticleFromTrend(trendTitle: string): Promise<GeneratedArticle> {
    console.log(`[AI Generator] Synthesizing intelligence report on: ${trendTitle}`);

    const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    let article: GeneratedArticle | null = null;

    if (apiKey) {
        try {
            article = await callAI(trendTitle, apiKey);
        } catch (error) {
            console.error("[AI Generator] AI Call failed, using template fallback:", error);
        }
    }

    if (!article) {
        article = generateFromTemplate(trendTitle);
    }

    // Ensure image is present
    if (!article.cover_image) {
        article.cover_image = await getUnsplashImage(trendTitle, article.category);
    }

    return article;
}

async function callAI(topic: string, apiKey: string): Promise<GeneratedArticle | null> {
    // Determine provider
    const isGemini = apiKey.startsWith('AIza');
    const endpoint = isGemini
        ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
        : 'https://api.openai.com/v1/chat/completions';

    const prompt = `
        You are an elite autonomous news architect for Vytrixe Intelligence.
        Generate a deep-dive, SEO-optimized investigative report of 800-1500 words on: "${topic}".
        
        Article Architecture:
        1. Compelling Headline (SEO optimized, max 60 chars)
        2. Introduction: Hook the reader and define the stakes.
        3. Key Facts: Bulleted list of verified insights.
        4. Analysis: Tactical breakdown of the "How" and "Why".
        5. Future Outlook: Predictive modeling of where this trend goes next.
        6. Conclusion: Final strategic takeaway.

        SEO Requirements:
        - Target high-intent long-tail keywords.
        - Tone: Neutral, analytical, premium.
        - HTML: Use H2/H3 tags, <strong> for emphasis.

        Response Format (Strict JSON): 
        {
            "title": "...",
            "slug": "...",
            "excerpt": "...",
            "content": "HTML structure...",
            "category": "AI|Technology|Crypto|Startups|Business|World",
            "seo_title": "...",
            "seo_description": "...",
            "keywords": ["...", "..."]
        }
    `;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(isGemini ? {} : { 'Authorization': `Bearer ${apiKey}` })
            },
            body: JSON.stringify(isGemini ? {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { response_mime_type: "application/json" }
            } : {
                model: 'gpt-4o',
                messages: [{ role: 'user', content: prompt }],
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) throw new Error(`AI API error: ${response.statusText}`);

        const data = await response.json();
        const contentStr = isGemini
            ? data.candidates[0].content.parts[0].text
            : data.choices[0].message.content;

        const result = JSON.parse(contentStr.match(/\{[\s\S]*\}/)?.[0] || contentStr);

        return {
            title: result.title,
            slug: result.slug || topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            excerpt: result.excerpt,
            content: result.content,
            category: result.category || detectCategory(topic),
            cover_image: '',
            seo_title: result.seo_title || result.title,
            seo_description: result.seo_description || result.excerpt,
            keywords: result.keywords || [topic],
            published_at: new Date().toISOString()
        };
    } catch (e) {
        console.error("Autonomous AI failure:", e);
        return null;
    }
}

export function generateFromTemplate(topic: string): GeneratedArticle {
    const category = detectCategory(topic);
    const title = `The Autonomous Shift: Analyzing the Impact of ${topic}`;
    return {
        title: title,
        slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-analysis',
        excerpt: `Vytrixe Intelligence deep-dive into the strategic implications of ${topic} in the ${category} sector.`,
        content: `
            <h2>The Evolution of ${topic}</h2>
            <p>Our autonomous monitoring systems have detected a significant surge in signals related to <strong>${topic}</strong>. This trend is not merely cyclical; it represents a fundamental shift in the <strong>${category}</strong> landscape.</p>
            <p>As we analyze the underlying data, three key drivers emerge...</p>
            <h3>Strategic Factoring</h3>
            <p>Organizations must recalibrate their operations to account for ${topic}. The long-term outlook suggests a consolidation of power around entities that can leverage this trend effectively.</p>
        `,
        category: category,
        cover_image: '',
        seo_title: `${title} | Vytrixe Analysis`,
        seo_description: `Deep-dive analysis into ${topic} and its future impact on ${category}.`,
        keywords: [topic, category, 'autonomous news', 'intelligence report'],
        published_at: new Date().toISOString()
    };
}

function detectCategory(topic: string): string {
    const lowerTopic = topic.toLowerCase();
    if (/ai|openai|gpt|intelligence|nvidia|robot|learning/.test(lowerTopic)) return 'AI';
    if (/crypto|bitcoin|eth|blockchain|coin|web3/.test(lowerTopic)) return 'Crypto';
    if (/startup|funding|seed|venture|vc|founder/.test(lowerTopic)) return 'Startups';
    if (/business|market|economy|stock|invest|ceo/.test(lowerTopic)) return 'Business';
    if (/viral|tiktok|trend|challenge|creator|social/.test(lowerTopic)) return 'Viral';
    if (/world|war|peace|politics|nation|global/.test(lowerTopic)) return 'World';
    return 'Technology';
}

async function getUnsplashImage(topic: string, category: string): Promise<string> {
    const query = encodeURIComponent(`${topic} ${category} minimalist editorial`);
    // Ideally use process.env.UNSPLASH_ACCESS_KEY to fetch a real random image
    // For now, we return a high-quality search-based dynamic URL from Unsplash Source (or simulated)
    return `https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600&q=${query}`;
}
