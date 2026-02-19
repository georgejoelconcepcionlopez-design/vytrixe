
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { TrendingTicker } from "@/components/TrendingTicker";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { GlobalFooter } from "@/components/GlobalFooter";
import { CookieConsent } from "@/components/CookieConsent";
import { Navbar } from "@/components/Navbar";
import Script from "next/script";

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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://vytrixe.com'),
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // GA rebuild trigger

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground selection:bg-slate-200 selection:text-slate-900`}
      >
        <TrendingTicker />
        <Navbar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Vytrixe",
              "url": "https://vytrixe.com",
              "logo": "https://vytrixe.com/logo.png", // Assuming logo exists or using placeholder
              "sameAs": []
            })
          }}
        />
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
