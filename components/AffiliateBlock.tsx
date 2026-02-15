
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ShoppingBag, TrendingUp, Cpu } from "lucide-react"

interface AffiliateProduct {
    id: string
    name: string
    description: string
    url: string
    price: string
    tags: string[]
    icon: React.ElementType
}

const PRODUCTS: AffiliateProduct[] = [
    {
        id: 'trading-view',
        name: 'TradingView Pro',
        description: 'The standard for charting and technical analysis. Essential for following market trends.',
        url: '#', // Affiliate link would go here
        price: 'Free Trial',
        tags: ['finance', 'crypto', 'stocks', 'analysis'],
        icon: TrendingUp
    },
    {
        id: 'ledger-n',
        name: 'Ledger Nano X',
        description: 'Secure your crypto assets with the industry standard hardware wallet.',
        url: '#',
        price: '$149',
        tags: ['crypto', 'tech', 'security'],
        icon: Cpu
    },
    {
        id: 'whoop',
        name: 'WHOOP 4.0',
        description: 'Track your recovery and strain. The wearable for peak performers.',
        url: '#',
        price: 'Membership',
        tags: ['tech', 'health', 'sports'],
        icon: ShoppingBag
    }
]

export function AffiliateBlock({ tags = [] }: { tags?: string[] }) {
    // Simple matching logic: find product with matching tag
    // Fallback to first product if no match
    const product = PRODUCTS.find(p => p.tags.some(t => tags.includes(t.toLowerCase()))) || PRODUCTS[0]
    const Icon = product.icon

    return (
        <Card className="my-8 bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-900/30 overflow-hidden relative group not-prose">
            <div className="absolute top-0 right-0 p-2 opacity-50">
                <Badge variant="outline" className="text-[10px] text-slate-500 border-slate-800">PARTNER</Badge>
            </div>
            <CardContent className="p-6 flex items-start sm:items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-cyan-950/50 flex items-center justify-center border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-200 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                        {product.name}
                        <ExternalLink className="h-3 w-3 opacity-50" />
                    </h4>
                    <p className="text-sm text-slate-400 mt-1 mb-2">{product.description}</p>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-cyan-500">{product.price}</span>
                        <a href={product.url} target="_blank" rel="sponsored noopener noreferrer" className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">
                            Check Offer
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
