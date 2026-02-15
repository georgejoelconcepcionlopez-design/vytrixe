
import Link from 'next/link';
import React from 'react';

// Map of high-value keywords to internal routes
const KEYWORD_MAP: Record<string, string> = {
    'Artificial Intelligence': '/category/ai',
    'AI ': '/category/ai',
    'Generative AI': '/category/ai',
    'Machine Learning': '/category/ai',
    'Crypto': '/category/crypto',
    'Bitcoin': '/category/crypto',
    'Ethereum': '/category/crypto',
    'Blockchain': '/category/crypto',
    'Startups': '/category/startups',
    'Venture Capital': '/category/startups',
    'IPO': '/category/startups',
    'Technology': '/category/tech',
    'Tech': '/category/tech',
    'SaaS': '/category/tech',
    'Nvidia': '/topic/tech/nvidia',
    'OpenAI': '/topic/ai/openai',
    'Google': '/topic/tech/google',
    'Microsoft': '/topic/tech/microsoft',
    'Tesla': '/topic/tech/tesla',
};

/**
 * Scans content and injects internal links for known keywords.
 * Note: simplistic string replacement; for production, a more robust HTML parser/replacer is ideal
 * to avoid linking inside existing tags.
 */
export function injectContextualLinks(content: string): string {
    if (!content) return '';

    let processedhost = content;

    // Iterate keys and replace FIRST occurrence only to avoid spam
    Object.keys(KEYWORD_MAP).forEach(keyword => {
        const url = KEYWORD_MAP[keyword];
        const regex = new RegExp(`\\b(${keyword})\\b`, 'i'); // Match whole word, case insensitive, first one

        // Check if keyword exists and isn't already linked (basic check)
        if (processedhost.match(regex)) {
            processedhost = processedhost.replace(regex, `<a href="${url}" class="text-cyan-400 hover:underline font-bold">$1</a>`);
        }
    });

    return processedhost;
}
