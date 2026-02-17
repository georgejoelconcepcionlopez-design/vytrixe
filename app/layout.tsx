import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { TrendingTicker } from "@/components/TrendingTicker";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { GlobalFooter } from "@/components/GlobalFooter";
import { CookieConsent } from "@/components/CookieConsent";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vytrixe — AI & Global Market Intelligence Lab",
  description: "Independent intelligence on AI infrastructure, capital flows, and global technological shifts.",
  icons: {
    icon: '/favicon.ico', // Fallback, we will use SVG if possible or generated
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://vytrixe.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground selection:bg-slate-200 selection:text-slate-900`}
      >
        <TrendingTicker />
        <Navbar />
        <JsonLd />
        <main className="min-h-screen flex flex-col bg-background">
          {children}
        </main>
        <CookieConsent />
        <ExitIntentPopup />
        <GlobalFooter />
      </body>
    </html>
  );
}
