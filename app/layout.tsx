import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vytrixe — Premium AI & Tech News",
  description: "Global intelligence on AI, technology, and the future of innovation.",
  metadataBase: new URL('https://vytrixe.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-glass-border py-12 mt-20">
          <div className="container text-center">
            <p className="text-muted text-sm tracking-widest font-bold">
              © 2026 VYTRIXE. PART OF THE GLOBAL TECH NETWORK.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
