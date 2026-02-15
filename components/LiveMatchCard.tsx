
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LiveMatch {
    id: string
    league: string
    home_team: string
    away_team: string
    home_score: number | null
    away_score: number | null
    status: string
    match_time: string
    is_live: boolean | null
}

export function LiveMatchCard({ match }: { match: LiveMatch }) {
    return (
        <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground uppercase font-bold">{match.league}</span>
                    {match.is_live && (
                        <Badge variant="destructive" className="animate-pulse text-[10px] px-1.5 py-0">LIVE</Badge>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1 w-1/3">
                        <span className="font-semibold text-sm truncate">{match.home_team}</span>
                    </div>
                    <div className="flex flex-col items-center w-1/3 px-2">
                        <span className="text-2xl font-bold font-mono tracking-widest">
                            {match.home_score} - {match.away_score}
                        </span>
                        <span className="text-[10px] text-green-400 mt-1">{match.status}</span>
                    </div>
                    <div className="flex flex-col gap-1 w-1/3 items-end">
                        <span className="font-semibold text-sm truncate">{match.away_team}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
