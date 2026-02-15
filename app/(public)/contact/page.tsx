import { Metadata } from 'next'
import { Mail, MessageSquare, Newspaper } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Contact Us | Vytrixe Intelligence',
    description: 'Get in touch with the Vytrixe Intelligence team for business inquiries, press, or support.',
    alternates: {
        canonical: 'https://vytrixe.com/contact',
    },
}

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#0B0F14] text-slate-300 font-sans pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Contact Us</h1>
                <p className="text-xl text-slate-400 mb-12">
                    We welcome inquiries from partners, press, and our community.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors">
                        <Mail className="h-8 w-8 text-cyan-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">General Inquiries</h3>
                        <p className="text-slate-400 mb-4">
                            For general questions, feedback, or support regarding Vytrixe Intelligence.
                        </p>
                        <a href="mailto:contact@vytrixe.com" className="text-white font-mono hover:text-cyan-400 transition-colors">
                            contact@vytrixe.com
                        </a>
                    </div>

                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors">
                        <Newspaper className="h-8 w-8 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Press & Media</h3>
                        <p className="text-slate-400 mb-4">
                            For media kits, interviews, and officially licensed data usage.
                        </p>
                        <a href="mailto:press@vytrixe.com" className="text-white font-mono hover:text-purple-400 transition-colors">
                            press@vytrixe.com
                        </a>
                    </div>
                </div>

                <div className="bg-[#0F131C] p-8 md:p-12 rounded-xl border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <MessageSquare className="h-6 w-6 text-cyan-400" />
                        Send a Message
                    </h2>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Name</label>
                                <input type="text" id="name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Email</label>
                                <input type="email" id="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="your@email.com" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Subject</label>
                            <input type="text" id="subject" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Inquiry Subject" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Message</label>
                            <textarea id="message" rows={5} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="How can we help?" />
                        </div>
                        <button type="submit" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-wider text-sm transition-colors rounded-lg">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
