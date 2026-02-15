
import { Metadata } from 'next'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Users, MousePointer, Shield } from "lucide-react"
import { AdminExpansionButton } from "@/components/AdminExpansionButton"

export const metadata: Metadata = {
    title: "Revenue Analytics | Vytrixe Admin",
    description: "Internal dashboard.",
    robots: "noindex, nofollow"
}

export default function RevenueDashboard() {
    // Mock Data
    const metrics = [
        { label: "Est. Revenue (30d)", value: "$4,230.50", change: "+12%", icon: DollarSign },
        { label: "Avg. RPM", value: "$18.40", change: "+5%", icon: TrendingUp },
        { label: "Active PRO Subs", value: "142", change: "+8 new", icon: Users },
        { label: "Affiliate CTR", value: "3.2%", change: "-0.5%", icon: MousePointer },
    ]

    return (
        <main className="min-h-screen bg-[#02040A] text-white p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Revenue Command Center</h1>
                <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 gap-2 px-3 py-1">
                    <Shield className="h-3 w-3" /> Secure Admin Access
                </Badge>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-6">
                        {metrics.map((m, i) => (
                            <Card key={i} className="bg-white/5 border-white/10">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                                            <m.icon className="h-5 w-5 text-cyan-400" />
                                        </div>
                                        <Badge variant="outline" className={m.change.startsWith('+') ? "text-emerald-400 border-emerald-500/20" : "text-red-400 border-red-500/20"}>
                                            {m.change}
                                        </Badge>
                                    </div>
                                    <div className="text-3xl font-bold mb-1">{m.value}</div>
                                    <div className="text-xs text-slate-500">{m.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <AdminExpansionButton />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-white/5 border-white/10 p-6 h-[300px] flex items-center justify-center text-slate-500">
                    [Revenue Chart Placeholder]
                </Card>
                <Card className="bg-white/5 border-white/10 p-6 h-[300px] flex items-center justify-center text-slate-500">
                    [Subscriber Growth Placeholder]
                </Card>
            </div>
        </main>
    )
}
