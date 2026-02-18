
import Link from 'next/link'
import { ArrowRight, Activity, Zap, Shield, Globe } from 'lucide-react'
import { Metadata } from 'next'
import { HERO_ARTICLE, MARKET_PRIME_ARTICLE, FEATURED_ARTICLES, ALL_CONTENT } from '@/data/content'
import { AdPlaceholder } from '@/components/AdPlaceholder'

export const metadata: Metadata = {
  title: 'Vytrixe | AI & Global Market Intelligence',
  description: 'Strategic analysis on infrastructure, capital flows, and global AI power shifts.',
}

export default async function Home() {
  const latestArticles = ALL_CONTENT.slice(0, 6);

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">

      {/* SECTION 1 – HERO */}
      <section className="relative pt-32 pb-20 px-4 border-b border-border/40">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            System Online: Vytrixe_Core_V1
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            AI & Global Market <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Intelligence</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Strategic analysis on infrastructure, capital flows, and global AI power shifts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/news/ai-infrastructure-arms-race-2026" className="px-8 py-3 bg-foreground text-background font-bold text-sm rounded-md hover:bg-foreground/90 transition-all">
              Explore Intelligence
            </Link>
            <Link href="/markets" className="px-8 py-3 bg-secondary text-secondary-foreground border border-border font-bold text-sm rounded-md hover:bg-secondary/80 transition-all flex items-center gap-2">
              View Market Signals <Activity className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Placement: Top Banner */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <AdPlaceholder slot="home-top-banner" label="Sponsor" />
      </div>

      {/* SECTION 2 – Featured Intelligence */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 border-l-4 border-cyan-500 pl-4">
              Featured Intelligence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[HERO_ARTICLE, MARKET_PRIME_ARTICLE, FEATURED_ARTICLES[0]].map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group block h-full">
                <div className="h-full bg-card border border-border rounded-lg overflow-hidden flex flex-col hover:border-cyan-500/50 transition-colors">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-0 right-0 p-3">
                      <span className="bg-black/80 text-cyan-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-cyan-500/20">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-cyan-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono border-t border-border pt-4">
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Analysis <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 – Market Signals Preview */}
      <section className="py-12 border-y border-border/40 bg-black">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold tracking-widest uppercase text-slate-400">Market Signals</h2>
            <Link href="/markets" className="text-xs font-mono text-cyan-500 hover:underline">View Full Dashboard &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'SPX', value: '5,420.30', change: '+1.2%', color: 'text-green-500' },
              { label: 'NVDA', value: '$142.50', change: '+2.1%', color: 'text-green-500' },
              { label: 'BTC', value: '$98,450', change: '+4.5%', color: 'text-green-500' },
              { label: 'XAU', value: '$2,450', change: '+0.4%', color: 'text-yellow-500' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900/50 border border-white/10 p-4 rounded hover:border-white/20 transition-all">
                <div className="text-xs font-bold text-slate-500 mb-1">{item.label}</div>
                <div className="text-xl font-mono font-bold text-white mb-1">{item.value}</div>
                <div className={`text-xs ${item.color} font-bold`}>{item.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 – Latest Intelligence */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Latest Intelligence</h2>
            <div className="h-1 w-20 bg-cyan-500 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {latestArticles.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group flex flex-col h-full border-b border-border pb-8 last:pb-0 md:border-none">
                <div className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-2">
                  {article.category}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-auto text-xs font-mono text-slate-400">
                  ID: {article.id.split('-')[1]} // {new Date(article.created_at).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 – Why Vytrixe */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                <Zap className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-lg font-bold">Infrastructure Focus</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We ignore the hype cycle. Our analysis focuses strictly on the physical layer: energy, compute, and grid modernization.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                <Shield className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold">Institutional Perspective</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Written for decision-makers. We provide the "so what" for sovereign wealth funds, pension desks, and private equity.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold">Strategic Capital Insight</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tracking the $2 trillion capex shift. We follow the money from silicon fabrication to nuclear energy generation.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
