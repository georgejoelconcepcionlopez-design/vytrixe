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
import { TrendingTicker } from '@/components/TrendingTicker'
import { CategoryColumn, SimpleArticle } from '@/components/CategoryColumn'
import { MarketSnapshot } from '@/components/MarketSnapshot'
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
  slug: 'welcome-vytrixe',
  title: 'Vytrixe Intelligence: Global Markets Live',
  description: 'Real-time autonomous reporting on global markets, technology vectors, and emerging cultural shifts.',
  image_url: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
  created_at: new Date().toISOString(),
  dateDisplay: 'LIVE NOW'
};

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
    return data ? data.map(mapToSimpleArticle) : [];
  }

  // Secondary Featured Grid (Right side of hero)
  const secondaryFeatured = await getRecentFallback(3);

  // Safe fallbacks
  const safeAi = aiArticles.length > 0 ? aiArticles : await getRecentFallback(4);
  const safeFinance = financeArticles.length > 0 ? financeArticles : await getRecentFallback(4);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white selection:bg-cyan-500/30 font-sans">

      {/* 1. Global Ticker */}
      <div className="border-b border-white/5 bg-[#050814]">
        <TrendingTicker />
      </div>

      {/* 2. Authority Hero Section */}
      <section className="relative py-16 md:py-24 text-center border-b border-white/10 bg-[#0B0F14] overflow-hidden">
        {/* Background Subtle Gradient */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B0F14] to-[#0B0F14] z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay z-0" />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl animate-in fade-in zoom-in-95 duration-1000">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-cyan-950/30 border border-cyan-500/30 rounded-full shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-[0.2em] font-bold">Global Intelligence Terminal</span>
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-8 drop-shadow-2xl">
            <span className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">VYTRIXE</span>
            <br />
            <span className="text-white">INTEL</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 font-medium leading-relaxed tracking-wide">
            Real-time autonomous reports on <span className="text-white font-bold">global markets</span>, <span className="text-white font-bold">technology vectors</span>, and emerging <span className="text-white font-bold">cultural shifts</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/topics" className="px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-wider text-sm transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.8)] hover:scale-105 rounded-sm">
              Access Intelligence
            </Link>
            <Link href="/markets" className="px-10 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white font-black uppercase tracking-wider text-sm hover:bg-white/5 transition-all rounded-sm">
              Live Markets
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured News Grid */}
      <section className="border-b border-white/10 bg-[#0B0F14] relative z-20 shadow-2xl">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 bg-cyan-500/10 rounded-lg">
              <Zap className="h-5 w-5 text-cyan-400" />
            </div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">Featured Intelligence</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left: Main Feature (2/3) */}
            <div className="lg:col-span-2 group cursor-pointer relative hover:scale-[1.01] transition-transform duration-500">
              <Link href={`/news/${heroArticle.slug}`} className="block h-full">
                <div className="relative aspect-video w-full overflow-hidden border border-white/20 rounded-xl bg-[#0F131C] shadow-2xl">
                  <img
                    src={heroArticle.image_url}
                    alt={heroArticle.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 desaturate-50 group-hover:desaturate-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <Badge className="bg-cyan-500 text-black border-none rounded-none px-3 py-1 text-[11px] font-black uppercase tracking-widest mb-4 shadow-[0_0_15px_-3px_rgba(6,182,212,0.5)]">
                      Top Story
                    </Badge>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] uppercase italic mb-4 group-hover:text-cyan-400 transition-colors drop-shadow-md">
                      {heroArticle.title}
                    </h3>
                    <p className="text-slate-200 text-lg line-clamp-2 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
                      {heroArticle.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Stacked (1/3) */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              {secondaryFeatured.map((item) => (
                <Link key={item.id} href={`/news/${item.slug}`} className="group block flex-1">
                  <div className="h-full p-6 border border-white/10 rounded-xl hover:border-cyan-500/50 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-center shadow-lg hover:shadow-cyan-900/20">
                    <div className="flex items-center gap-2 mb-3 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      <span className="size-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-cyan-400">Live</span>
                      <span className="text-slate-600">|</span>
                      <span>{item.dateDisplay}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white leading-tight group-hover:text-cyan-300 transition-colors line-clamp-3">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sector Intelligence */}
      <section className="py-20 border-b border-white/5 bg-[#0B0F14]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12 pb-4 border-b border-white/5">
            <h2 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-500" />
              Sector Intelligence
            </h2>
            <Link href="/topics" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              View All Sectors
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            <CategoryColumn category="AI" articles={safeAi} />
            <CategoryColumn category="Finance" articles={safeFinance} />
            <CategoryColumn category="Sports" articles={sportsArticles} />
            <CategoryColumn category="Culture" articles={cultureArticles} />
          </div>
        </div>
      </section>

      {/* 5. Market Snapshot (Bottom) */}
      <section className="py-20 bg-[#050814]">
        <div className="container mx-auto px-4">
          <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0B0F14]">
            <div className="p-4 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Global Markets</h3>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="p-8">
              <MarketSnapshot compact={false} />
            </div>
          </div>
        </div>
      </section>

      <ProBanner />

      <footer className="py-12 border-t border-white/5 bg-[#010205] relative z-10">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <div className="flex justify-center items-center gap-2 mb-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-lg font-bold text-white">Vytrixe</span>
            <span className="text-xs border border-white/20 px-1 rounded text-white/50">INTEL</span>
          </div>
          <p className="mb-6 text-sm">© {new Date().getFullYear()} Vytrixe Intelligence. AI-Driven Global News.</p>
          <div className="flex justify-center gap-8 text-sm font-medium">
            <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-cyan-400 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
