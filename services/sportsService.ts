
// import { createClient } from '@/lib/supabase/client'
// import { Database } from '@/types/database.types'

// Mock data for fallback
const MOCK_SPORTS_NEWS = {
    us: [
        { id: 's1', title: "Super Bowl LIX: Chiefs win again", source: "ESPN", url: "https://espn.com", image_url: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80&w=1000", popularity_score: 99 },
        { id: 's2', title: "NBA: Lakers secure playoff spot", source: "Bleacher Report", url: "https://bleacherreport.com", image_url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1000", popularity_score: 95 },
        { id: 's3', title: "MLB Opening Day set for March", source: "MLB.com", url: "https://mlb.com", image_url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=1000", popularity_score: 88 },
    ],
    es: [
        { id: 's4', title: "Real Madrid ficha a nueva estrella", source: "Marca", url: "https://marca.com", image_url: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80&w=1000", popularity_score: 98 },
        { id: 's5', title: "Nadal anuncia su retiro", source: "AS", url: "https://as.com", image_url: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=1000", popularity_score: 96 },
    ],
    mx: [
        { id: 's6', title: "Checo Pérez gana en Mónaco", source: "Fox Sports", url: "https://foxsports.com.mx", image_url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1000", popularity_score: 97 },
        { id: 's7', title: "América campeón de la Liga MX", source: "Récord", url: "https://record.com.mx", image_url: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=1000", popularity_score: 94 },
    ],
    do: [
        { id: 's8', title: "Lidom: Tigres del Licey a la final", source: "Lidom.com", url: "https://lidom.com", image_url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000", popularity_score: 95 },
    ]
}

export async function fetchSportsNews(country: string) {
    // In a real scenario, we would cache this in Supabase and return from DB first.
    // For this base implementation, we will simulate the fetch-and-store process.

    // 1. Try to get from external API (Mocked here)
    const newsItems = MOCK_SPORTS_NEWS[country as keyof typeof MOCK_SPORTS_NEWS] || []

    // 2. Return data formatted for the UI
    return newsItems.map(item => ({
        ...item,
        country_code: country,
        category: 'sports',
        description: 'Latest breaking sports news coverage.',
        published_at: new Date().toISOString()
    }))
}


export async function saveSportsNews(newsItems: unknown[]) {
    // Logic to save to Supabase would go here
    // const supabase = createClient()
    // await supabase.from('sports_news').upsert(newsItems)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log(`Saved ${(newsItems as any[]).length} sports items`)
}

// Mock Data for Live Matches
const MOCK_MATCHES = {
    us: [
        { id: 'm1', league: 'NBA', home_team: 'Lakers', away_team: 'Warriors', home_score: 102, away_score: 98, status: 'LIVE', match_time: new Date().toISOString(), is_live: true },
        { id: 'm2', league: 'NHL', home_team: 'Bruins', away_team: 'Rangers', home_score: 2, away_score: 2, status: 'LIVE', match_time: new Date().toISOString(), is_live: true },
    ],
    es: [
        { id: 'm3', league: 'La Liga', home_team: 'Barcelona', away_team: 'Sevilla', home_score: 1, away_score: 0, status: 'LIVE', match_time: new Date().toISOString(), is_live: true },
    ],
    mx: [
        { id: 'm4', league: 'Liga MX', home_team: 'Cruz Azul', away_team: 'Pumas', home_score: 0, away_score: 0, status: 'LIVE', match_time: new Date().toISOString(), is_live: true },
    ]
} as const

// Mock Data for Standings
const MOCK_TEAMS_STATS = {
    us: [
        { id: 't1', team_name: 'Chiefs', league: 'NFL', wins: 14, losses: 3, draws: 0, points: 0, popularity_score: 99 },
        { id: 't2', team_name: 'Lakers', league: 'NBA', wins: 30, losses: 20, draws: 0, points: 0, popularity_score: 95 },
        { id: 't3', team_name: 'Yankees', league: 'MLB', wins: 0, losses: 0, draws: 0, points: 0, popularity_score: 92 },
    ],
    es: [
        { id: 't4', team_name: 'Real Madrid', league: 'La Liga', wins: 20, losses: 2, draws: 5, points: 65, popularity_score: 98 },
        { id: 't5', team_name: 'Barcelona', league: 'La Liga', wins: 18, losses: 4, draws: 3, points: 57, popularity_score: 96 },
    ],
    mx: [
        { id: 't6', team_name: 'América', league: 'Liga MX', wins: 10, losses: 2, draws: 5, points: 35, popularity_score: 97 },
        { id: 't7', team_name: 'Chivas', league: 'Liga MX', wins: 8, losses: 4, draws: 5, points: 29, popularity_score: 94 },
    ]
} as const

export async function fetchLiveMatches(country: string) {
    const matches = MOCK_MATCHES[country as keyof typeof MOCK_MATCHES] || []
    return matches.map(m => ({ ...m, country_code: country }))
}

export async function fetchTeamStats(country: string) {
    const stats = MOCK_TEAMS_STATS[country as keyof typeof MOCK_TEAMS_STATS] || []
    return stats.map(s => ({ ...s, country_code: country }))
}
