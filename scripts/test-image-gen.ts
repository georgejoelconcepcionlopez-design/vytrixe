
import { generateArticleImage } from '../services/imageGenerationService';

async function test() {
    console.log("Testing Image Generation Service...");

    const categories = ['technology', 'business', 'science', 'health', 'general', 'unknown'];

    for (const cat of categories) {
        console.log(`\n--- Testing Category: ${cat} ---`);
        const title = `Future of ${cat}`;
        const imageUrl = await generateArticleImage(title, cat);
        console.log(`Result URL: ${imageUrl}`);

        if (!imageUrl || !imageUrl.startsWith('https://')) {
            console.error(`❌ Failed: Invalid URL returned for ${cat}`);
        } else {
            console.log(`✅ Success`);
        }
    }
}

test().catch(console.error);
