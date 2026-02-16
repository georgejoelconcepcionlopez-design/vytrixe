export const revalidate = 60;

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Zap,
  TrendingUp,
  ExternalLink
} from 'lucide-react'
import { CategoryColumn, SimpleArticle } from '@/components/CategoryColumn'
import { MarketTable } from '@/components/MarketTable'
import { ProBanner } from '@/components/ProBanner'
import { Logo } from '@/components/Logo'
import AdBlock from '@/components/AdBlock'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Vytrixe | Real-Time Global Trend Intelligence AI",
  description: "Detect viral trends before they explode. AI-powered analytics for search velocity, social momentum, and market signals across US, Mexico, and Spain.",
  keywords: ["trend intelligence", "viral analytics", "search velocity", "predictive trends", "market signals", "AI trend spotting"],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vytrixe.com',
    siteName: 'Vytrixe Intelligence',
    title: "Vytrixe | Real-Time Global Trend Intelligence AI",
    description: "Detect viral trends before they explode. AI-powered analytics for search velocity and social momentum.",
    images: [
      {
        url: '/og-home.jpg', // Placeholder, user will need to add this asset
        width: 1200,
        height: 630,
        alt: 'Vytrixe Intelligence Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vytrixe | Real-Time Global Trend Intelligence AI",
    description: "Detect viral trends before they explode. AI-powered analytics for search velocity.",
    images: ['/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://vytrixe.com',
  },
}


const DEFAULT_HERO: SimpleArticle = {
  id: 'default-hero',
  slug: 'nvidia-blackwell-demand-surge',
  title: 'NVIDIA Blackwell Demand "Insane": Shares Hit All-Time High',
  description: 'Jensen Huang confirms next-gen AI chips are sold out for 12 months as sovereign AI race accelerates globally.',
  image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
  created_at: new Date().toISOString(),
  dateDisplay: 'LIVE NOW'
};

const MOCK_AI_ARTICLES: SimpleArticle[] = [
  {
    id: 'mock-1',
    slug: 'openai-sora-public-release',
    title: 'OpenAI Sets Release Date for Sora Video Model',
    description: 'Hollywood studios panic as AI video generation reaches near-photorealistic quality with consistent physics.',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    dateDisplay: '1h ago'
  },
  {
    id: 'mock-2',
    slug: 'humanoid-robots-bmw-factory',
    title: 'Figure AI Robots Deploy in BMW Factories',
    description: 'First commercial deployment of general-purpose humanoids marks a shift in industrial automation.',
    image_url: 'https://images.unsplash.com/photo-1485827404703-89f552507387?auto=format&fit=crop&q=80&w=800',
    created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    dateDisplay: '2h ago'
  },
  {
    id: 'mock-3',
    slug: 'apple-vision-pro-2-leaks',
    title: 'Apple Vision Pro 2: Brain-Computer Interface Rumored',
    description: 'Patents suggest neural inputs could replace hand gestures in the next generation headset.',
    image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    dateDisplay: '3h ago'
  },
  {
    id: 'mock-4',
    slug: 'spacex-starship-mars-timeline',
    title: 'SpaceX Starship: Mars Landing Target 2029',
    description: 'Musk accelerates timeline following successful orbital transfer tests and booster catches.',
    image_url: 'https://images.unsplash.com/photo-1541185933-710f50b90858?auto=format&fit=crop&q=80&w=800',
    created_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    dateDisplay: '4h ago'
  },
  {
    id: 'mock-5',
    slug: 'quantum-computing-breakthrough-google',
    title: 'Google Claims Quantum Error Correction Milestone',
    description: 'New Sycamore chip reduces noise by 40%, paving the way for stable qubits.',
    image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    created_at: new Date(Date.now() - 18000000).toISOString(),
    dateDisplay: '5h ago'
  }
];

export default async function Home() {
  const supabase = await createClient()

  // --- Helper: Map DB result to SimpleArticle ---
  const mapToSimpleArticle = (item: any): SimpleArticle => ({
    id: item.id,
    slug: item.trend_id || item.slug,
    title: item.seo_title?.split('|')[0]?.trim() || item.title || 'Intelligence Report',
    description: item.seo_description || item.excerpt || 'Market intelligence briefing.',
    image_url: item.image_url || 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
    created_at: item.created_at,
    dateDisplay: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  });

  // --- Data Fetching Strategies ---

  // 1. Featured Hero (Latest Trending)
  const fetchHero = async () => {
    // Try 'news' table first
    const { data: newsItems } = await (supabase as any)
      .from('news')
      .select('*')
      .eq('is_trending', true)
      .order('created_at', { ascending: false })
      .limit(1);

    if (newsItems && newsItems.length > 0) return mapToSimpleArticle(newsItems[0]);

    // Fallback to 'trend_articles'
    const { data: trendItems } = await supabase
      .from('trend_articles')
      .select('*')
      .order('score', { ascending: false })
      .limit(1);

    if (trendItems && trendItems.length > 0) return mapToSimpleArticle(trendItems[0]);
    return null;
  };

  // 2. Category Columns
  const fetchCategoryArticles = async (categorySlug: string) => {
    const { data: catData } = await supabase
      .from('categories')
      .select('id')
      .ilike('slug', categorySlug)
      .single();

    if (!catData) return [];

    const { data: articles } = await supabase
      .from('trend_articles')
      .select('*')
      .eq('category_id', catData.id)
      .order('created_at', { ascending: false })
      .limit(4); // 1 Feature + 3 List

    return articles ? articles.map(mapToSimpleArticle) : [];
  };

  // Parallel Fetching
  const [fetchedHero, aiArticles, financeArticles, sportsArticles, cultureArticles] = await Promise.all([
    fetchHero(),
    fetchCategoryArticles('ai'),
    fetchCategoryArticles('crypto'), // Mapping Finance -> Crypto for now
    fetchCategoryArticles('sports'),
    fetchCategoryArticles('culture') // Fallback might be empty if not exists
  ]);

  // Use fetched hero or default
  const heroArticle = fetchedHero || DEFAULT_HERO;

  // Fallback for categories if empty
  const getRecentFallback = async (limit = 3) => {
    const { data } = await supabase.from('trend_articles').select('*').order('created_at', { ascending: false }).limit(limit);
    return data && data.length > 0 ? data.map(mapToSimpleArticle) : MOCK_AI_ARTICLES.slice(0, limit);
  }

  // Secondary Featured Grid (Right side of hero)
  const secondaryFeatured = await getRecentFallback(3);

  // Safe fallbacks
  const safeAi = aiArticles.length > 0 ? aiArticles : MOCK_AI_ARTICLES.slice(0, 4);
  const safeFinance = financeArticles.length > 0 ? financeArticles : await getRecentFallback(4);

  return (
    <main className="min-h-screen bg-slate-50 text-[#111111] font-sans">

      {/* 2. Authority Hero Section */}
      <section className="py-16 md:py-20 border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#0f172a]" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Global Intelligence Terminal
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0f172a] leading-[1.05] tracking-tight mb-8">
                Real-Time <br />
                Global Intelligence.
              </h1>

              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Real-time autonomous reporting on <strong>global markets</strong>, <strong>technology vectors</strong>, and emerging <strong>cultural shifts</strong>.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/topics" className="px-8 py-3.5 bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-sm rounded-sm transition-colors shadow-sm">
                  Access Intelligence
                </Link>
                <Link href="/markets" className="px-8 py-3.5 bg-white border border-slate-300 hover:border-slate-800 text-slate-900 font-semibold text-sm rounded-sm transition-all shadow-sm">
                  Live Markets
                </Link>
              </div>
            </div>

            {/* Right Data Highlight / Featured Image */}
            <div className="lg:col-span-5">
              <Link href={`/news/${heroArticle.slug}`} className="block group">
                <div className="relative aspect-[4/3] bg-slate-100 rounded-md overflow-hidden border border-slate-200 shadow-sm transition-shadow group-hover:shadow-md">
                  <img
                    src={heroArticle.image_url}
                    alt={heroArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="inline-block px-2 py-1 bg-white text-xs font-bold uppercase tracking-wider mb-3 text-slate-900 rounded-sm">
                      Featured
                    </span>
                    <h3 className="text-white text-2xl font-bold leading-tight group-hover:underline decoration-white/50 underline-offset-4">
                      {heroArticle.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Intelligence Grid */}
      <section className="py-16 bg-[#f7f8fa] border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-[#0f172a]">Featured Intelligence</h2>
            <Link href="/news" className="text-sm font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {secondaryFeatured.map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`} className="group block h-full">
                <div className="h-full bg-white border border-slate-200 p-6 rounded-md shadow-sm transition-all hover:shadow-md hover:border-slate-300 flex flex-col">
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-400 uppercase tracking-wide">
                    <span className="text-red-600">● Live</span>
                    <span>{item.dateDisplay}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#111111] leading-snug mb-3 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sector Intelligence (Data Tables style) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Sector Analysis</h2>
            <p className="text-slate-500">Deep dive into key market verticals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-6">
              <h3 className="font-bold border-b border-slate-200 pb-2 text-sm uppercase tracking-wider text-slate-900">AI & Tech</h3>
              <div className="flex flex-col gap-4">
                {safeAi.map(story => (
                  <Link key={story.id} href={`/news/${story.slug}`} className="group">
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 leading-snug mb-1">{story.title}</h4>
                    <p className="text-xs text-slate-400">{story.dateDisplay}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold border-b border-slate-200 pb-2 text-sm uppercase tracking-wider text-slate-900">Finance</h3>
              <div className="flex flex-col gap-4">
                {safeFinance.map(story => (
                  <Link key={story.id} href={`/news/${story.slug}`} className="group">
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 leading-snug mb-1">{story.title}</h4>
                    <p className="text-xs text-slate-400">{story.dateDisplay}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold border-b border-slate-200 pb-2 text-sm uppercase tracking-wider text-slate-900">Sports</h3>
              <div className="flex flex-col gap-4">
                {sportsArticles.map(story => (
                  <Link key={story.id} href={`/news/${story.slug}`} className="group">
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 leading-snug mb-1">{story.title}</h4>
                    <p className="text-xs text-slate-400">{story.dateDisplay}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold border-b border-slate-200 pb-2 text-sm uppercase tracking-wider text-slate-900">Global</h3>
              <div className="flex flex-col gap-4">
                {cultureArticles.map(story => (
                  <Link key={story.id} href={`/news/${story.slug}`} className="group">
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 leading-snug mb-1">{story.title}</h4>
                    <p className="text-xs text-slate-400">{story.dateDisplay}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Market Snapshot (Bottom) */}
      <section className="py-16 bg-[#f7f8fa]">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">Market Data Terminal</h3>
              <p className="text-sm text-slate-500">Real-time cross-asset performance metrics.</p>
            </div>
            <span className="text-xs font-mono text-green-600 font-bold bg-green-100 px-2 py-1 rounded-sm">● SYSTEM ONLINE</span>
          </div>
          <MarketTable />
        </div>
      </section>

      <ProBanner />

      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="text-lg font-bold text-[#0f172a]">Vytrixe</span>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-slate-100 px-2 py-0.5 rounded text-slate-600">Intel</span>
          </div>
          <p className="mb-6 text-sm">© {new Date().getFullYear()} Vytrixe Intelligence.</p>
          <div className="flex justify-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/privacy-policy" className="hover:text-[#0f172a] transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-[#0f172a] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#0f172a] transition-colors">Contact</Link>
            <Link href="/about" className="hover:text-[#0f172a] transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
