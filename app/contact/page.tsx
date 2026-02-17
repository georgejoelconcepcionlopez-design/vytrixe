
import { Metadata } from 'next'
import { Mail, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
    title: "Contact Vytrixe | Intelligence Desk",
    description: "Get in touch with the Vytrixe Intelligence Desk for inquiries, partnership opportunities, or tips.",
}

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans py-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Intelligence Desk</h1>
                    <p className="text-muted-foreground">
                        For strategic inquiries, press access, or tips, use the secure channels below.
                    </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Name</label>
                                <input type="text" className="w-full bg-background border border-border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Jane Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Email (Work)</label>
                                <input type="email" className="w-full bg-background border border-border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none" placeholder="jane@institution.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Subject</label>
                            <select className="w-full bg-background border border-border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none">
                                <option>General Inquiry</option>
                                <option>Press / Media</option>
                                <option>Advertising / Strategic Partnership</option>
                                <option>Report a Correction</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Message</label>
                            <textarea className="w-full bg-background border border-border rounded-md px-4 py-2 text-sm h-32 focus:ring-2 focus:ring-primary/50 outline-none resize-none" placeholder="Briefly describe your inquiry..."></textarea>
                        </div>

                        <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-md hover:opacity-90 transition-opacity">
                            Transmit Message
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" /> intel@vytrixe.com
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" /> @VytrixeLab
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
