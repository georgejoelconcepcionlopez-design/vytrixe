
import { ContentItem } from '@/types/content';

export const HERO_ARTICLE: ContentItem = {
    id: 'hero-1',
    title: 'NVIDIA Blackwell Demand "Insane": Shares Hit All-Time High',
    summary: 'Jensen Huang confirms next-gen AI chips are sold out for 12 months as sovereign AI race accelerates globally.',
    category: 'Finance',
    slug: 'nvidia-blackwell-demand-surge',
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    created_at: new Date().toISOString(),
    is_featured: true
};

export const AI_ARTICLES: ContentItem[] = [
    {
        id: 'ai-1',
        title: 'OpenAI Sets Release Date for Sora Video Model',
        summary: 'Hollywood studios panic as AI video generation reaches near-photorealistic quality with consistent physics.',
        category: 'AI',
        slug: 'openai-sora-public-release',
        image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: 'ai-2',
        title: 'Figure AI Robots Deploy in BMW Factories',
        summary: 'First commercial deployment of general-purpose humanoids marks a shift in industrial automation.',
        category: 'AI',
        slug: 'humanoid-robots-bmw-factory',
        image_url: 'https://images.unsplash.com/photo-1485827404703-89f552507387?auto=format&fit=crop&q=80&w=800',
        created_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
        id: 'ai-3',
        title: 'Apple Vision Pro 2: Brain-Computer Interface Rumored',
        summary: 'Patents suggest neural inputs could replace hand gestures in the next generation headset.',
        category: 'Tech',
        slug: 'apple-vision-pro-2-leaks',
        image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
        created_at: new Date(Date.now() - 10800000).toISOString()
    },
    {
        id: 'ai-4',
        title: 'Google Claims Quantum Error Correction Milestone',
        summary: 'New Sycamore chip reduces noise by 40%, paving the way for stable qubits.',
        category: 'Tech',
        slug: 'quantum-computing-breakthrough-google',
        image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
        created_at: new Date(Date.now() - 18000000).toISOString()
    }
];

export const FINANCE_ARTICLES: ContentItem[] = [
    {
        id: 'fin-1',
        title: 'Bitcoin Breaks $100k Barrier on ETF Wraps',
        summary: 'Institutional inflows surge as major pension funds allocate 1% to crypto assets.',
        category: 'Crypto',
        slug: 'bitcoin-breaks-100k',
        image_url: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800',
        created_at: new Date(Date.now() - 4000000).toISOString()
    },
    {
        id: 'fin-2',
        title: 'Fed Signals Rate Cuts Before Year End',
        summary: 'Powell suggests inflation data is "encouraging enough" to consider localized easing.',
        category: 'Finance',
        slug: 'fed-rate-cuts-signal',
        image_url: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=800',
        created_at: new Date(Date.now() - 8000000).toISOString()
    }
];

export const REPORT_ARTICLES: ContentItem[] = [
    {
        id: 'rep-1',
        title: 'Q3 2026 Global Tech Outlook',
        summary: 'Comprehensive analysis of semiconductor supply chains and software revenue multiples.',
        category: 'Global',
        slug: 'q3-2026-tech-outlook',
        image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 'rep-2',
        title: 'The State of Sovereign AI',
        summary: 'How nations are building domestic compute infrastructure to avoid dependency.',
        category: 'AI',
        slug: 'state-of-sovereign-ai',
        image_url: 'https://images.unsplash.com/photo-1526304640152-d461968e37ad?auto=format&fit=crop&q=80&w=800',
        created_at: new Date(Date.now() - 172800000).toISOString()
    }
];

export const ALL_CONTENT = [...AI_ARTICLES, ...FINANCE_ARTICLES, ...REPORT_ARTICLES, HERO_ARTICLE];
