import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

export interface ArticleCardProps {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    imageUrl: string;
    author: string;
    date: string;
    variant?: 'grid' | 'list' | 'featured' | 'compact';
}

export function ArticleCard({ slug, title, excerpt, category, imageUrl, author, date, variant = 'grid' }: ArticleCardProps) {

    if (variant === 'featured') {
        return (
            <Link href={`/article/${slug}`} className="group block relative rounded-2xl overflow-hidden border border-border bg-card h-[400px] md:h-[500px]">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-8">
                    <span className="bg-primary/20 text-primary w-max px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 border border-primary/30 backdrop-blur-md">
                        {category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-lg line-clamp-2 md:w-3/4 mb-4">
                        {excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {date}</span>
                        <span>{author}</span>
                    </div>
                </div>
            </Link>
        );
    }

    if (variant === 'list') {
        return (
            <Link href={`/article/${slug}`} className="group flex flex-col sm:flex-row gap-6 bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-colors">
                <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="flex flex-col justify-center flex-1">
                    <h3 className="font-bold text-xl leading-snug group-hover:text-primary transition-colors mb-2">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {excerpt}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                        <span className="text-[10px] uppercase font-bold text-secondary tracking-widest">{category}</span>
                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {date}</span>
                    </div>
                </div>
            </Link>
        );
    }

    if (variant === 'compact') {
        return (
            <Link href={`/article/${slug}`} className="group flex gap-4 bg-card rounded-xl p-3 border border-border hover:border-primary/50 transition-colors h-[110px]">
                <div className="w-24 h-full rounded-lg overflow-hidden shrink-0 relative">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="flex flex-col justify-between py-1">
                    <div>
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-widest block mb-1">
                            {category}
                        </span>
                        <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {title}
                        </h3>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{date}</span>
                </div>
            </Link>
        );
    }

    // Default Grid layout
    return (
        <Link href={`/article/${slug}`} className="group flex flex-col bg-card rounded-xl overflow-hidden border border-border hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all">
            <div className="h-48 overflow-hidden relative">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary uppercase border border-primary/20">
                    {category}
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {excerpt}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-border pt-4 mt-auto">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {date}</span>
                    <span>Read <ArrowRight className="w-3 h-3 inline group-hover:translate-x-1 transition-transform" /></span>
                </div>
            </div>
        </Link>
    );
}
