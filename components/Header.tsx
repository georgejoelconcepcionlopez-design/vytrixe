import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Header() {
    const categories = ['AI', 'Technology', 'Crypto', 'Startups', 'Business', 'Viral', 'Tools'];

    return (
        <header className="glass sticky top-0 z-50 w-full">
            <div className="container py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black tracking-tighter text-accent">
                    VYTRIXE
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={`/category/${cat.toLowerCase()}`}
                            className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors"
                        >
                            {cat}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            type="text"
                            placeholder="Search news..."
                            className="bg-card border border-glass-border pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:border-accent w-48 transition-all"
                        />
                    </div>
                    <button className="btn btn-primary text-xs">SUBSCRIBE</button>
                </div>
            </div>
        </header>
    );
}
