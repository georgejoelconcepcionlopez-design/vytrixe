import { createClient } from '@/lib/supabase/server';
import { Search, Plus, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

export const revalidate = 0; // Always fresh in admin

export default async function AdminSeoDashboard() {
    const supabase = await createClient();

    // Fetch SEO Pages
    const { data: seoPages, error } = await (supabase as any)
        .from('seo_pages')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        SEO Page Generator Module
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Monitor programmatically generated SEO landing pages and keyword coverage.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-bold hover:bg-secondary/80 transition-colors">
                        <RefreshCw className="w-4 h-4" /> Run SEO Generator
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/80 transition-colors">
                        <Plus className="w-4 h-4" /> Add Keyword Manual
                    </button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border p-6 rounded-xl">
                    <div className="flex items-center gap-3 text-secondary mb-2">
                        <TrendingUp className="w-5 h-5" />
                        <h3 className="font-bold">Total Pages Generated</h3>
                    </div>
                    <p className="text-3xl font-black">{seoPages?.length || 0}</p>
                    <p className="text-xs text-muted-foreground mt-1 text-green-400">Targeting high-intent queries</p>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl">
                    <div className="flex items-center gap-3 text-primary mb-2">
                        <AlertCircle className="w-5 h-5" />
                        <h3 className="font-bold">Pending Target Keywords</h3>
                    </div>
                    <p className="text-3xl font-black">12</p>
                    <p className="text-xs text-muted-foreground mt-1">Queued for next Cron cycles</p>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl">
                    <div className="flex items-center gap-3 text-white mb-2">
                        <Search className="w-5 h-5" />
                        <h3 className="font-bold">Estimated Organic Potential</h3>
                    </div>
                    <p className="text-3xl font-black">High</p>
                    <p className="text-xs text-muted-foreground mt-1 text-green-400">Schema enabled on all pages</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl mt-8">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-bold">Generated SEO Pages Matrix</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search keywords..."
                            className="bg-background border border-border pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs text-muted-foreground bg-muted/50 uppercase font-mono">
                            <tr>
                                <th className="px-6 py-4 rounded-tl-xl">Target Keyword</th>
                                <th className="px-6 py-4">URL Route</th>
                                <th className="px-6 py-4">Page Title</th>
                                <th className="px-6 py-4">Generated At</th>
                                <th className="px-6 py-4 text-right rounded-tr-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {error || !seoPages || seoPages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground font-mono">
                                        No SEO pages generated yet. Let the cron run or generate one manually.
                                    </td>
                                </tr>
                            ) : (
                                seoPages.map((page: any) => (
                                    <tr key={page.id} className="hover:bg-muted/10 transition-colors">
                                        <td className="px-6 py-4 font-bold text-primary">{page.keyword}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                            <a href={`/seo/${page.slug}`} target="_blank" className="hover:text-secondary hover:underline">
                                                /seo/{page.slug}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300 truncate max-w-[200px]">{page.title}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{new Date(page.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded hover:bg-secondary/20 transition-colors font-mono text-xs">
                                                Re-Generate
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
