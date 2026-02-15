
"use client"

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    // Generate JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `https://vytrixe.com${item.href}`
        }))
    }

    return (
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <Home className="h-3 w-3" />
                Trends
            </Link>
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-slate-800" />
                    <Link
                        href={item.href}
                        className={i === items.length - 1 ? "text-cyan-500" : "hover:text-cyan-400 transition-colors"}
                    >
                        {item.label}
                    </Link>
                </div>
            ))}
        </nav>
    )
}
