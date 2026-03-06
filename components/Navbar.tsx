"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "AI", href: "/ai" },
        { name: "Technology", href: "/technology" },
        { name: "Crypto", href: "/crypto" },
        { name: "Startups", href: "/startups" },
        { name: "Business", href: "/business" },
        { name: "Viral", href: "/viral" },
        { name: "Tools", href: "/tools" },
    ]

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 w-full border-b transition-all duration-300",
                scrolled
                    ? "bg-background/90 backdrop-blur-md border-border shadow-sm"
                    : "bg-background border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo (Left) */}
                    <div className="flex-shrink-0 flex items-center pr-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                Vytrixe
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-1 items-center justify-center">
                        <div className="flex space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                        pathname.startsWith(link.href)
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground hover:bg-card"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Actions & Search */}
                    <div className="hidden md:flex items-center justify-end gap-4 pl-8">
                        <div className="relative group">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <Input
                                type="search"
                                placeholder="Search trends..."
                                className="w-64 pl-9 bg-card border-border text-foreground focus-visible:ring-primary rounded-full"
                            />
                        </div>
                        <Link href="/subscribe">
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all rounded-full px-5">
                                Subscribe
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden items-center gap-4">
                        <Search className="h-5 w-5 text-muted-foreground" />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-card focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-background border-b border-border absolute w-full left-0",
                    isOpen ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-4 pt-2 pb-6 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                                pathname.startsWith(link.href)
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="border-t border-border pt-6 mt-4 flex flex-col gap-3 px-1">
                        <Link href="/subscribe" onClick={() => setIsOpen(false)}>
                            <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)] h-12 rounded-lg">
                                Subscribe Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

