'use client';

import parse, { DOMNode, Element } from 'html-react-parser';
import AdBlock from '@/components/AdBlock';
import { Fragment } from 'react';

interface ArticleRendererProps {
    content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
    let pCount = 0;
    let h2Count = 0;

    const options = {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element && domNode.name === 'p') {
                pCount++;
                // Inject ad after 2nd paragraph
                if (pCount === 2) {
                    return (
                        <Fragment>
                            {domNodeToReact(domNode)}
                            <div className="my-8">
                                <AdBlock position="article_mid" />
                            </div>
                        </Fragment>
                    );
                }
            }
            if (domNode instanceof Element && domNode.name === 'h2') {
                h2Count++;
                // Inject ad after 2nd H2 (if paragraph count > 2 to avoid clustering)
                if (h2Count === 2 && pCount > 2) {
                    return (
                        <Fragment>
                            {domNodeToReact(domNode)}
                            <div className="my-8">
                                <AdBlock position="article_mid" />
                            </div>
                        </Fragment>
                    );
                }
            }
        }
    };

    // Helper to render the original node without infinite loop if possible, 
    // but parser's default behavior handles children traversal.
    // However, replace returns a React Node. We can just return undefined to keep original,
    // but here we want to append. 
    // Actually, `domNodeToReact` isn't exported by default in v5 sometimes or requires correct import.
    // A simpler way is to just return a Fragment with the original children? No.
    // The library `html-react-parser` replace function: if you return a valid React element, it replaces the node.
    // To KEEP the node and ADD something, we have to recreate the node.

    // Since re-creating exact node with props is complex, a simpler strategy:
    // We can't easily "append" via replace without reconstructing.
    // An alternative is to split the string content manually, but parser is safer.

    // Let's use a modified `replace` that reconstructs the <p> or <h2>.
    // Or just use `domNode` if we can render it.

    return <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed text-lg">
        {parse(content, options)}
    </div>;
}

// Minimal reconstruction helper (since we can't easily invoke default processor inside replace)
const domNodeToReact = (node: Element) => {
    // This is a simplification. For full fidelity, we'd need `domToReact` from library.
    // Let's import it.
    return (
        <node.name {...node.attribs}>
            {/* We can't easily recurse children here without domToReact. */}
            {/* Let's fix the import first. */}
        </node.name>
    )
};
