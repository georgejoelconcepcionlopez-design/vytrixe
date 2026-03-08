import Link from 'next/link';
import Image from 'next/image';
import { ArticleMetadata } from '@/lib/articles';

interface ArticleCardProps {
    article: ArticleMetadata;
    featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
    if (featured) {
        return (
            <Link href={`/articles/${article.slug}`} className="group relative block w-full aspect-[21/9] rounded-2xl overflow-hidden glass mb-12">
                <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-3xl">
                    <span className="badge mb-4">{article.category}</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight group-hover:text-accent transition-colors">
                        {article.title}
                    </h2>
                    <p className="text-muted text-lg line-clamp-2 mb-6 max-w-xl">
                        {article.seoDescription}
                    </p>
                    <div className="text-sm font-bold text-muted uppercase tracking-widest">
                        {article.publishedDate}
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/articles/${article.slug}`} className="group block glass rounded-xl overflow-hidden hover:bg-card-hover transition-all duration-300">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="badge bg-background/80 backdrop-blur-sm">{article.category}</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-muted text-sm line-clamp-2 mb-4">
                    {article.seoDescription}
                </p>
                <div className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
                    {article.publishedDate}
                </div>
            </div>
        </Link>
    );
}
