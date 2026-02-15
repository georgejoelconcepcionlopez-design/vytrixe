
"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Link as LinkIcon } from "lucide-react"

interface ShareButtonsProps {
    title: string
    url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
    const handleShare = (platform: 'twitter' | 'facebook' | 'copy') => {
        const text = encodeURIComponent(title)
        const href = encodeURIComponent(url)

        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${href}`, '_blank')
                break
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${href}`, '_blank')
                break
            case 'copy':
                navigator.clipboard.writeText(url)
                // In a real app, show a toast notification here
                alert("Link copied to clipboard!")
                break
        }
    }

    return (
        <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleShare('twitter')}>
                <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                Tweet
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleShare('facebook')}>
                <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                Share
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleShare('copy')}>
                <LinkIcon className="h-4 w-4 mr-2" />
                Copy
            </Button>
        </div>
    )
}
