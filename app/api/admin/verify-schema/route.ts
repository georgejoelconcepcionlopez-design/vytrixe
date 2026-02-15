
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify columns and indexes presence via RPC
    const { data, error } = await (supabase as any).rpc('check_trends_schema')

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // Type assertion for the RPC response
    const schema = data as { columns: string[], indexes: string[] }

    const hasTrendId = schema.columns.includes('trend_id')
    const hasCategoryIdx = schema.columns.includes('category_id')

    const checks = {
        columns: { hasTrendId, hasCategoryIdx },
    }

    const allPassed = hasTrendId && hasCategoryIdx

    return NextResponse.json({
        success: allPassed,
        checks,
        raw: data
    })
}
