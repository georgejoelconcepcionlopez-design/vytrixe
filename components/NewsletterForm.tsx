
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Mail, CheckCircle2 } from "lucide-react"

interface NewsletterFormProps {
    source?: string
    variant?: "minimal" | "card"
}

export function NewsletterForm({ source = "homepage", variant = "card" }: NewsletterFormProps) {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")

        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source })
            })

            if (!res.ok) throw new Error()

            setStatus("success")
            setEmail("")
        } catch {
            setStatus("error")
        }
    }

    if (status === "success") {
        return (
            <div className={`flex items-center gap-2 text-cyan-400 bg-cyan-950/20 p-4 rounded-lg border border-cyan-500/20 ${variant === 'card' ? 'w-full' : ''}`}>
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">You&apos;re in! Watch your inbox.</span>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className={`relative max-w-md ${variant === 'card' ? 'w-full' : ''}`}>
            <div className="flex gap-2">
                <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        type="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-500/50 transition-colors"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold whitespace-nowrap"
                >
                    {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Alerts"}
                </Button>
            </div>
            {status === "error" && (
                <p className="absolute -bottom-6 left-0 text-xs text-red-400">Something went wrong. Try again.</p>
            )}
        </form>
    )
}
