'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-[#02040A] text-white">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
            <p className="text-slate-400 mb-6 max-w-md">
                We encountered an error while loading the admin dashboard.
                This might be due to a network issue or missing data.
            </p>
            <div className="flex gap-4">
                <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="border-white/10 hover:bg-white/5"
                >
                    Reload Page
                </Button>
                <Button
                    onClick={() => reset()}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                >
                    Try Again
                </Button>
            </div>
            {process.env.NODE_ENV === 'development' && (
                <pre className="mt-8 p-4 bg-black/50 rounded text-left text-xs font-mono text-red-400 overflow-auto max-w-2xl w-full border border-red-500/20">
                    {error.message}
                    {error.stack}
                </pre>
            )}
        </div>
    )
}
