
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { runProgrammaticExpansion } from '@/services/programmaticService'

/**
 * Admin API: Trigger Programmatic SEO Expansion
 * This executes the full generation logic for 10 articles per category.
 */
export async function POST() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const results = await runProgrammaticExpansion()

        return NextResponse.json({
            status: 'success',
            ...results
        })
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message
        }, { status: 500 })
    }
}
