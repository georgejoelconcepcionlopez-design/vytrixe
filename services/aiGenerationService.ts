
import { createClient } from '@/lib/supabase/server'; // Use server client
import { addMinutes, addHours } from 'date-fns';

export interface SourceData {
    rawText?: string;
    facts?: string[];
    url?: string;
    topic: string;
}

interface GeneratedContent {
    en: {
        title: string;
        summary: string;
        body: string; // HTML-ready struct or markdown
        metaTitle: string;
        metaDescription: string;
    };
    es: {
        title: string;
        summary: string;
        body: string;
        metaTitle: string;
        metaDescription: string;
    };
    category: string;
    is_breaking: boolean;
    tags: string[];
}

// Mock OpenAI call for now - replace with actual API call later
async function callOpenAI(source: SourceData): Promise<GeneratedContent> {
    // SIMULATION DELAY
    await new Promise(resolve => setTimeout(resolve, 2000));

    const isBreaking = source.rawText?.toLowerCase().includes('breaking') || false;

    return {
        en: {
            title: `Transformative Analysis: ${source.topic}`,
            summary: `Executive summary of the situation regarding ${source.topic}. This represents a key shift in the market dynamics.`,
            body: `
                <h3>What Happened</h3>
                <p>Details about ${source.topic} emerging from the source data...</p>
                <h3>Why It Matters</h3>
                <p>This event signifies a critical turning point...</p>
                <h3>Market & Industry Impact</h3>
                <p>Investors and stakeholders should note the following implications...</p>
                <h3>Strategic Outlook</h3>
                <p>Looking ahead, we anticipate further developments in this sector...</p>
            `,
            metaTitle: `${source.topic} Analysis | Vytrixe Intelligence`,
            metaDescription: `In-depth analysis of ${source.topic} and its market impact.`
        },
        es: {
            title: `Análisis Transformativo: ${source.topic}`,
            summary: `Resumen ejecutivo de la situación con respecto a ${source.topic}. Esto representa un cambio clave en la dinámica del mercado.`,
            body: `
                <h3>Qué Sucedió</h3>
                <p>Detalles sobre ${source.topic} emergiendo de los datos fuente...</p>
                <h3>Por Qué Importa</h3>
                <p>Este evento significa un punto de inflexión crítico...</p>
                <h3>Impacto en el Mercado e Industria</h3>
                <p>Los inversores y partes interesadas deben notar las siguientes implicaciones...</p>
                <h3>Perspectiva Estratégica</h3>
                <p>Mirando hacia adelante, anticipamos más desarrollos en este sector...</p>
            `,
            metaTitle: `${source.topic} Análisis | Vytrixe Intelligence`,
            metaDescription: `Análisis profundo de ${source.topic} y su impacto en el mercado.`
        },
        category: 'Technology',
        is_breaking: isBreaking,
        tags: [source.topic, 'market-analysis', 'tech']
    };
}

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') +
        '-' + Math.random().toString(36).substring(2, 7);
}

export async function generateArticleFromSource(source: SourceData): Promise<string | null> {
    const supabase = await createClient();

    try {
        console.log(`[AI-Service] Starting generation for topic: ${source.topic}`);

        // 1. Generate Content via LLM
        const content = await callOpenAI(source);

        // 2. Prepare Metadata
        const slug = generateSlug(content.en.title);

        // Scheduling Logic
        const now = new Date();
        // If breaking: +20 mins, else +90 mins
        const publishTime = content.is_breaking
            ? addMinutes(now, 20)
            : addMinutes(now, 90);

        // 3. Insert into Database
        const articleData = {
            slug: slug,
            category: content.category,
            status: 'pending-review', // Default safety state
            is_breaking: content.is_breaking,
            is_premium: true, // Default to premium for AI insights
            is_live: false,
            content: content,
            metadata: {
                tags: content.tags,
                source_url: source.url
            },
            auto_publish_at: publishTime.toISOString(),
            published_at: null, // Not yet published
            image_url: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000" // Default placeholder
        };

        const { data, error } = await (supabase
            .from('vytrixe_articles' as any)
            .insert(articleData)
            .select('id')
            .single() as any);

        if (error) {
            console.error('[AI-Service] DB Insert Error:', error);
            return null;
        }

        console.log(`[AI-Service] Success! Article created: ${data.id}`);
        return data.id;

    } catch (err) {
        console.error('[AI-Service] Critical Error:', err);
        return null;
    }
}
