"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mic, Upload, FileAudio, Copy, Check, AlertCircle, Loader2, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TranscribePage() {
    const [isPro, setIsPro] = useState(false)
    const [loadingPlan, setLoadingPlan] = useState(true)

    // File State
    const [file, setFile] = useState<File | null>(null)
    const [duration, setDuration] = useState(0)
    const [error, setError] = useState<string | null>(null)

    // Worker State
    const worker = useRef<Worker | null>(null)
    const [modelLoading, setModelLoading] = useState(false)
    const [modelProgress, setModelProgress] = useState(0)
    const [isTranscribing, setIsTranscribing] = useState(false)
    const [result, setResult] = useState<any>(null)

    // Check Plan on Mount
    useEffect(() => {
        const checkPlan = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // @ts-ignore
                const { data } = await supabase
                    .from('users' as any)
                    .select('role')
                    .eq('id', user.id)
                    .single()

                const userData = data as { role?: string } | null
                if (userData && (userData.role === 'pro' || userData.role === 'admin')) {
                    setIsPro(true)
                }
            }
            setLoadingPlan(false)
        }
        checkPlan()

        // Init Worker
        worker.current = new Worker('/worker.js', { type: 'module' })

        worker.current.onmessage = (event) => {
            const { type, data } = event.data

            if (type === 'download') {
                if (data.status === 'progress') {
                    setModelLoading(true)
                    setModelProgress(data.progress)
                } else if (data.status === 'done') {
                    setModelLoading(false)
                }
            } else if (type === 'complete') {
                setIsTranscribing(false)
                setResult(data)
            } else if (type === 'error') {
                setIsTranscribing(false)
                setError(data)
            }
        }

        return () => worker.current?.terminate()
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (!selected) return

        setError(null)
        setResult(null)

        // Metadata Check
        const url = URL.createObjectURL(selected)
        const audio = new Audio(url)

        audio.onloadedmetadata = () => {
            const seconds = audio.duration
            setDuration(seconds)

            const limit = isPro ? 30 * 60 : 5 * 60 // 30m vs 5m

            if (seconds > limit) {
                setError(`File too long. ${isPro ? 'Pro limit is 30 minutes.' : 'Free limit is 5 minutes.'} ${!isPro ? 'Upgrade to Pro for longer files.' : ''}`)
                setFile(null)
            } else {
                setFile(selected)
            }
            URL.revokeObjectURL(url)
        }
    }

    const startTranscription = () => {
        if (!file || !worker.current) return

        setIsTranscribing(true)
        setError(null)

        const reader = new FileReader()
        reader.onload = (e) => {
            // AudioContext decoding handled by transformers usually, 
            // but sending raw buffer or blob URL is safer for worker.
            // Actually, transformers.js pipeline expects AudioBuffer or URL.
            // Let's send the Blob URL to the worker? 
            // Or better, let's decode audio in main thread and send buffer?
            // Transformers.js 'automatic-speech-recognition' can accept a URL.

            // WEBM/WAV audio processing can be tricky in workers if codecs missing.
            // We will try passing the blob URL directly.
            const audioCtx = new AudioContext()
            const fileReader = new FileReader()
            fileReader.onload = async (ev) => {
                const arrayBuffer = ev.target?.result as ArrayBuffer
                const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)

                // Convert to mono float32 for Whisper
                const offlineCtx = new OfflineAudioContext(1, audioBuffer.length, audioBuffer.sampleRate)
                const source = offlineCtx.createBufferSource()
                source.buffer = audioBuffer
                source.connect(offlineCtx.destination)
                source.start()
                const renderedBuffer = await offlineCtx.startRendering()
                const audioData = renderedBuffer.getChannelData(0)

                worker.current?.postMessage({
                    type: 'transcribe',
                    audio: audioData,
                })
            }
            fileReader.readAsArrayBuffer(file)
        }
        reader.readAsDataURL(file) // Just trigger one of them
    }

    const [copied, setCopied] = useState(false)
    const copyToClipboard = () => {
        if (result?.text) {
            navigator.clipboard.writeText(result.text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        AI Transcription <span className="text-blue-600">Pro</span>
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Private, unlimited, in-browser transcription powered by Whisper.
                    </p>
                </div>

                <div className="grid gap-8">
                    {/* Upload Card */}
                    <Card className="p-8 border-slate-200 shadow-sm bg-white">
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:bg-slate-50 transition-colors relative">
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={isTranscribing}
                            />

                            {file ? (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <FileAudio className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">{file.name}</p>
                                        <p className="text-sm text-slate-500">
                                            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')} • {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    {!isTranscribing && (
                                        <Button className="bg-[#0f172a] text-white rounded-full px-8 mt-4">
                                            Change File
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 text-lg">Click to Upload Audio</p>
                                        <p className="text-sm text-slate-500 mt-1">MP3, WAV, M4A up to {isPro ? '30' : '5'} minutes</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {error && (
                            <Alert variant="destructive" className="mt-6">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {!error && !isPro && file && (
                            <Alert className="mt-6 bg-blue-50 text-blue-800 border-blue-200">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Free Plan Limited</AlertTitle>
                                <AlertDescription>You are limited to 5 minute files. Upgrade to Pro for 30 minutes.</AlertDescription>
                            </Alert>
                        )}

                        {file && !isTranscribing && !result && (
                            <div className="mt-8 flex justify-center">
                                <Button size="lg" onClick={startTranscription} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 h-12 text-lg shadow-lg shadow-blue-600/20">
                                    <Mic className="w-5 h-5 mr-2" /> Start Transcription
                                </Button>
                            </div>
                        )}

                        {(isTranscribing || modelLoading) && (
                            <div className="mt-8 space-y-4">
                                <div className="flex justify-between text-sm font-medium text-slate-700">
                                    <span>{modelLoading ? "Loading AI Model..." : "Transcribing..."}</span>
                                    <span>{modelLoading ? Math.round(modelProgress) : "Processing"}%</span>
                                </div>
                                <Progress value={modelLoading ? modelProgress : undefined} className="h-2" />
                            </div>
                        )}
                    </Card>

                    {/* Result Card */}
                    {result && (
                        <Card className="p-8 border-slate-200 shadow-lg bg-white animate-in slide-in-from-bottom-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-slate-900">Transcription Result</h3>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                        {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                                        {copied ? "Copied" : "Copy Text"}
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                                {result.text}
                            </div>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    )
}
