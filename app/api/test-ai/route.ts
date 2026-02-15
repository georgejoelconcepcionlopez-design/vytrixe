
import { NextResponse } from 'next/server';
import { generateArticleFromSource } from '@/services/aiGenerationService';

export async function GET() {
    try {
        const id = await generateArticleFromSource({
            topic: "Quantum Computing Breakthrough",
            rawText: "Scientists have achieved stable qubits at room temperature...",
            facts: ["Stable at 25C", "Uses carbon nanotubes"],
            url: "https://example.com/science"
        });

        if (!id) {
            return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            articleId: id,
            message: "Check vytrixe_articles table for new record"
        });

    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
