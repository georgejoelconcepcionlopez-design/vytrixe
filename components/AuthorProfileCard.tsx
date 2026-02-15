
import Link from 'next/link'
import { Twitter, Linkedin, ExternalLink } from 'lucide-react'

interface Author {
    name: string
    slug: string
    bio: string
    credentials: string
    avatar_url: string
    twitter_url?: string
    linkedin_url?: string
}

export function AuthorProfileCard({ author }: { author: Author }) {
    // Person Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": author.name,
        "url": `https://vytrixe.com/authors/${author.slug}`,
        "description": author.bio,
        "jobTitle": author.credentials,
        "image": author.avatar_url
    }

    return (
        <div className="bg-gradient-to-br from-[#0A0F1F] to-[#050814] border border-white/5 rounded-3xl p-8 my-12 relative overflow-hidden group">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Background Accent */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-colors" />

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
                <div className="relative">
                    <div className="h-24 w-24 rounded-2xl overflow-hidden border-2 border-white/5 ring-4 ring-cyan-500/10">
                        <img src={author.avatar_url} alt={author.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center text-black">
                        <ShieldCheck size={18} />
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">Authenticated Analyst</div>
                        <h3 className="text-2xl font-bold text-white mb-1">{author.name}</h3>
                        <p className="text-sm font-medium text-slate-500">{author.credentials}</p>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                        {author.bio}
                    </p>

                    <div className="flex items-center gap-4 pt-2 justify-center md:justify-start">
                        <Link href={`/authors/${author.slug}`} className="text-xs font-bold text-white hover:text-cyan-400 flex items-center gap-2 transition-colors">
                            Full Portfolio <ExternalLink className="h-3 w-3" />
                        </Link>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <div className="flex gap-4">
                            {author.twitter_url && <a href={author.twitter_url} className="text-slate-500 hover:text-cyan-400 transition-colors"><Twitter size={16} /></a>}
                            {author.linkedin_url && <a href={author.linkedin_url} className="text-slate-500 hover:text-cyan-400 transition-colors"><Linkedin size={16} /></a>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ShieldCheck({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    )
}
