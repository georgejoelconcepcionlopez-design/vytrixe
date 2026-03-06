import Link from "next/link";
import { LayoutDashboard, FileText, TrendingUp, Settings, LogOut, Activity } from "lucide-react";

export const metadata = {
    title: "Vytrixe Core | Admin",
    description: "Vytrixe Content Management System",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border flex flex-col hidden md:flex">
                <div className="p-6 border-b border-border">
                    <Link href="/admin" className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                        </span>
                        <span className="font-black text-xl tracking-tight uppercase">Vytrixe<span className="text-cyan-500">Core</span></span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold transition-colors">
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link href="/admin/articles" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/10 text-muted-foreground hover:text-foreground transition-colors">
                        <FileText className="w-5 h-5" /> Intelligence Queue
                    </Link>
                    <Link href="/admin/trends" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/10 text-muted-foreground hover:text-foreground transition-colors">
                        <TrendingUp className="w-5 h-5" /> Trend Engine Matrix
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/10 text-muted-foreground hover:text-foreground transition-colors">
                        <Settings className="w-5 h-5" /> System Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer">
                        <LogOut className="w-5 h-5" /> Drop Connection
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-[#02040A] overflow-y-auto">
                {/* Top Header */}
                <header className="h-16 border-b border-border bg-card/50 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
                        <Activity className="w-4 h-4 text-secondary" /> System Operations Normal
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded bg-primary/20 text-primary flex items-center justify-center font-bold text-xs ring-1 ring-primary/50">
                            A1
                        </span>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
