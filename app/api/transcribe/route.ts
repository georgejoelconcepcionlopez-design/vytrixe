import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { checkTranscriptionLimits, PLANS } from "@/lib/services/billing"

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // 1. Check Limits
        const limitCheck = await checkTranscriptionLimits(user.id)
        if (!limitCheck.allowed) {
            return NextResponse.json(
                { error: limitCheck.error, upgrade: true },
                { status: 403 }
            )
        }

        // 2. Parse Request (Mocking file handling for structure)
        // const formData = await req.formData()
        // const file = formData.get('file') as File

        // Mock duration check (in real app, get from file metadata)
        const mockDurationMinutes = 4 // Example: would come from file

        if (mockDurationMinutes > limitCheck.plan!.maxDurationMinutes) {
            return NextResponse.json({
                error: `File too large. Free plan limit is ${limitCheck.plan!.maxDurationMinutes} minutes.`
            }, { status: 400 })
        }

        // 3. Perform Transcription (Mock)
        const mockedTranscription = "This is a simulated transcription result for the requested file..."

        // 4. Save History (if PRO or just tracking usage for everyone as per schema?)
        // User requirement: FREE "No history storage". 
        // BUT we need to track usage count for "2 per day".
        // So we MUST insert a record, but maybe we don't return it in "History" API for free users?
        // OR we delete the content for free users immediately?
        // Let's store it for usage tracking, but maybe mark as 'not_visible' or just filter in GET.
        // For now, we allow insertion to track count.

        // @ts-ignore - transcriptions table
        await supabase.from('transcriptions' as any).insert({
            user_id: user.id,
            filename: "audio_file.mp3", // mock
            duration_seconds: mockDurationMinutes * 60,
            content: limitCheck.plan!.history ? mockedTranscription : null, // Don't save content if no history?
            // Actually, to count daily usage, we need a record. 
            // User said "No history storage" for Free.
            // We can insert with null content, or just use the existence of the row for counting.
        })

        return NextResponse.json({
            text: mockedTranscription,
            remaining: limitCheck.plan!.transcriptionsPerDay - ((limitCheck.usage || 0) + 1)
        })

    } catch (error) {
        console.error("Transcription error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
