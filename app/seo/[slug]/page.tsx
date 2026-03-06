import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ExternalLink, Zap } from 'lucide-react';
import { AdBanner, AdSidebar } from '@/components/ads/AdComponents';

export const revalidate = 60; // Auto update

interface SeoPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SeoPageProps): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();
    if (!supabase) return { title: 'Vytrixe Intelligence' };

    const { data: seoPage } = await (supabase as any)
        .from('seo_pages')
        .select('title, meta_description, slug, created_at')
        .eq('slug', slug)
        .maybeSingle();

    if (!seoPage) {
        return { title: 'Page Not Found | Vytrixe' };
    }

    return {
        title: `${seoPage.title} | Vytrixe`,
        description: seoPage.meta_description,
        openGraph: {
            title: seoPage.title,
            description: seoPage.meta_description,
            url: `https://vytrixe.com/seo/${seoPage.slug}`,
            type: 'article',
            siteName: 'Vytrixe',
            publishedTime: seoPage.created_at
        }
    };
}

export default async function SeoLandingPage({ params }: SeoPageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    if (!supabase) {
        notFound();
    }

    const { data: seoPage } = await (supabase as any)
        .from('seo_pages')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

    if (!seoPage) {
        notFound();
    }

    // Generate FAQ Schema conditionally
    let faqSchema: any = null;
    if (seoPage.content?.faq && seoPage.content.faq.length > 0) {
        faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": seoPage.content.faq.map((item: any) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        };
    }

    // Internal Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://vytrixe.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "SEO & Guides",
                "item": "https://vytrixe.com/seo"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": seoPage.title,
                "item": `https://vytrixe.com/seo/${seoPage.slug}`
            }
        ]
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-sans pt-16">
            {/* Schemas */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}

            {/* Breadcrumbs */}
            <div className="border-b border-border bg-card/50">
                <div className="container mx-auto px-4 max-w-6xl py-3 flex items-center text-xs font-mono text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <span className="hover:text-primary transition-colors cursor-pointer">Guides</span>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <span className="text-foreground truncate w-48 sm:w-auto">{seoPage.keyword}</span>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-12">

                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6 inline-block">
                        Vytrixe Intelligence Guide
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-black leading-[1.15] tracking-tight mb-6 mt-4">
                        {seoPage.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {seoPage.meta_description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Main Body */}
                    <div className="lg:col-span-8">
                        <AdBanner />

                        <article className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed text-lg lg:text-xl font-light mt-10"
                            dangerouslySetInnerHTML={{ __html: seoPage.content?.bodyHtml || '' }} />

                        {/* FAQs */}
                        {seoPage.content?.faq && seoPage.content.faq.length > 0 && (
                            <div className="mt-16 pt-10 border-t border-border">
                                <h2 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-primary" /> Frequently Asked Questions
                                </h2>
                                <div className="space-y-6">
                                    {seoPage.content.faq.map((item: any, idx: number) => (
                                        <div key={idx} className="bg-card border border-border rounded-xl p-6">
                                            <h3 className="font-bold text-lg mb-3">{item.question}</h3>
                                            <p className="text-muted-foreground text-sm">{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-16 border border-primary/20 bg-primary/5 rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(0,229,255,0.05)]">
                            <h3 className="text-2xl font-black mb-4">Want more insights like this?</h3>
                            <p className="text-muted-foreground mb-6">Join the Vytrixe network to receive weekly breakdowns of the exact tools the top 1% are using.</p>
                            <Link href="/subscribe" className="inline-block bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-shadow">
                                Get Free Intelligence
                            </Link>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <AdSidebar />

                        <div className="sticky top-24 mt-12">
                            <h4 className="text-sm font-bold uppercase mb-6 text-primary tracking-widest border-l-4 border-secondary pl-3">
                                Related Categories
                            </h4>
                            <div className="flex flex-col gap-3">
                                <Link href="/category/ai" className="group flex items-center justify-between bg-card border border-border p-4 rounded-xl hover:border-primary/50 transition-colors">
                                    <span className="font-bold group-hover:text-primary transition-colors">Artificial Intelligence</span>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                </Link>
                                <Link href="/category/technology" className="group flex items-center justify-between bg-card border border-border p-4 rounded-xl hover:border-primary/50 transition-colors">
                                    <span className="font-bold group-hover:text-primary transition-colors">Modern Technology</span>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                </Link>
                                <Link href="/category/tools" className="group flex items-center justify-between bg-card border border-border p-4 rounded-xl hover:border-primary/50 transition-colors">
                                    <span className="font-bold group-hover:text-primary transition-colors">Software & Tools</span>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                </Link>
                                <Link href="/category/startups" className="group flex items-center justify-between bg-card border border-border p-4 rounded-xl hover:border-primary/50 transition-colors">
                                    <span className="font-bold group-hover:text-primary transition-colors">Startup Scalability</span>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                </Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
