import React from 'react';

interface LogoProps {
    className?: string;
    showText?: boolean;
    variant?: 'default' | 'muted' | 'white';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = '', showText = true, variant = 'default', size = 'md' }: LogoProps) {
    // Size maps
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-24 w-24'
    };

    const textSizeClasses = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-4xl',
        xl: 'text-6xl'
    };

    // Color maps
    const symbolColors = {
        default: 'text-cyan-500',
        muted: 'text-slate-500',
        white: 'text-white'
    };

    const textColors = {
        default: 'text-white',
        muted: 'text-slate-500',
        white: 'text-white'
    };

    return (
        <div className={`flex items-center gap-2.5 select-none ${className}`}>
            {/* Symbol: Growth + Data Fusion */}
            <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Background Shape */}
                    <path d="M10 50L50 10L90 50L50 90L10 50Z" className={`${symbolColors[variant]} opacity-20`} fill="currentColor" />

                    {/* Core Line - Data Stream / Growth */}
                    <path d="M30 65L45 50L55 60L70 35" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className={symbolColors[variant]} />

                    {/* Accent Dot */}
                    <circle cx="70" cy="35" r="5" className={symbolColors[variant]} fill="currentColor">
                        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>

            {/* Text: VYTRIXE */}
            {showText && (
                <span className={`font-black tracking-widest uppercase ${textSizeClasses[size]} ${textColors[variant]} leading-none`}>
                    Vytrixe
                </span>
            )}
        </div>
    );
}
