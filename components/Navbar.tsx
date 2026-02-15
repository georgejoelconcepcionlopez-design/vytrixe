"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Terminal, Globe, Brain, Zap, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
        { name: "Home", href: "/", icon: null },
        { name: "Markets", href: "/markets", icon: null },
        { name: "Reports", href: "/reports", icon: null },
        { name: "Intelligence", href: "/intel", icon: null },
        { name: "Games", href: "/games", icon: null },
        { name: "Admin", href: "/admin", icon: null },
    ]

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 w-full border-b transition-all duration-200",
                scrolled
                    ? "bg-white/95 backdrop-blur-sm border-slate-200 shadow-sm"
                    : "bg-white border-slate-200"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo (Dark Institutional) */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-sm bg-[#0f172a] flex items-center justify-center text-white font-bold text-lg">
                                V
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#0f172a]">
                                VYTRIXE
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-all duration-200 border-b-2 border-transparent hover:border-slate-900 pb-0.5",
                                        pathname === link.href
                                            ? "text-[#111111] border-slate-900"
                                            : "text-slate-600 hover:text-[#111111]"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/login">
                            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium h-9 px-4 rounded-sm">
                                Dashboard
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
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
                    "md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white border-b border-slate-200",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-4 pt-2 pb-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "block px-3 py-2 rounded-sm text-base font-medium",
                                pathname === link.href
                                    ? "text-[#111111] bg-slate-100"
                                    : "text-slate-600 hover:text-[#111111] hover:bg-slate-50"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="border-t border-slate-100 pt-4 mt-4">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button className="w-full justify-center bg-[#0f172a] text-white hover:bg-[#0f172a]/90 rounded-sm">
                                Dashboard Access
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
