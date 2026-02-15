'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ShieldCheck, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: false,
        marketing: false,
    });
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        // Check local storage for existing consent
        const savedConsent = localStorage.getItem('vytrixe_cookie_consent');
        if (!savedConsent) {
            setIsVisible(true);
        } else {
            // If consent exists, apply it (e.g., initialize analytics here if needed)
            const parsedConsent = JSON.parse(savedConsent);
            setPreferences(parsedConsent);
            if (parsedConsent.analytics) {
                // Initialize GA or other analytics here
                console.log('Analytics initialized (Consented)');
            }
        }
    }, []);

    const handleAcceptAll = () => {
        const allOn = { essential: true, analytics: true, marketing: true };
        saveConsent(allOn);
    };

    const handleRejectNonEssential = () => {
        const essentialsOnly = { essential: true, analytics: false, marketing: false };
        saveConsent(essentialsOnly);
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };

    const saveConsent = (settings: typeof preferences) => {
        localStorage.setItem('vytrixe_cookie_consent', JSON.stringify(settings));
        setPreferences(settings);
        setIsVisible(false);

        // Apply settings
        if (settings.analytics) {
            console.log('Analytics initialized (New Consent)');
        } else {
            console.log('Analytics blocked (New Consent)');
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 font-sans animate-in slide-in-from-bottom duration-500">
            <div className="max-w-5xl mx-auto bg-[#0a0f1e]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start justify-between">

                    {/* Text Content */}
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                <Cookie className="h-4 w-4 text-cyan-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Privacy & Intelligence</h3>
                        </div>

                        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                            We use cookies to enhance your intelligence feed, analyze high-velocity traffic, and secure your session.
                            Vytrixe respects your privacy and adheres to strict data protection standards.
                            Read our <Link href="/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</Link> and <Link href="/cookie-policy" className="text-cyan-400 hover:underline">Cookie Policy</Link>.
                        </p>

                        {!showDetails && (
                            <button
                                onClick={() => setShowDetails(true)}
                                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-white transition-colors flex items-center gap-2 mt-4"
                            >
                                <ShieldCheck className="h-3 w-3" /> Manage Preferences
                            </button>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto min-w-[300px]">
                        {!showDetails ? (
                            <>
                                <Button
                                    onClick={handleAcceptAll}
                                    className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold uppercase tracking-widest text-xs h-10 w-full sm:w-auto"
                                >
                                    Accept Intelligence
                                </Button>
                                <Button
                                    onClick={handleRejectNonEssential}
                                    variant="outline"
                                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-xs h-10 w-full sm:w-auto"
                                >
                                    Essential Only
                                </Button>
                            </>
                        ) : (
                            <div className="w-full space-y-4 bg-black/20 p-4 rounded-lg border border-white/5">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">Essential</span>
                                        </div>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Always On</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-2 w-2 rounded-full transition-colors ${preferences.analytics ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-700'}`}></div>
                                            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Analytics</span>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={preferences.analytics}
                                            onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                            className="accent-cyan-500 h-4 w-4 bg-white/5 border-white/20 rounded"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-2 w-2 rounded-full transition-colors ${preferences.marketing ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-slate-700'}`}></div>
                                            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Marketing</span>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={preferences.marketing}
                                            onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                            className="accent-purple-500 h-4 w-4 bg-white/5 border-white/20 rounded"
                                        />
                                    </div>
                                </div>
                                <div className="pt-2 flex gap-2">
                                    <Button
                                        onClick={handleSavePreferences}
                                        className="bg-white/10 text-white hover:bg-white/20 font-bold uppercase tracking-widest text-[10px] h-8 flex-1"
                                    >
                                        Save Preferences
                                    </Button>
                                    <Button
                                        onClick={handleAcceptAll}
                                        className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold uppercase tracking-widest text-[10px] h-8 flex-1"
                                    >
                                        Accept All
                                    </Button>
                                    <button onClick={() => setShowDetails(false)} className="px-2 text-slate-500 hover:text-white">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
