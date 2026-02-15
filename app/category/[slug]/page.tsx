import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import NewsCard from '@/components/NewsCard';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, Zap } from 'lucide-react';
import AdBlock from '@/components/AdBlock';

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const supabase = await createClient();
    const { slug } = await params;

    // Helper function to map trend_articles to News structure
    const mapTrendToNews = (item: any) => ({
        id: item.id,
        title: item.seo_title?.split('|')[0]?.trim() || 'Intelligence Report',
        slug: item.trend_id,
        excerpt: item.seo_description || 'Real-time market signal analysis and strategic intelligence.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        category: item.categories?.name || slug,
        source: 'Vytrixe Editorial',
        author: 'AI Intel Desk',
        createdAt: item.created_at,
        views: item.views || 0,
        is_trending: true
    });

    let newsList = [];
    const { data: nList, error: nErr } = await (supabase as any)
        .from('news')
        .select('*')
        .eq('category', slug)
        .order('created_at', { ascending: false })
        .limit(12);

    if (!nList || nList.length === 0 || nErr) {
        // Fallback to trend_articles
        const { data: lFallback } = await supabase
            .from('trend_articles')
            .select('*, categories!inner(name, slug)')
            .eq('categories.slug', slug)
            .order('created_at', { ascending: false })
            .limit(12);

        if (lFallback) {
            newsList = lFallback.map(mapTrendToNews);
        }
    } else {
        newsList = nList;
    }

    if (newsList.length === 0 && !['technology', 'business', 'science', 'health', 'general'].includes(slug)) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#02040A] text-white">
            <div className="py-24 border-b border-white/5 bg-gradient-to-b from-[#0A0F1F] to-[#02040A]">
                <div className="container mx-auto px-4">
                    <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-cyan-400 mb-12 transition-colors uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Global Intelligence
                    </Link>

                    <div className="max-w-4xl">
                        <Badge className="bg-cyan-500 text-black font-black mb-6 px-4 py-1.5 rounded-full uppercase italic text-xs">Category Hub</Badge>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic">{slug}</h1>
                        <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl font-medium">
                            Real-time {slug} coverage and AI-driven market signals.
                        </p>
                    </div>
                </div>
            </div>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-16 px-4 py-2 bg-white/5 rounded-2xl w-fit border border-white/5">
                        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                            <Zap className="h-4 w-4" /> Hub Tracking
                        </div>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{newsList?.length || 0} Active Articles</div>
                    </div>

                    <AdBlock position="category_top" />

                    {newsList && newsList.length > 0 ? (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                            {newsList.map((news: any) => (
                                <NewsCard key={news.id} news={news} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 text-slate-500 italic">
                            No articles found in this category yet.
                        </div>
                    )}

                    <AdBlock position="category_bottom" />
                </div>
            </section>
        </main>
    );
}
