
export function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://vytrixe.com/#organization",
                "name": "Vytrixe Intelligence",
                "url": "https://vytrixe.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://vytrixe.com/logo.png"
                },
                "sameAs": [
                    "https://twitter.com/vytrixe_ai",
                    "https://linkedin.com/company/vytrixe"
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://vytrixe.com/#website",
                "url": "https://vytrixe.com",
                "name": "Vytrixe",
                "description": "Real-time global trend intelligence and analytics.",
                "publisher": {
                    "@id": "https://vytrixe.com/#organization"
                },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://vytrixe.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            }
        ]
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
