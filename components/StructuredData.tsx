import React from 'react';

interface StructuredDataProps {
    article: {
        title: string;
        excerpt: string;
        content: string;
        cover_image: string;
        published_at: string;
        author?: string;
        category?: string;
    };
    url: string;
}

export default function StructuredData({ article, url }: StructuredDataProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.title,
        "image": [article.cover_image],
        "datePublished": article.published_at,
        "dateModified": article.published_at,
        "author": {
            "@type": "Organization",
            "name": article.author || "Vytrixe Intelligence",
            "url": "https://vytrixe.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Vytrixe",
            "logo": {
                "@type": "ImageObject",
                "url": "https://vytrixe.com/logo.png"
            }
        },
        "description": article.excerpt,
        "articleBody": article.content.replace(/<[^>]*>?/gm, ''), // Stripping HTML for body text
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
