
import { Cpu, BarChart3, Globe2, Search } from "lucide-react"

export function TrustIndicators() {
    const indicators = [
        { icon: Cpu, text: "AI-Powered Detection" },
        { icon: BarChart3, text: "500K+ Data Signals" },
        { icon: Globe2, text: "Multi-Country Tracking" },
        { icon: Search, text: "SEO-Optimized Engine" },
    ]

    return (
        <div className="grid grid-cols-2 gap-4 mt-8 max-w-lg">
            {indicators.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground/80">
                    <item.icon className="w-5 h-5 text-primary/80" />
                    <span>{item.text}</span>
                </div>
            ))}
        </div>
    )
}
