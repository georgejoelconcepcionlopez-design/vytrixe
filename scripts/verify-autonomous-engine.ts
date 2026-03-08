import { calculateScore } from '../services/trend-engine';
import { generateFromTemplate } from '../lib/ai-generator';

async function verify() {
    console.log("🚀 Starting Vytrixe Autonomous Engine Verification...");

    // 1. Verify Scoring Algorithm
    console.log("--- 1. Testing Ranking Algorithm ---");
    const testScore = calculateScore(500, 100, 3); // 500 upvotes, 100 comments, 3 mentions
    console.log(`Score for (500, 100, 3): ${testScore}`);

    if (testScore > 200) {
        console.log("✅ Scoring logic verified.");
    } else {
        throw new Error("❌ Scoring logic failed verification.");
    }

    // 2. Verify AI Generation Template fallback
    console.log("--- 2. Testing AI Content Generation ---");
    const testArticle = generateFromTemplate("AI Autonomous Agents");
    console.log(`Generated Title: ${testArticle.title}`);
    console.log(`Word count: ${testArticle.content.split(' ').length}`);

    if (testArticle.content.includes("Autonomous Agent") && testArticle.content.length > 500) {
        console.log("✅ AI Generation template verified.");
    } else {
        throw new Error("❌ AI Generation failed verification.");
    }

    // 3. Verify SEO Field Generation
    console.log("--- 3. Testing SEO fields ---");
    if (testArticle.seo_title && testArticle.seo_description && testArticle.keywords.length > 0) {
        console.log("✅ SEO metadata generation verified.");
    } else {
        throw new Error("❌ SEO metadata generation failed.");
    }

    console.log("\n✨ Verification Complete: Autonomous Engine is operational.");
}

verify().catch(err => {
    console.error(err);
    process.exit(1);
});
