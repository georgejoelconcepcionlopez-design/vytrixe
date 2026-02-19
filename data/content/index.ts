
import { ContentItem } from '@/types/content';

export const HERO_ARTICLE = AI_INFRA_FORECAST_2026;

export const CLUSTER_ARTICLES = [
    AI_DATA_CENTER_TRENDS,
    HYPERSCALER_CAPEX_GROWTH,
    SOVEREIGN_AI_DEEP_DIVE,
    GPU_SUPPLY_CONSTRAINTS,
    ADVANCED_PACKAGING,
    AI_CLOUD_SCALING,
    EDGE_VS_CENTRALIZED,
    AI_INVESTMENT_RISKS,
    GLOBAL_DC_EXPANSION
];

export const MARKET_PRIME_ARTICLE: ContentItem = {
    id: 'intel-2',
    title: 'Nvidia and the $2 Trillion Compute Expansion Cycle',
    summary: 'As the Blackwell architecture rolls out, we examine the supply chain elasticity and the "shadow demand" from sovereign wealth funds.',
    category: 'markets',
    slug: 'nvidia-2-trillion-compute-cycle',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    author: 'Senior Market Analyst',
    content: `
        <h3>Executive Summary</h3>
        <p>Nvidia's roll-out of the Blackwell B200 architecture marks the beginning of the "Industrial AI" phase. Demand continues to outstrip supply by a factor of 3:1, creating a pricing floor that defies traditional semiconductor cycle gravity.</p>

        <h3>The Shadow Demand</h3>
        <p>While enterprise demand is transparent, "shadow demand" from sovereign wealth funds (SWFs) is creating a massive backlog. Nations like Saudi Arabia, UAE, and others are bypassing traditional procurement routes to secure silicon at premiums of 40% above MSRP.</p>
        <p>This sovereign hoarding is designed to seed domestic AI ecosystems, effectively removing massive quantities of compute from the public cloud market.</p>

        <h3>Supply Chain Elasticity</h3>
        <p>The primary constraint remains TSMC's CoWoS (Chip-on-Wafer-on-Substrate) packaging capacity. Despite aggressive expansion, yields are the limiting factor. This supply inelasticity safeguards Nvidia's gross margins for at least another 4 quarters.</p>

        <h3>Valuation Perspective</h3>
        <p>Trading at 35x forward earnings, NVDA is priced for perfection. However, if the "Sovereign AI" thesis holds, the Total Addressable Market (TAM) for data center compute is not $1 Trillion, but significantly higher as it replaces traditional general-purpose compute.</p>
    `
};

