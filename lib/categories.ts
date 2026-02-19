
export type CategorySlug =
    | 'ai-infrastructure'
    | 'markets'
    | 'geopolitics'
    | 'robotics'
    | 'crypto'
    | 'enterprise'
    | 'research';

export interface CategoryDef {
    slug: CategorySlug;
    name: string;
    description: string;
}

export const CATEGORIES: CategoryDef[] = [
    {
        slug: 'ai-infrastructure',
        name: 'AI Infrastructure',
        description: 'Data centers, energy, and hardware powering the AI revolution.'
    },
    {
        slug: 'markets',
        name: 'Markets',
        description: 'Global equity, commodity, and capital flow analysis.'
    },
    {
        slug: 'geopolitics',
        name: 'Geopolitics',
        description: 'Sovereign strategy, trade wars, and national security.'
    },
    {
        slug: 'robotics',
        name: 'Robotics',
        description: 'Automation, humanoids, and industrial embedding.'
    },
    {
        slug: 'crypto',
        name: 'Crypto & DeFi',
        description: 'Digital assets, blockchain infrastructure, and tokenomics.'
    },
    {
        slug: 'enterprise',
        name: 'Enterprise AI',
        description: 'Application layer, SaaS, and corporate adoption.'
    },
    {
        slug: 'research',
        name: 'Deep Research',
        description: 'Long-form intelligence and white papers.'
    }
];

export function getCategory(slug: string): CategoryDef | undefined {
    return CATEGORIES.find(c => c.slug === slug);
}

export function getAllCategories(): CategoryDef[] {
    return CATEGORIES;
}
