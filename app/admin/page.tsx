'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Plus,
    RefreshCw,
    FileEdit,
    Trash2,
    ExternalLink,
    BarChart3,
    Newspaper,
    Zap
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch('/api/admin/news/list');
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Failed to fetch news');
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            const resp = await fetch('/api/news/sync?key=DEV_ADMIN_KEY', { method: 'POST' });
            const data = await resp.json();
            alert(`Sync Complete: ${data.results.imported} imported, ${data.results.skipped} skipped.`);
            fetchNews();
        } catch (error) {
            alert('Sync failed');
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#02040A] text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter italic">News Control Center</h1>
                        <p className="text-slate-500 font-medium">Manage the Vytrixe Intelligence feed</p>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={handleSync} disabled={syncing} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
                            <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                            Update News
                        </Button>
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                            <Plus className="mr-2 h-4 w-4" />
                            Manual Post
                        </Button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-[#0A0F1F] border-white/5">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-bold uppercase text-slate-500">Total Articles</CardTitle>
                            <Newspaper className="h-4 w-4 text-cyan-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black">{news.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#0A0F1F] border-white/5">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-bold uppercase text-slate-500">Total Views</CardTitle>
                            <BarChart3 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black">
                                {news.reduce((acc, curr) => acc + (curr.views || 0), 0)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Article Table */}
                <Card className="bg-[#0A0F1F] border-white/5">
                    <CardHeader>
                        <CardTitle>Recent Intelligence Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="py-12 text-center text-slate-600 italic">Accessing encrypted database...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 text-slate-500 uppercase text-[10px] font-black tracking-widest">
                                            <th className="px-4 py-4">Title</th>
                                            <th className="px-4 py-4">Category</th>
                                            <th className="px-4 py-4">Views</th>
                                            <th className="px-4 py-4">Status</th>
                                            <th className="px-4 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {news.map((item) => (
                                            <tr key={item.id} className="hover:bg-white/[0.02] group transition-colors">
                                                <td className="px-4 py-4 max-w-md">
                                                    <div className="font-bold text-slate-200 line-clamp-1">{item.title}</div>
                                                    <div className="text-[10px] text-slate-600 mt-1">{item.slug}</div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="text-[10px] border border-cyan-500/20 px-2 py-0.5 rounded text-cyan-400 font-bold uppercase tracking-widest">{item.category}</span>
                                                </td>
                                                <td className="px-4 py-4 font-mono text-cyan-500/50">{(item.views || 0).toLocaleString()}</td>
                                                <td className="px-4 py-4">
                                                    {item.is_trending ? (
                                                        <span className="flex items-center gap-1 text-[10px] text-red-400 font-black uppercase">
                                                            <Zap className="h-3 w-3 fill-current" /> Trending
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] text-slate-600 font-black uppercase">Standard</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Link href={`/news/${item.slug}`} target="_blank">
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                                                <ExternalLink className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-cyan-400">
                                                            <FileEdit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-400">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
