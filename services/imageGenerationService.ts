
import { createClient } from '@/lib/supabase/client'

/**
 * Service to handle AI Image Generation for TrendNova articles.
 * currently uses a robust fallback/placeholder system until a real AI API key (Midjourney/DALL-E) is integrated.
 */

// Placeholder mapping for categories to ensuring relevant visuals even without AI
const CATEGORY_FALLBACKS: Record<string, string[]> = {
    technology: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200', // Cyber
        'https://images.unsplash.com/photo-1531297424005-27a38287cc38?auto=format&fit=crop&q=80&w=1200'
    ],
    business: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
    ],
    science: [
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1200'
    ],
    health: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200'
    ],
    general: [
        'https://images.unsplash.com/photo-1504711432869-5d593f5f203e?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=1200'
    ]
}

export async function generateArticleImage(title: string, category: string): Promise<string | null> {
    console.log(`🎨 Generating AI Image for: "${title}" [${category}]`)

    // 1. Construct the prompt (for future API use)
    const prompt = `High-detail cinematic editorial image representing: ${title}, category: ${category}, futuristic, dramatic lighting, ultra realistic, 16:9 ratio`
    console.log(`   Prompt: ${prompt}`)

    try {
        // 2. Placeholder Generation (Simulating valid API response)
        // In a real implementation, fetch(AI_API_URL, { prompt }) would go here.

        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 800))

        // Return a category specific image
        const fallbacks = CATEGORY_FALLBACKS[category.toLowerCase()] || CATEGORY_FALLBACKS.general
        const randomImage = fallbacks[Math.floor(Math.random() * fallbacks.length)]

        // 3. Upload to Supabase (Optional/Future Proofing)
        // If we had a real generated blob, we would upload it here.
        // For now, we return the robust URL directly.
        // const storageUrl = await uploadImageToSupabase(blob, title)

        return randomImage

    } catch (error) {
        console.error("❌ Image Generation Failed:", error)
        return getFallbackImage(category)
    }
}

async function uploadImageToSupabase(imageBlob: Blob, title: string): Promise<string | null> {
    const supabase = createClient()
    const filename = `ai-gen-${Date.now()}-${title.slice(0, 20).replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`

    const { data, error } = await supabase
        .storage
        .from('article-images')
        .upload(filename, imageBlob)

    if (error) {
        console.error("   Storage Upload Error:", error.message)
        return null
    }

    const { data: { publicUrl } } = supabase
        .storage
        .from('article-images')
        .getPublicUrl(filename)

    return publicUrl
}

export function getFallbackImage(category: string): string {
    const fallbacks = CATEGORY_FALLBACKS[category.toLowerCase()] || CATEGORY_FALLBACKS.general
    return fallbacks[0]
}
