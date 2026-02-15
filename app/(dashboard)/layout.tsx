
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AdBanner } from '@/components/AdBanner'
import { Logo } from '@/components/Logo'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Session check removed to allow public access to dashboard trends
    // Admin routes are protected separately in /admin/layout.tsx

    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
            {/* Navbar */}
            <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border bg-card px-6 shadow-sm">
                <Link className="flex items-center gap-2 transition-opacity hover:opacity-80" href="/">
                    <Logo variant="default" size="md" />
                </Link>
                <nav className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <Link
                        className="text-sm font-medium hover:text-primary transition-colors"
                        href="/us"
                    >
                        US Trends
                    </Link>
                    <Link
                        className="text-sm font-medium hover:text-primary transition-colors"
                        href="/mx"
                    >
                        MX Trends
                    </Link>
                    <Link
                        className="text-sm font-medium hover:text-primary transition-colors"
                        href="/es"
                    >
                        ES Trends
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <form action="/auth/signout" method="post">
                        <Button variant="outline" size="sm">Sign Out</Button>
                    </form>
                </div>
            </header>

            {/* Top Ad Banner (Below Navbar) */}
            <div className="container mx-auto px-4 mt-6">
                <AdBanner
                    dataAdSlot="1234567890"
                    dataAdFormat="auto"
                    className="w-full h-[100px] mb-4"
                />
            </div>

            {/* Main Content */}
            <main className="flex-1 container mx-auto p-4 md:p-6">
                {children}
            </main>

            {/* Footer Ad Banner */}
            <div className="container mx-auto px-4 pb-8">
                <AdBanner
                    dataAdSlot="0987654321"
                    dataAdFormat="auto"
                    className="w-full h-[100px] mt-4"
                />
            </div>
        </div>
    )
}
