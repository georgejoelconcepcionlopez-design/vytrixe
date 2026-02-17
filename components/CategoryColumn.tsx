import Link from 'next/link';
import { ContentItem } from '@/types/content';
import { Clock, ArrowRight } from 'lucide-react';

interface CategoryColumnProps {
    category: string;
    articles: ContentItem[];
    className?: string;
}

export function CategoryColumn({ category, articles, className }: CategoryColumnProps) {
    if (!articles || articles.length === 0) return null;

    const featured = articles[0];
    const listItems = articles.slice(1, 4); // Take up to 3 items if needed, or 2

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
                <Link href={`/category/${category.toLowerCase()}`} className="group flex items-center gap-2">
                    <h3 className="text-lg font-black uppercase tracking-widest text-cyan-500 group-hover:text-cyan-400 transition-colors">
                        {category}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-500 transition-colors -ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
                </Link>
            </div>

            {/* Featured Item */}
            <Link href={`/news/${featured.slug}`} className="group mb-8 block">
                <div className="aspect-[4/3] bg-white/5 rounded-none border border-white/10 overflow-hidden mb-4 relative">
                    {/* Image Placeholder or Actual Image */}
                    <img
                        src={featured.image_url || 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800'}
                        alt={featured.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 saturate-0 group-hover:saturate-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60 bg-black/50 px-2 py-1 backdrop-blur-sm border border-white/10">
                            Analysis
                        </span>
                    </div>
                </div>
                <h4 className="text-xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors line-clamp-3 mb-2">
                    {featured.title}
                </h4>
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {featured.summary}
                </p>
            </Link>

            {/* List Items */}
            <div className="space-y-6 border-t border-white/5 pt-6 mt-auto">
                {listItems.map((article) => (
                    <Link key={article.id} href={`/news/${article.slug}`} className="group block">
                        <div className="flex flex-col gap-1">
                            <h5 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                                {article.title}
                            </h5>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase">
                                <Clock className="h-3 w-3" />
                                <span>
                                    {article.dateDisplay || new Date(article.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
