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
                "sticky top-0 z-50 w-full border-b transition-all duration-300",
                scrolled
                    ? "bg-white/90 backdrop-blur-md border-slate-200/60 shadow-sm supports-[backdrop-filter]:bg-white/60"
                    : "bg-white border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo (Left) */}
                    <div className="flex-shrink-0 w-[140px]">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-[#0f172a] flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-200">
                                V
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#0f172a]">
                                Vytrixe
                            </span>
                        </Link>
                    </div>

                    {/* Centered Desktop Menu */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <nav className="flex items-center space-x-1 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-sm">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                                        pathname === link.href
                                            ? "bg-white text-[#0f172a] shadow-sm ring-1 ring-slate-200"
                                            : "text-slate-500 hover:text-[#0f172a] hover:bg-white/60"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center justify-end w-[140px] gap-3">
                        <Link href="/login">
                            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-[#0f172a] font-medium hover:bg-slate-100">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="sm" className="bg-[#0f172a] text-white hover:bg-[#0f172a]/90 font-medium shadow-sm hover:shadow-md transition-all active:scale-95 rounded-full px-5">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
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
                    isOpen ? "max-h-[24rem] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-4 pt-2 pb-6 space-y-1 bg-white">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                                pathname === link.href
                                    ? "text-[#0f172a] bg-slate-50"
                                    : "text-slate-600 hover:text-[#0f172a] hover:bg-slate-50"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="border-t border-slate-100 pt-6 mt-4 flex flex-col gap-3 px-1">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full justify-center h-10 rounded-lg border-slate-200">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                            <Button className="w-full justify-center bg-[#0f172a] text-white hover:bg-[#0f172a]/90 h-10 rounded-lg shadow-sm">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
