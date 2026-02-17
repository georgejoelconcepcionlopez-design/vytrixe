
import { ContentItem } from '@/types/content';

export const HERO_ARTICLE: ContentItem = {
    id: 'hero-1',
    title: 'The AI Infrastructure Arms Race',
    summary: 'Sovereign nations and hyperscalers are engaging in a capital-intensive battle for compute supremacy. We analyze the $2T shift in global capex.',
    category: 'Intelligence',
    slug: 'ai-infrastructure-arms-race',
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
    created_at: new Date().toISOString(),
    is_featured: true,
    author: 'Vytrixe Intelligence Desk',
    content: `
        <h3>Executive Summary</h3>
        <p>The global race for Artificial Intelligence (AI) dominance has shifted from algorithmic innovation to physical infrastructure. In 2025, sovereign nations and hyperscalers (Microsoft, Google, Meta, Amazon) are projected to allocate over <strong>$2 trillion</strong> towards data center construction, energy grid modernization, and specialized compute acquisition. This report analyzes the geopolitical and economic implications of this "compute nationalism."</p>

        <h3>Strategic Context</h3>
        <p>Compute is no longer a commodity; it is a strategic asset comparable to oil reserves in the 20th century. The localization of data centers is being driven by data sovereignty laws and the latency requirements of next-generation inference models.</p>

        <h3>Capital Allocation Shift</h3>
        <p>Investment patterns have decoupled from traditional software multiples. Capital expenditure is now heavily weighted towards:</p>
        <ul>
            <li><strong>Specialized Silicon:</strong> NVIDIA Blackwell and custom ASICs.</li>
            <li><strong>Energy Resilience:</strong> Nuclear SMRs (Small Modular Reactors) and grid hardening.</li>
            <li><strong>Liquid Cooling:</strong> Next-gen thermal management for high-density racks.</li>
        </ul>

        <h3>Geoeconomic Implications</h3>
        <p>The "AI Iron Curtain" is descending. Export controls on high-end GPUs are reorganizing global supply chains. Nations like the UAE and Saudi Arabia are pivoting sovereign wealth funds to acquire massive compute clusters, aiming to become "AI Neutral Zones" between the US and China.</p>

        <h3>Market Impact</h3>
        <p>We anticipate a supercycle for industrial clusters supporting this build-out. Utility companies, copper miners (for grid expansion), and specialized construction firms are the secondary beneficiaries of this arms race.</p>

        <h3>Forward Outlook</h3>
        <p>By Q4 2026, we expect the emergence of "Sovereign Clouds" — government-owned AI infrastructure leased to domestic startups. This will fundamentally alter the SaaS unit economics model, shifting value accrual from application layers back to the infrastructure layer.</p>

        <h3>Key Takeaways</h3>
        <p>Investors should look beyond the chip designers. The bottleneck is moving to energy and thermal management. The new "gold" is not just the H200 GPU, but the 500MW power connection required to run it.</p>
    `
};

export const MARKET_PRIME_ARTICLE: ContentItem = {
    id: 'mkt-prime-1',
    title: 'Nvidia and the Global GPU Supply Shock',
    summary: 'Blackwell chip delays and sovereign hoarding have created a 12-month supply void. How institutional desks are hedging the shortage.',
    category: 'Markets',
    slug: 'nvidia-gpu-supply-shock',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    author: 'Senior Market Analyst',
    content: `
        <h3>Executive Summary</h3>
        <p>Nvidia's Blackwell B200 series faces a critical supply/demand imbalance. With TSMC CoWoS packaging capacity maxed out until mid-2026, the secondary market for H100s is seeing a resurgence. This report examines the downstream effects on the semiconductor index and adjacent hardware sectors.</p>

        <h3>Supply Chain Bottlenecks</h3>
        <p>The bottleneck is not the silicon die, but the advanced packaging (CoWoS). TSMC is scrambling to double capacity, but yields remain the primary constraint. This physical limit effectively caps the revenue growth rate of the entire generative AI ecosystem for the next 4 quarters.</p>

        <h3>Institutional Positioning</h3>
        <p>Hedge funds are increasingly longing "semicon-adjacent" plays — specifically memory (HBM3e manufacturers like SK Hynix and Micron) and optical interconnects. The "picks and shovels" trade is moving further down the stack.</p>

        <h3>Sovereign Hoarding</h3>
        <p>Nation-states are bypassing traditional procurement channels, paying premiums of 40-60% above MSRP to secure guaranteed allocation. This "sovereign hoarding" creates a phantom floor for GPU pricing, insulating Nvidia margins even if enterprise demand softens.</p>

        <h3>Forward Outlook</h3>
        <p>Expect volatility in the SOXX index as earnings prints reveal which hyperscalers secured allocation versus those who didn't. The "Give up" phase for smaller model trainers begins now; without compute, they cannot compete. Consolidation in the AI startup sector is imminent.</p>
    `
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

export const ALL_CONTENT = [...AI_ARTICLES, ...FINANCE_ARTICLES, ...REPORT_ARTICLES, HERO_ARTICLE, MARKET_PRIME_ARTICLE];
