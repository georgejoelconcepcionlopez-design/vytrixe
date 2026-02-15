
"use client"

import { useEffect, useRef } from "react"

interface AdBannerProps {
    dataAdSlot: string
    dataAdFormat?: "auto" | "fluid" | "rectangle"
    dataFullWidthResponsive?: boolean
    className?: string
}

export function AdBanner({
    dataAdSlot,
    dataAdFormat = "auto",
    dataFullWidthResponsive = true,
    className = "",
}: AdBannerProps) {
    const adRef = useRef<HTMLDivElement>(null)
    const isDev = process.env.NODE_ENV !== "production"

    useEffect(() => {
        if (isDev) return

        try {
            // @ts-expect-error AdSense script injects this
            (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (err) {
            console.error("AdSense error:", err)
        }
    }, [isDev])

    if (isDev) {
        return (
            <div
                className={`bg-muted/50 border border-dashed border-muted-foreground/20 flex items-center justify-center text-xs text-muted-foreground uppercase tracking-widest p-4 ${className}`}
                style={{ minHeight: "100px" }}
            >
                Ad Space ({dataAdFormat})
                <br />
                Slot: {dataAdSlot}
            </div>
        )
    }

    return (
        <div className={className} ref={adRef}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXX" // Replace with actual Client ID later
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
            />
        </div>
    )
}
