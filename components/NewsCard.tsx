import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NewsCardProps {
    news: {
        title: string;
        slug: string;
        excerpt: string;
        image: string;
        category: string;
        source: string;
        author: string;
        createdAt: Date | string;
    };
    featured?: boolean;
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
    const dateStr = new Date(news.createdAt).toLocaleDateString();

    if (featured) {
        return (
            <Link href={`/news/${news.slug}`}>
                <Card className="relative overflow-hidden group border-none bg-black h-[500px]">
                    <div className="absolute inset-0">
                        <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-8 space-y-4">
                        <Badge className="bg-cyan-500 text-black font-bold uppercase">{news.category}</Badge>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            {news.title}
                        </h2>
                        <p className="text-slate-300 text-lg line-clamp-2 max-w-2xl">
                            {news.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <span>{news.author}</span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <span>{news.source}</span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <span>{dateStr}</span>
                        </div>
                    </div>
                </Card>
            </Link>
        );
    }

    return (
        <Link href={`/news/${news.slug}`}>
            <Card className="bg-[#0A0F1F] border-white/5 hover:border-cyan-500/30 transition-all p-0 overflow-hidden group h-full">
                <div className="aspect-video overflow-hidden">
                    <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <CardContent className="p-6 space-y-3">
                    <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[10px] uppercase">
                        {news.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {news.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3">
                        {news.excerpt}
                    </p>
                    <div className="pt-4 flex items-center justify-between text-[10px] uppercase font-bold text-slate-500">
                        <span>{news.source}</span>
                        <span>{dateStr}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
