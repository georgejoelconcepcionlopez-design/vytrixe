
"use client"

import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts"

interface SparklineProps {
    data: { date: string; price: number }[]
    color?: string
    height?: number
}

export function SparklineChart({ data, color = "#10b981", height = 60 }: SparklineProps) {
    if (!data || data.length === 0) return null;

    // Determine color based on trend if not provided (start vs end)
    const isUp = data[data.length - 1].price >= data[0].price;
    const strokeColor = isUp ? "#10b981" : "#ef4444"; // Green vs Red

    return (
        <div style={{ height }} className="w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <YAxis domain={['auto', 'auto']} hide />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke={strokeColor}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false} // Disable animation for performance
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
