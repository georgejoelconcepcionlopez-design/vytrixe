import Link from 'next/link';

export default function CategoryBar() {
    const categories = ['AI', 'Technology', 'Crypto', 'Startups', 'Business', 'Viral', 'Tools'];

    return (
        <div className="border-b border-glass-border">
            <div className="container py-3">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={`/category/${cat.toLowerCase()}`}
                            className="whitespace-nowrap text-sm font-semibold text-muted hover:text-accent transition-colors"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
