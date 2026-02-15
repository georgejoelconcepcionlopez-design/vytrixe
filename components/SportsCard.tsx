
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Calendar } from 'lucide-react'
import Image from 'next/image'

interface SportsNewsItem {
    id?: string
    title: string
    source: string | null
    url: string
    image_url: string | null
    published_at?: string | null
    popularity_score?: number | null
}

export function SportsCard({ news }: { news: SportsNewsItem }) {
    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow border-primary/20">
            <div className="relative h-48 w-full bg-muted">
                {news.image_url ? (
                    <Image
                        src={news.image_url}
                        alt={news.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        No Image
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
                    {news.source}
                </div>
            </div>
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg leading-tight line-clamp-2">{news.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    {news.published_at ? new Date(news.published_at).toLocaleDateString() : 'Just now'}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button variant="secondary" size="sm" className="w-full gap-2" asChild>
                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                        Read Article <ExternalLink className="h-3 w-3" />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
}
