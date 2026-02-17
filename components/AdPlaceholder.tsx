
"use client"

import { cn } from "@/lib/utils"

interface AdPlaceholderProps {
    slot: string
    format?: 'auto' | 'fluid' | 'rectangle'
    className?: string
    label?: string
}

export function AdPlaceholder({ slot, format = 'auto', className, label = "Advertisement" }: AdPlaceholderProps) {
    // In production, this would be the actual AdSense script
    // For now, it's a non-intrusive placeholder structure ready for injection
    return (
        <div className={cn("w-full bg-secondary/20 border border-border/50 rounded-lg overflow-hidden flex flex-col items-center justify-center text-muted-foreground/40 text-xs font-mono uppercase tracking-widest my-8 min-h-[100px]", className)}>
            <span className="mb-2">{label}</span>
            <div className="w-8 h-0.5 bg-border/50"></div>
            {/* 
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot={slot}
                 data-ad-format={format}
                 data-full-width-responsive="true"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
            */}
        </div>
    )
}