export const FEATURED_ARTICLES: ContentItem[] = [
    {
        id: 'intel-3',
        title: 'Sovereign AI and the Rise of Compute Nationalism',
        summary: 'Why nations are treating GPUs as strategic reserves similar to gold or oil. The geopolitical case for domestic intelligence infrastructure.',
        category: 'geopolitics',
        slug: 'sovereign-ai-compute-nationalism',
        image_url: 'https://images.unsplash.com/photo-1526304640152-d461968e37ad?auto=format&fit=crop&q=80&w=1200',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        author: 'Geopolitical Desk',
        content: `
            <h3>The New wealth of Nations</h3>
            <p>Data is the new oil, but <strong>compute</strong> is the refinery. Without the capacity to refine data into intelligence, data reserves are useless. This realization has triggered a wave of "Compute Nationalism."</p>

            <h3>Strategic Autonomy</h3>
            <p>France, Japan, and India are creating state-backed initiatives to build domestic supercomputers. The fear is twofold:</p>
            <ul>
                <li><strong>Privacy/Security:</strong> Relying on US-based clouds for government intelligence is a national security risk.</li>
                <li><strong>Economic Rent:</strong> Paying indefinite rent to US hyperscalers drains foreign currency reserves.</li>
            </ul>

            <h3>The Rise of "AI Neutral Zones"</h3>
            <p>The Middle East is positioning itself as a neutral zone, acquiring compute from both East and West to build massive, regulation-light training clusters. This arbitrage opportunity is driving massive capital inflows into the region's digital infrastructure.</p>
        `
    },
    {
        id: 'intel-4',
        title: 'AI Energy Demand and Global Grid Modernization',
        summary: 'The AI revolution is colliding with physics. Analyzing the grid capability gap and the investment opportunities in energy transmission.',
        category: 'ai-infrastructure',
        slug: 'ai-energy-demand-grid-modernization',
        image_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200',
        created_at: new Date(Date.now() - 10800000).toISOString(),
        author: 'Infrastructure Specialist',
        content: `
            <h3>The Gigawatt Scale Problem</h3>
            <p>Training a GPT-5 class model requires a gigawatt-scale cluster. Most national grids cannot support this load dynamics without destabilization. The intersection of AI growth and grid stagnation is the most critical bottleneck of the decade.</p>
            
            <h3>Grid Modernization Thesis</h3>
            <p>We are entering a 20-year supercycle for electrical engineering and grid hardware. Key areas of focus:</p>
            <ul>
                <li><strong>HVDC Transmission:</strong> Moving power efficiently from renewable sources to data centers.</li>
                <li><strong>On-Site Generation:</strong> Data centers deploying gas turbines and SMRs behind the meter.</li>
            </ul>
        `
    },
    {
        id: 'intel-5',
        title: 'The AI Cloud Wars: Amazon vs Microsoft vs Google',
        summary: 'A comparative analysis of the hyperscaler dominance battle. Who owns the enterprise inference market in 2026?',
        category: 'enterprise',
        slug: 'ai-cloud-wars-2026',
        image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
        created_at: new Date(Date.now() - 14400000).toISOString(),
        author: 'Tech Equity Strategist',
        content: `
            <h3>The Triopoly Dynamics</h3>
            <p>The battle for cloud supremacy has shifted. It is no longer about storage and compute, but about "Model-as-a-Service" (MaaS). Microsoft's OpenAI integration gave it an early lead, but the war is far from over.</p>

            <h3>Vertical Integration vs Open Ecosystem</h3>
            <ul>
                <li><strong>Google:</strong> Betting on vertical integration (Gemini models + TPU hardware).</li>
                <li><strong>AWS:</strong> Playing the "Switzerland" card with Bedrock, hosting all major models (Anthropic, Cohere, Meta).</li>
                <li><strong>Microsoft:</strong> Deep coupling with OpenAI, treating it as the de facto OS for AI.</li>
            </ul>

            <h3>Enterprise Inference</h3>
            <p>The real revenue lies in inference, not training. As enterprises move from PoC to production, AWS's infrastructure advantage and flexibility may prove decicisive in capturing the long-tail of corporate AI workloads.</p>
        `
    }
];

import { AI_INFRA_FORECAST_2026 } from './articles/ai-infrastructure-forecast-2026';
import { NVIDIA_HARDWARE_SUPERCYCLE } from './articles/nvidia-ai-hardware-supercycle';
import { AI_ENERGY_FORECAST_2026 } from './articles/ai-energy-consumption-forecast-2026';
import {
    AI_DATA_CENTER_TRENDS,
    HYPERSCALER_CAPEX_GROWTH,
    SOVEREIGN_AI_DEEP_DIVE,
    GPU_SUPPLY_CONSTRAINTS,
    ADVANCED_PACKAGING,
    AI_CLOUD_SCALING,
    EDGE_VS_CENTRALIZED,
    AI_INVESTMENT_RISKS,
    GLOBAL_DC_EXPANSION
} from './articles/ai-infra-cluster';

export const ALL_CONTENT = [
    AI_INFRA_FORECAST_2026,
    NVIDIA_HARDWARE_SUPERCYCLE,
    AI_ENERGY_FORECAST_2026,
    AI_DATA_CENTER_TRENDS,
    HYPERSCALER_CAPEX_GROWTH,
    SOVEREIGN_AI_DEEP_DIVE,
    GPU_SUPPLY_CONSTRAINTS,
    ADVANCED_PACKAGING,
    AI_CLOUD_SCALING,
    EDGE_VS_CENTRALIZED,
    AI_INVESTMENT_RISKS,
    GLOBAL_DC_EXPANSION,
    HERO_ARTICLE,
    MARKET_PRIME_ARTICLE,
    ...FEATURED_ARTICLES
];

export const AI_ARTICLES = ALL_CONTENT.filter(a => a.category === 'ai-infrastructure' || a.category === 'enterprise');
export const FINANCE_ARTICLES = ALL_CONTENT.filter(a => a.category === 'markets' || a.category === 'crypto');
export const REPORT_ARTICLES = ALL_CONTENT.filter(a => a.category === 'geopolitics' || a.category === 'research');
