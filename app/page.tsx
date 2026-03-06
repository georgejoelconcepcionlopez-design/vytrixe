import Link from 'next/link'
import { ArrowRight, Flame, Zap, Activity } from 'lucide-react'
import { Metadata } from 'next'
import { AdPlaceholder } from '@/components/AdPlaceholder'
import { getLatestArticles } from '@/lib/db'
import { ArticleCard } from '@/components/article-card'

export const metadata: Metadata = {
  title: 'Vytrixe | AI Powered Trends & Future Technology',
  description: 'AI-driven insights on technology, startups, crypto, and viral markets.',
}

// Revalidates every 60 seconds to automatically show new articles
export const revalidate = 60;

export default async function Home() {
  const articles = await getLatestArticles(20);

  // Layout slicing
  const mainFeature = articles[0];
  const secondaryFeatures = articles.slice(1, 5);
  const latestNews = articles.slice(5, 11);
  const infiniteFeed = articles.slice(0, 15); // Reusing for feed demo

  return (
    <main className="min-h-screen bg-background text-foreground font-sans pt-8">

      {/* Container below ticker and nav */}
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Ad Placement: Top Banner */}
        <div className="mb-8">
          <AdPlaceholder slot="home-top-banner" label="Sponsor" className="w-full h-[90px]" />
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-32 border border-border rounded-xl mb-16 bg-card">
            <h2 className="text-2xl font-bold text-muted-foreground">No articles published yet.</h2>
            <p className="text-slate-500 mt-2 font-mono">Run the Trend Engine to generate AI content.</p>
          </div>
        ) : (
          <>
            {/* HERO SECTION: 1 Large + 4 Secondary */}
            {mainFeature && (
              <section className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                  <Flame className="w-5 h-5 text-secondary animate-pulse" />
                  <h2 className="text-xl font-bold uppercase tracking-widest text-primary">Top Stories</h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Main Featured */}
                  <div className="lg:col-span-8">
                    <ArticleCard
                      variant="featured"
                      slug={mainFeature.slug}
                      title={mainFeature.title}
                      excerpt={mainFeature.excerpt}
                      category={mainFeature.category}
                      imageUrl={mainFeature.imageUrl}
                      author={mainFeature.author}
                      date={mainFeature.createdAt}
                    />
                  </div>

                  {/* 4 Secondary Featured */}
                  <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    {secondaryFeatures.map((article, idx) => (
                      <ArticleCard
                        key={idx}
                        variant="compact"
                        slug={article.slug}
                        title={article.title}
                        excerpt={article.excerpt}
                        category={article.category}
                        imageUrl={article.imageUrl}
                        author={article.author}
                        date={article.createdAt}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Ad Placement: Mid Page */}
            <div className="mb-16">
              <AdPlaceholder slot="home-mid-banner" label="Sponsor" className="w-full h-[90px]" />
            </div>

            {/* LATEST NEWS GRID */}
            {latestNews.length > 0 && (
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
                    <ArticleCard
                      key={idx}
                      variant="grid"
                      slug={article.slug}
                      title={article.title}
                      excerpt={article.excerpt}
                      category={article.category}
                      imageUrl={article.imageUrl}
                      author={article.author}
                      date={article.createdAt}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

      </div>

      {/* INFINITE SCROLL FEED ALGORITHM */}
      {infiniteFeed.length > 0 && (
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
                      <span className="text-xs font-mono text-slate-500">{post.createdAt}</span>
                    </div>
                    <Link href={`/article/${post.slug}`}>
                      <h4 className="text-lg font-bold hover:text-primary transition-colors mb-2">{post.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    </Link>
                    {post.imageUrl && (
                      <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                        <img src={post.imageUrl} alt="Feed media" className="w-full h-full object-cover" />
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
      )}
    </main>
  )
}
