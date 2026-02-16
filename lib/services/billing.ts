import { createClient } from "@/lib/supabase/server"

export const PLANS = {
    FREE: {
        name: 'free',
        transcriptionsPerDay: 2,
        maxDurationMinutes: 5,
        canExport: false,
        history: false
    },
    PRO: {
        name: 'pro',
        transcriptionsPerDay: Infinity,
        maxDurationMinutes: 60,
        canExport: true,
        history: true
    }
}

export type UserPlan = typeof PLANS.FREE | typeof PLANS.PRO

export async function checkUserPlan(userId: string): Promise<UserPlan> {
    const supabase = await createClient()
    // @ts-ignore
    const { data } = await supabase
        .from('users' as any)
        .select('role')
        .eq('id', userId)
        .single()

    const user = data as { role?: string } | null
    const role = user?.role || 'free'
    return role === 'pro' || role === 'admin' ? PLANS.PRO : PLANS.FREE
}

export async function checkTranscriptionLimits(userId: string) {
    const plan = await checkUserPlan(userId)

    if (plan.transcriptionsPerDay === Infinity) {
        return { allowed: true, plan }
    }

    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]

    // @ts-ignore
    const { count } = await supabase
        .from('transcriptions' as any)
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lte('created_at', `${today}T23:59:59.999Z`)

    const usage = count || 0

    if (usage >= plan.transcriptionsPerDay) {
        return {
            allowed: false,
            error: 'Daily limit reached. Upgrade to Pro for unlimited transcriptions.',
            plan
        }
    }

    return { allowed: true, plan, usage }
}
