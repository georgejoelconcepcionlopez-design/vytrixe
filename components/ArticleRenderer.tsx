'use client';

import parse, { domToReact, DOMNode } from 'html-react-parser';
import { Element } from 'domhandler';
import AdBlock from './AdBlock';

interface ArticleRendererProps {
    content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
    let paragraphCount = 0;

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
        }
    };

    return (
        <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed text-lg">
            {parse(content, options)}
        </div>
    );
}
