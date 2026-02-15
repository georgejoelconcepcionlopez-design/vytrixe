
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Admin API: Fetch Expansion Audit Logs
 */
export async function GET() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: logs, error } = await supabase
            .from('expansion_log')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20)

        if (error) throw error

        return NextResponse.json({
            status: 'success',
            logs
        })
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message
        }, { status: 500 })
    }
}
