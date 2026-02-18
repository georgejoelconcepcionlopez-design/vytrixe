'use client';

import parse from 'html-react-parser';

import AdBlock from './AdBlock';
import { Element } from 'domhandler';

interface ArticleRendererProps {
    content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
    let paragraphCount = 0;

    // Safety check for empty content
    if (!content) return null;

    const options = {
        replace: (domNode: any) => {
            if (domNode instanceof Element && domNode.name === 'p') {
                paragraphCount++;
                if (paragraphCount === 3) {
                    return (
                        <>
                            {/* Render the 3rd paragraph */}
                            <p>{domNode.children.map((child: any) => child.data || '').join('')}</p>
                            {/* Inject Ad */}
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
