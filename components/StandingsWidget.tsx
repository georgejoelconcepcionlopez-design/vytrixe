
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TeamStats {
    id: string
    team_name: string
    league: string
    wins: number | null
    losses: number | null
    draws: number | null
    points: number | null
}

export function StandingsWidget({ stats, country }: { stats: TeamStats[], country: string }) {
    // Sort by points desc
    const sortedStats = [...stats].sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, 5)

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">League Standings ({country.toUpperCase()})</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Pos</TableHead>
                            <TableHead>Team</TableHead>
                            <TableHead className="text-right">Pts</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedStats.map((team, index) => (
                            <TableRow key={team.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{team.team_name}</TableCell>
                                <TableCell className="text-right font-bold text-primary">{team.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
