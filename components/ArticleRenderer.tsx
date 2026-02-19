'use client';

import parse, { domToReact, DOMNode } from 'html-react-parser';
import { Element } from 'domhandler';
import Link from 'next/link';
import AdBlock from './AdBlock';

interface ArticleRendererProps {
    content: string;
}

const KEYWORD_LINKS: Record<string, string> = {
    'AI Infrastructure': '/news/ai-infrastructure-spending-forecast-2026',
    'Nvidia': '/news/nvidia-ai-hardware-supercycle',
    'Blackwell': '/news/nvidia-ai-hardware-supercycle',
    'Energy Consumption': '/news/ai-energy-consumption-forecast-2026',
    'Sovereign AI': '/news/sovereign-ai-compute-nationalism',
    'CoWoS': '/news/gpu-supply-constraints-2026',
    'Gigawatt': '/news/ai-data-center-expansion-trends',
    'Liquid Cooling': '/news/ai-data-center-expansion-trends',
    'HBM3e': '/news/gpu-supply-constraints-2026',
    'Hyperscaler CapEx': '/news/hyperscaler-capex-ai-growth',
    'Edge AI': '/news/edge-computing-vs-centralized-ai'
};

export default function ArticleRenderer({ content }: ArticleRendererProps) {
    let paragraphCount = 0;
    const linkedKeywords = new Set<string>();

    // Safety check for empty content
    if (!content) return null;

    const options = {
        replace: (domNode: DOMNode) => {
            // 1. Ad Injection Logic
            if (domNode instanceof Element && domNode.name === 'p') {
                paragraphCount++;
                if (paragraphCount === 3) {
                    return (
                        <>
                            <p>{domToReact(domNode.children as DOMNode[], options)}</p>
                            <div className="my-8">
                                <AdBlock position="article_mid" />
                            </div>
                        </>
                    );
                }
            }

            // 2. Smart Internal Linking Logic - DISABLED
            // Auto-linking disabled to prevent 404s and broken UX.
            // if (domNode.type === 'text' && domNode.parent && (domNode.parent as Element).name !== 'a') { ... }
        }
    };

    return (
        <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed text-lg">
            {parse(content, options)}
        </div>
    );
}

