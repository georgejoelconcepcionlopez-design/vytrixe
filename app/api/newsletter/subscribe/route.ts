
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Database } from '@/types/database.types'

export async function POST(request: Request) {
    try {
        const body = await request.json() as { email: string; source?: string }
        const { email, source } = body

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
        }

        const supabase = await createClient<Database>()

        const subscriberData: Database['public']['Tables']['subscribers']['Insert'] = {
            email,
            source: source || 'unknown'
        }

        const { error } = await (supabase.from('subscribers' as never) as unknown as {
            insert: (data: Database['public']['Tables']['subscribers']['Insert'][]) => Promise<{ error: any }>
        }).insert([subscriberData])

        if (error) {
            // Handle duplicate email gracefully
            if (error.code === '23505') {
                return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
            }
            throw error
        }

        return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 })

    } catch (error) {
        console.error('Subscription error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
