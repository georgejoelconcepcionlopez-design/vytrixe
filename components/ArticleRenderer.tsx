'use client';

import parse from 'html-react-parser';

interface ArticleRendererProps {
    content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
    return (
        <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed text-lg">
            {parse(content)}
        </div>
    );
}
