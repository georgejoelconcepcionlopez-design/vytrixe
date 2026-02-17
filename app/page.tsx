
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowRight, Terminal, Activity, FileText } from 'lucide-react'
import { Metadata } from 'next'
import { ContentItem } from '@/types/content'
import { HERO_ARTICLE, AI_ARTICLES, FINANCE_ARTICLES, REPORT_ARTICLES } from '@/data/content'
import { AdPlaceholder } from '@/components/AdPlaceholder'

// ... existing helper imports ...

export const metadata: Metadata = {
  // ... existing metadata ...
}

export default async function Home() {
  // ... data fetching logic (reusing existing) ...

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">

      {/* 1. Hero Section (Institutional) */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-4 border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">Global Intelligence Live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
            Decrypting the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">Global Capital & AI.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Independent strategic intelligence on artificial intelligence infrastructure, sovereign compute, and macroeconomic shifts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/intel" className="px-8 py-3.5 bg-foreground text-background font-bold text-sm rounded-full hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl">
              Explore Intelligence
            </Link>
            <Link href="/markets" className="px-8 py-3.5 bg-secondary text-secondary-foreground border border-border font-bold text-sm rounded-full hover:bg-secondary/80 transition-all">
              View Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Ad Placement */}
      <div className="container mx-auto max-w-5xl px-4">
        <AdPlaceholder slot="hero-slot-123" label="Sponsor" />
      </div>

      {/* 2. Featured Intelligence Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-12 border-b border-border pb-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              Strategic Analysis
            </h2>
            <Link href="/intel" className="text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {AI_ARTICLES.slice(0, 3).map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group block h-full">
                <div className="h-full bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-50 group-hover:saturate-100"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-background/90 text-foreground backdrop-blur-md rounded-sm border border-border">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs font-semibold text-primary mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      Analysis
                    </div>
                    <h3 className="text-xl font-bold leading-tight mb-3 text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                      {article.summary}
                    </p>
                    <div className="text-xs font-medium text-muted-foreground border-t border-border pt-4 flex justify-between items-center">
                      <span>Vytrixe Intelligence</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Markets Snapshot (Institutional Data) */}
      <section className="py-20 bg-secondary/30 border-y border-border/40">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                Market Signals
              </h2>
              <p className="text-muted-foreground text-sm">Real-time cross-asset performance metrics.</p>
            </div>
            <div className="flex gap-2 text-xs font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              SYSTEM_OPTIMAL_100ms
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'S&P 500', value: '5,420.30', change: '+1.2%', status: 'Bullish', note: 'Tech sector rebound driving momentum.' },
              { label: 'BTC/USD', value: '$98,450', change: '+4.5%', status: 'Surge', note: 'Sovereign accumulation detected.' },
              { label: 'NVDA', value: '$142.50', change: '+2.1%', status: 'Volatile', note: 'Blackwell supply constraints easing.' },
              { label: 'US 10Y', value: '4.25%', change: '-0.05%', status: 'Easing', note: 'Fed rate cut expectations pricing in.' },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border p-5 rounded-lg hover:border-primary/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-bold text-muted-foreground">{item.label}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {item.change}
                  </span>
                </div>
                <div className="text-2xl font-black text-foreground mb-2">{item.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">{item.status}</div>
                <div className="text-xs text-muted-foreground border-t border-border pt-3 opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Reports */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-12 border-b border-border pb-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              Intelligence Reports
            </h2>
            <Link href="/reports" className="text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              Archive <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {REPORT_ARTICLES.slice(0, 3).map((report) => (
              <Link key={report.id} href={`/news/${report.slug}`} className="group block">
                <div className="flex flex-col md:flex-row gap-6 p-6 bg-card border border-border rounded-xl hover:border-primary/40 transition-all items-start md:items-center">
                  <div className="w-full md:w-64 aspect-[3/2] shrink-0 rounded-lg overflow-hidden bg-muted relative">
                    <img src={report.image_url} alt={report.title} className="w-full h-full object-cover saturate-0 group-hover:saturate-100 transition-all" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white text-[10px] font-bold uppercase tracking-widest">
                      RESTRICTED
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{report.category}</span>
                      <span className="text-xs text-muted-foreground">{new Date(report.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                      {report.summary}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Inline Intelligence Brief */}
      <section className="py-24 border-t border-border bg-card">
        <div className="container mx-auto max-w-2xl text-center px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">The Vytrixe Briefing</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Daily strategic notes on AI and capital markets, delivered to your terminal at 08:00 EST.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-20 pointer-events-none" />
            <input
              type="email"
              placeholder="institutional@email.com"
              className="flex-1 bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 relative z-10"
            />
            <button className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-md hover:bg-primary/90 transition-all relative z-10">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
