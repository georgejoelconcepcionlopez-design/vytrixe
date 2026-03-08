import { getArticleBySlug, getArticles } from '@/lib/articles';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const article = await getArticleBySlug(params.slug);
    if (!article) return {};

    return {
        title: article.seoTitle || article.title,
        description: article.seoDescription,
        keywords: article.keywords,
        openGraph: {
            title: article.seoTitle || article.title,
            description: article.seoDescription,
            images: [article.cover],
            type: 'article',
        },
    };
}

export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export default async function ArticlePage({ params }: Props) {
    const article = await getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="pb-20">
            <div className="relative w-full h-[60vh]">
                <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            <div className="container -mt-32 relative z-10">
                <div className="glass rounded-3xl p-8 md:p-16 max-w-4xl mx-auto shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="badge">{article.category}</span>
                        <span className="text-muted text-xs font-bold uppercase tracking-widest">{article.publishedDate}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                        {article.title}
                    </h1>

                    <div
                        className="article-content prose prose-invert prose-cyan max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                    />
                </div>
            </div>
        </article>
    );
}
