
import { Metadata } from 'next';

interface ArticleData {
    id: string;
    slug: string;
    title: string;
    description?: string;
    excerpt?: string;
    image_url?: string;
    author?: string;
    source?: string;
    created_at: string;
    updated_at?: string;
    category?: string;
}

export function generateArticleSchema(article: ArticleData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'headline': article.title,
        'image': [article.image_url],
        'datePublished': article.created_at,
        'dateModified': article.updated_at || article.created_at,
        'author': [{
            '@type': 'Person',
            'name': article.author || 'Vytrixe Editorial Desk',
            'url': 'https://vytrixe.com/editorial-policy'
        }],
        'publisher': {
            '@type': 'Organization',
            'name': 'Vytrixe Intelligence',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://vytrixe.com/logo.png' // Ensure this exists
            }
        },
        'description': article.description || article.excerpt
    };
}

export function generateMetadataFromArticle(article: ArticleData): Metadata {
    const title = article.title.length > 60 ? `${article.title.substring(0, 57)}...` : article.title;
    const description = (article.description || article.excerpt || '').substring(0, 160);
    const publishedTime = new Date(article.created_at).toISOString();

    return {
        title: `${title} | Vytrixe Intelligence`,
        description: description,
        authors: [{ name: article.author || 'Vytrixe Desk' }],
        alternates: {
            canonical: `https://vytrixe.com/news/${article.slug}`,
            languages: {
                'en-US': `https://vytrixe.com/news/${article.slug}`,
                'es-ES': `https://vytrixe.com/es/news/${article.slug}`, // Placeholder for i18n structure
            },
        },
        openGraph: {
            title: title,
            description: description,
            url: `https://vytrixe.com/news/${article.slug}`,
            siteName: 'Vytrixe Intelligence',
            images: [
                {
                    url: article.image_url || '/og-default.jpg',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type: 'article',
            publishedTime: publishedTime,
            modifiedTime: article.updated_at ? new Date(article.updated_at).toISOString() : publishedTime,
            section: article.category,
            authors: [article.author || 'Vytrixe Desk'],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [article.image_url || '/og-default.jpg'],
            creator: '@vytrixe',
        },
        robots: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    };
}
