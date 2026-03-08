import { getArticles } from '@/lib/articles';
import CategoryBar from '@/components/CategoryBar';
import ArticleCard from '@/components/ArticleCard';

export default async function HomePage() {
  const articles = await getArticles();

  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1);

  return (
    <div className="pb-20">
      <CategoryBar />

      <div className="container pt-12">
        {featuredArticle && (
          <ArticleCard article={featuredArticle} featured={true} />
        )}

        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Latest Stories</h2>
          <div className="flex-1 h-px bg-glass-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}

          {latestArticles.length === 0 && !featuredArticle && (
            <div className="col-span-full py-20 text-center glass rounded-2xl">
              <p className="text-muted">No articles found in /content/articles/</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
