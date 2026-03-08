import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

/**
 * Supabase Admin Client
 * Uses SERVICE_ROLE_KEY to bypass Row Level Security (RLS).
 * MUST ONLY BE USED ON THE SERVER.
 */
export function createAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
        console.error("Missing Supabase Admin environment variables.")
        throw new Error("Supabase Admin Client initialization failed.")
    }

    return createClient<Database>(url, key, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}
