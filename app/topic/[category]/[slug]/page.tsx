
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Globe, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ALL_CONTENT } from '@/data/content';
import { ContentItem } from '@/types/content';

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

// Helper to clean strings
function cleanText(text: string): string {
    return text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// 1. Generate Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category, slug } = await params;
    const topicName = cleanText(slug);
    const categoryName = cleanText(category);

    return {
        title: `${topicName} – ${categoryName} Intelligence | Vytrixe`,
        description: `Deep analysis and strategic coverage on ${topicName} within the ${categoryName} sector.`,
        alternates: {
            canonical: `https://vytrixe.com/topic/${category}/${slug}`
        }
    };
}

// 2. Article Card Component
function TopicArticleCard({ article }: { article: ContentItem }) {
    return (
        <Link href={`/news/${article.slug}`} className="group block bg-[#0A0A0A] border border-white/5 hover:border-cyan-500/50 p-6 rounded-lg transition-all">
            <div className="flex flex-col h-full">
                <div className="mb-4">
                    <Badge variant="outline" className="text-xs text-cyan-500 border-cyan-500/30 uppercase tracking-widest mb-3">
                        {article.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                        {article.summary}
                    </p>
                </div>

                <div className="mt-auto flex items-center gap-4 text-xs font-mono text-slate-600 uppercase">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(article.created_at).toLocaleDateString()}
                    </div>
                    {article.author && (
                        <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {article.author.split(' ')[0]}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

// 3. Main Page Component
export default async function TopicPage({ params }: PageProps) {
    const { category, slug } = await params;

    const topicName = cleanText(slug);
    const categoryName = cleanText(category);
    const searchTerm = slug.replace(/-/g, ' ').toLowerCase();

    // Filter Logic
    const articles = ALL_CONTENT.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(searchTerm);
        const summaryMatch = article.summary.toLowerCase().includes(searchTerm);
        const contentMatch = article.content?.toLowerCase().includes(searchTerm);

        return titleMatch || summaryMatch || contentMatch;
    });

    return (
        <main className="min-h-screen bg-[#02040A] text-white pt-24 pb-16">
            <div className="container mx-auto max-w-6xl px-6">

                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-cyan-500 mb-6 uppercase tracking-widest transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Intelligence
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 px-3 py-1 uppercase tracking-widest text-xs font-bold">
                            Topic Analysis
                        </Badge>
                        <span className="text-slate-500 text-sm font-mono uppercase">/ {categoryName}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                        {topicName}
                    </h1>

                    <p className="text-xl text-slate-400 max-w-3xl border-l-4 border-cyan-500 pl-6 leading-relaxed">
                        Latest intelligence and strategic analysis on <span className="text-white font-bold">{topicName}</span>.
                        Tracking key developments, market impact, and future outlook.
                    </p>
                </div>

                {/* Results Grid */}
                {articles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map(article => (
                            <TopicArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center border border-dashed border-white/10 rounded-xl bg-white/5">
                        <Hash className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-300 mb-2">No Intelligence Found</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            We haven't published specific briefs on {topicName} yet. Our analysts are tracking this sector closely.
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
}
