import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Database } from '@/types/database.types'

export async function GET() {
    try {
        const supabase = await createClient<Database>()

        // 1. Fetch current trends
        const { data: trends } = await supabase
            .from('trends')
            .select('id, country_code, trend_id')

        if (!trends) throw new Error('No trends found')

        // 2. Prepare updates (Simple touch to created_at or just verify existence)
        const updates = trends.map(trend => ({
            id: trend.id,
            country_code: trend.country_code,
            trend_id: trend.trend_id,
            created_at: new Date().toISOString()
        }))

        // 3. Bulk upsert (using id to match)
        const { error } = await supabase
            .from('trends')
            .upsert(updates)

        if (error) throw error

        return NextResponse.json({
            status: 'success',
            refreshed_at: new Date().toISOString(),
            items_updated: updates.length
        })
    } catch (error: any) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }
}
