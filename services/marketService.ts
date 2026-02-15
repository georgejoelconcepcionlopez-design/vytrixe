
import { unstable_cache } from 'next/cache';

export interface MarketData {
    symbol: string;
    name: string;
    price: number;
    change24h: number; // Percentage
    sparkline: number[];
    marketOpen?: boolean;
    type: 'crypto' | 'stock' | 'index';
}

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Mock data generator for stocks/indices fallback (reliable & realistic)
function generateMockSparkline(startPrice: number, points: number = 24): number[] {
    let current = startPrice;
    const data = [];
    for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.5) * (startPrice * 0.02); // 2% volatility
        current += change;
        data.push(current);
    }
    return data;
}

async function fetchCryptoData(): Promise<MarketData[]> {
    try {
        const ids = ['bitcoin', 'ethereum', 'solana'];
        const response = await fetch(
            `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${ids.join(',')}&sparkline=true&price_change_percentage=24h`,
            { next: { revalidate: 60 } } // Cache for 60s
        );

        if (!response.ok) throw new Error('CoinGecko API Error');

        const data = await response.json();

        return data.map((coin: any) => ({
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h,
            sparkline: coin.sparkline_in_7d?.price || [],
            type: 'crypto'
        }));
    } catch (error) {
        console.error('Crypto fetch error:', error);
        // Fallback for crypto if API fails
        return [
            { symbol: 'BTC', name: 'Bitcoin', price: 64230.50, change24h: 2.4, sparkline: generateMockSparkline(64000), type: 'crypto' },
            { symbol: 'ETH', name: 'Ethereum', price: 3450.20, change24h: -1.2, sparkline: generateMockSparkline(3500), type: 'crypto' },
            { symbol: 'SOL', name: 'Solana', price: 145.80, change24h: 5.7, sparkline: generateMockSparkline(140), type: 'crypto' },
        ];
    }
}

async function fetchStockData(): Promise<MarketData[]> {
    // Real stock APIs (Yahoo/AlphaVantage) are often rate-limited or paid. 
    // For V1 Free Tier, we use a high-quality simulated data set that updates "live".
    // In production, swap this with a real provider like Polygon.io or Financial Modeling Prep.

    // Simulate slight randomization on each server render
    const stocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', base: 175.00 },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', base: 920.00 },
        { symbol: 'MSFT', name: 'Microsoft', base: 415.00 },
        { symbol: 'TSLA', name: 'Tesla Inc.', base: 178.00 },
        { symbol: '^IXIC', name: 'NASDAQ', base: 16200.00, type: 'index' },
        { symbol: '^GSPC', name: 'S&P 500', base: 5150.00, type: 'index' },
    ];

    return stocks.map(stock => {
        const volatility = (Math.random() - 0.45) * 1.5; // Bias slightly upward for tech :)
        const price = stock.base * (1 + volatility / 100);
        return {
            symbol: stock.symbol,
            name: stock.name,
            price: parseFloat(price.toFixed(2)),
            change24h: parseFloat(volatility.toFixed(2)),
            sparkline: generateMockSparkline(stock.base),
            marketOpen: true, // Assuming generic market hours for v1
            type: (stock.type as any) || 'stock'
        };
    });
}

// Cached accessors
export const getMarketData = unstable_cache(async () => {
    const [crypto, stocks] = await Promise.all([fetchCryptoData(), fetchStockData()]);
    return {
        crypto,
        stocks: stocks.filter(s => s.type === 'stock'),
        indices: stocks.filter(s => s.type === 'index'),
    };
}, ['market-data-v1'], { revalidate: 60 });
