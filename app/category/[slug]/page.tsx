
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ALL_CONTENT } from '@/data/content';
import { getCategory, getAllCategories } from '@/lib/categories';
import { ContentItem } from '@/types/content';

// Simple Article Card for Listing
function ArticleListItem({ article }: { article: ContentItem }) {
    return (
        <Link href={`/news/${article.slug}`} className="group block mb-8">
            <div className="border-l-2 border-slate-200 dark:border-slate-800 pl-6 hover:border-cyan-500 transition-colors">
                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2 uppercase tracking-wider">
                    {article.created_at ? new Date(article.created_at).toLocaleDateString() : 'RECENT'}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {article.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                    {article.summary}
                </p>
            </div>
        </Link>
    );
}

const aliasMap: Record<string, string> = {
    'ai': 'ai-infrastructure',
    'tech': 'ai-infrastructure',
    'artificial-intelligence': 'ai-infrastructure',
    'finance': 'markets',
    'economy': 'markets',
    'business': 'markets',
    'politics': 'geopolitics',
    'world': 'geopolitics',
    'robots': 'robotics',
    'blockchain': 'crypto',
    'web3': 'crypto'
};

// 1. Generate Static Params for SSG (Optional but efficient)
export async function generateStaticParams() {
    const categories = getAllCategories();
    return categories.map((cat) => ({
        slug: cat.slug,
    }));
}

// 2. SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const category = getCategory(slug);

    if (!category) return {};

    return {
        title: `${category.name} | Vytrixe Intelligence`,
        description: category.description,
        openGraph: {
            title: `${category.name} | Vytrixe Intelligence`,
            description: category.description,
            type: 'website',
            url: `https://vytrixe.com/category/${slug}`,
        }
    };
}

// 3. Page Component
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Check aliases first
    const normalizedSlug = slug.toLowerCase();
    if (aliasMap[normalizedSlug]) {
        redirect(`/category/${aliasMap[normalizedSlug]}`);
    }

    const category = getCategory(slug);

    if (!category) {
        notFound();
    }

    // Filter Content
    const categoryArticles = ALL_CONTENT.filter(
        (article) => article.category === category.slug
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-slate-100 font-sans">
            {/* Header */}
            <div className="bg-white dark:bg-black border-b border-slate-200 dark:border-white/10 pt-24 pb-12">
                <div className="container mx-auto max-w-5xl px-6">
                    <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-cyan-500 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Intelligence
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 uppercase">
                        {category.name}
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl border-l-4 border-cyan-500 pl-6">
                        {category.description}
                    </p>
                </div>
            </div>

            {/* List */}
            <div className="container mx-auto max-w-5xl px-6 py-16">
                <div className="mb-8 text-xs font-mono text-slate-400 uppercase tracking-widest">
                    {categoryArticles.length} Intelligence Briefs Found
                </div>

                {categoryArticles.length > 0 ? (
                    <div className="space-y-4">
                        {categoryArticles.map((article) => (
                            <ArticleListItem key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="p-12 border border-dashed border-slate-300 dark:border-slate-800 text-center rounded">
                        <p className="text-slate-500 italic">No intelligence briefs currently available in this sector.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
