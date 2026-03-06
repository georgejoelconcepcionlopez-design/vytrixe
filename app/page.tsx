import Link from 'next/link'
import { ArrowRight, Flame, Clock, Cpu, Zap, Activity } from 'lucide-react'
import { Metadata } from 'next'
import { AdPlaceholder } from '@/components/AdPlaceholder'
import { ALL_CONTENT, HERO_ARTICLE, FEATURED_ARTICLES, MARKET_PRIME_ARTICLE } from '@/data/content'

export const metadata: Metadata = {
  title: 'Vytrixe | AI Powered Trends & Future Technology',
  description: 'AI-driven insights on technology, startups, crypto, and viral markets.',
}

export default async function Home() {
  // Use data from existing data/content as stub for AI generated articles
  const mainFeature = HERO_ARTICLE;
  const secondaryFeatures = [MARKET_PRIME_ARTICLE, ...FEATURED_ARTICLES].slice(0, 4);
  const latestNews = ALL_CONTENT.slice(4, 10);
  const infiniteFeed = ALL_CONTENT.slice(0, 15); // Mock infinite feed

  return (
    <main className="min-h-screen bg-background text-foreground font-sans pt-8">

      {/* Container below ticker and nav */}
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Ad Placement: Top Banner */}
        <div className="mb-8">
          <AdPlaceholder slot="home-top-banner" label="Sponsor" className="w-full h-[90px]" />
        </div>

        {/* HERO SECTION: 1 Large + 4 Secondary */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-5 h-5 text-secondary animate-pulse" />
            <h2 className="text-xl font-bold uppercase tracking-widest text-primary">Top Stories</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Main Featured */}
            <Link href={`/news/${mainFeature.slug}`} className="lg:col-span-8 group block relative rounded-2xl overflow-hidden border border-border bg-card h-[500px]">
              <img src={mainFeature.image_url} alt={mainFeature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-8">
                <span className="bg-primary/20 text-primary w-max px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-primary/30 backdrop-blur-md">
                  {mainFeature.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                  {mainFeature.title}
                </h1>
                <p className="text-muted-foreground text-lg line-clamp-2 md:w-3/4 mb-4">
                  {mainFeature.summary}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2 hours ago</span>
                  <span>{mainFeature.author}</span>
                </div>
              </div>
            </Link>

            {/* 4 Secondary Featured */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {secondaryFeatures.map((article, idx) => (
                <Link key={idx} href={`/news/${article.slug}`} className="group flex gap-4 bg-card rounded-xl p-3 border border-border hover:border-primary/50 transition-colors h-[110px]">
                  <div className="w-24 h-full rounded-lg overflow-hidden shrink-0 relative">
                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[10px] text-secondary font-bold uppercase tracking-widest block mb-1">
                        {article.category}
                      </span>
                      <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">Today</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Ad Placement: Mid Page */}
        <div className="mb-16">
          <AdPlaceholder slot="home-mid-banner" label="Sponsor" className="w-full h-[90px]" />
        </div>

        {/* LATEST NEWS GRID */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 border-border">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" /> Latest Intelligence
            </h2>
            <Link href="/latest" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((article, idx) => (
              <Link key={idx} href={`/news/${article.slug}`} className="group flex flex-col bg-card rounded-xl overflow-hidden border border-border hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary uppercase border border-primary/20">
                    {article.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-border pt-4 mt-auto">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 hrs ago</span>
                    <span>Read <ArrowRight className="w-3 h-3 inline group-hover:translate-x-1 transition-transform" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* INFINITE SCROLL FEED ALGORITHM (Mocked) */}
      <section className="bg-[#0f172a] border-t border-border py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-center mb-12">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Activity className="w-8 h-8 text-secondary" /> The Live Feed
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">

            {infiniteFeed.map((post, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                  <div className="w-3 h-3 bg-secondary rounded-full group-hover:animate-ping"></div>
                </div>

                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-5 rounded-xl hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
                    <span className="text-xs font-mono text-slate-500">12m ago</span>
                  </div>
                  <Link href={`/news/${post.slug}`}>
                    <h4 className="text-lg font-bold hover:text-primary transition-colors mb-2">{post.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.summary}</p>
                  </Link>
                  {post.image_url && (
                    <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                      <img src={post.image_url} alt="Feed media" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex gap-4">
                    <button className="text-xs font-mono text-slate-400 hover:text-primary flex items-center gap-1">SHARE</button>
                    <button className="text-xs font-mono text-slate-400 hover:text-secondary flex items-center gap-1">READ MORE</button>
                  </div>
                </div>

                {/* Inject Ad every 6 posts */}
                {idx > 0 && idx % 5 === 0 && (
                  <div className="w-full col-span-full my-8 relative z-20 flex justify-center">
                    <AdPlaceholder slot={`feed-inline-${idx}`} className="w-full max-w-lg h-[250px] mx-auto" />
                  </div>
                )}
              </div>
            ))}

          </div>

          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 rounded-full bg-card border border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              Load More Streams
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}

