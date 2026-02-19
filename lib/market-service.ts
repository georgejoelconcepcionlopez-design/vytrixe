
import { unstable_noStore as noStore } from 'next/cache';

// Types
export interface MarketData {
    symbol: string;
    price: number;
    change: number;
    percentChange: number;
    high: number;
    low: number;
    lastUpdated: string;
}

export interface MarketHistory {
    symbol: string;
    candles: { date: string; price: number }[];
    trend: 'bullish' | 'bearish' | 'neutral';
    bias: 'Positive' | 'Negative' | 'Neutral'; // Institutional Bias
    average: number;
    volatility: number; // Standard Deviation
}

// Configuration
const API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

// Mapped Symbols (Internal ID -> Finnhub Symbol)
const SYMBOL_MAP: Record<string, string> = {
    'SPX': '^GSPC',    // S&P 500
    'NVDA': 'NVDA',    // NVIDIA
    'BTC': 'BINANCE:BTCUSDT', // Bitcoin
    'XAU': 'OANDA:XAU_USD',   // Gold
    'MSFT': 'MSFT',
    'TSM': 'TSM',
    'VRT': 'VRT',
    'CCJ': 'CCJ'
};

// Fallback Data (Mock)
const MOCK_DATA: Record<string, MarketData> = {
    'SPX': { symbol: 'SPX', price: 5432.10, change: 12.50, percentChange: 0.23, high: 5450.00, low: 5410.20, lastUpdated: new Date().toISOString() },
    'NVDA': { symbol: 'NVDA', price: 142.50, change: 3.20, percentChange: 2.15, high: 145.00, low: 139.50, lastUpdated: new Date().toISOString() },
    'BTC': { symbol: 'BTC', price: 98500.00, change: 1540.00, percentChange: 1.55, high: 99200.00, low: 97500.00, lastUpdated: new Date().toISOString() },
    'XAU': { symbol: 'XAU', price: 2450.50, change: 15.00, percentChange: 0.64, high: 2465.10, low: 2440.00, lastUpdated: new Date().toISOString() },
    'MSFT': { symbol: 'MSFT', price: 425.10, change: 2.10, percentChange: 0.50, high: 428.00, low: 422.50, lastUpdated: new Date().toISOString() },
    'TSM': { symbol: 'TSM', price: 185.10, change: 3.20, percentChange: 1.76, high: 188.00, low: 182.00, lastUpdated: new Date().toISOString() },
    'VRT': { symbol: 'VRT', price: 98.20, change: 1.40, percentChange: 1.45, high: 99.50, low: 96.00, lastUpdated: new Date().toISOString() },
    'CCJ': { symbol: 'CCJ', price: 54.05, change: 2.15, percentChange: 4.14, high: 55.20, low: 53.10, lastUpdated: new Date().toISOString() }
};

/**
 * Fetches a single quote from Finnhub
 */
async function fetchQuote(symbol: string): Promise<MarketData | null> {
    if (!API_KEY) return null;

    try {
        const finnhubSymbol = SYMBOL_MAP[symbol] || symbol;
        const res = await fetch(`${BASE_URL}/quote?symbol=${finnhubSymbol}&token=${API_KEY}`, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!res.ok) throw new Error(`Status: ${res.status}`);

        const data = await res.json();

        // Finnhub response format: { c: Current, d: Change, dp: %, h: High, l: Low, ... }
        if (data.c === 0 && data.d === null) return null;

        return {
            symbol: symbol,
            price: data.c,
            change: data.d,
            percentChange: data.dp,
            high: data.h,
            low: data.l,
            lastUpdated: new Date().toISOString()
        };

    } catch (error) {
        console.warn(`[MarketService] Failed to fetch ${symbol}:`, error);
        return null; // Trigger fallback
    }
}

/**
 * Fetches 7-day history (candles)
 */
export async function fetchMarketHistory(symbol: string): Promise<MarketHistory | null> {
    if (!API_KEY) return null;

    try {
        const finnhubSymbol = SYMBOL_MAP[symbol] || symbol;
        const to = Math.floor(Date.now() / 1000);
        const from = to - (7 * 24 * 60 * 60);

        const res = await fetch(`${BASE_URL}/stock/candle?symbol=${finnhubSymbol}&resolution=D&from=${from}&to=${to}&token=${API_KEY}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) throw new Error(`Status: ${res.status}`);

        const data = await res.json();

        if (data.s !== 'ok' || !data.c) return null;

        const candles = data.c.map((price: number, i: number) => ({
            date: new Date(data.t[i] * 1000).toISOString().split('T')[0],
            price
        }));

        // Calculate Average (SMA)
        const prices = candles.map((c: { price: number }) => c.price);
        const sum = prices.reduce((a: number, b: number) => a + b, 0);
        const avg = sum / prices.length;
        const lastPrice = prices[prices.length - 1];

        // Calculate Volatility (Standard Deviation)
        const variance = prices.reduce((sq: number, n: number) => sq + Math.pow(n - avg, 2), 0) / prices.length;
        const stdDev = Math.sqrt(variance);
        const volatility = (stdDev / avg) * 100; // Percentage volatility relative to price

        // Determine Bias
        let trend: 'bullish' | 'bearish' | 'neutral' = 'neutral';
        let bias: 'Positive' | 'Negative' | 'Neutral' = 'Neutral';

        if (lastPrice > avg * 1.01) {
            trend = 'bullish';
            bias = 'Positive';
        } else if (lastPrice < avg * 0.99) {
            trend = 'bearish';
            bias = 'Negative';
        }

        return {
            symbol,
            candles,
            trend,
            bias,
            average: avg,
            volatility
        };

    } catch (error) {
        console.warn(`[MarketService] Failed to fetch history for ${symbol}:`, error);
        return generateMockHistory(symbol);
    }
}

function generateMockHistory(symbol: string): MarketHistory {
    const basePrice = MOCK_DATA[symbol]?.price || 100;
    const candles = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const price = basePrice * (1 + (Math.random() - 0.5) * 0.05);
        return {
            date: date.toISOString().split('T')[0],
            price: Number(price.toFixed(2))
        };
    });

    return {
        symbol,
        candles,
        trend: 'bullish',
        bias: 'Positive',
        average: basePrice,
        volatility: 1.5 // Mock vol
    };
}


export async function getMarketData(): Promise<MarketData[]> {
    noStore();

    const targets = Object.keys(SYMBOL_MAP);

    const promises = targets.map(async (sym) => {
        const live = await fetchQuote(sym);
        return live || MOCK_DATA[sym];
    });

    try {
        const data = await Promise.all(promises);
        return data;
    } catch (error) {
        console.error("[MarketService] Critical Failure, using all mocks", error);
        return Object.values(MOCK_DATA);
    }
}
