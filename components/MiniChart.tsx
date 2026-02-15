
import { useMemo } from 'react';

interface MiniChartProps {
    data: number[];
    color?: string;
    width?: number;
    height?: number;
    className?: string;
}

export function MiniChart({ data, color = '#10b981', width = 100, height = 40, className }: MiniChartProps) {
    const path = useMemo(() => {
        if (!data || data.length === 0) return '';

        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;
        const step = width / (data.length - 1);

        return data.map((val, i) => {
            const x = i * step;
            const y = height - ((val - min) / range) * height;
            return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
        }).join(' ');
    }, [data, width, height]);

    return (
        <svg width={width} height={height} className={className} overflow="visible">
            <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Gradient fill optional */}
            <path
                d={`${path} L ${width},${height} L 0,${height} Z`}
                fill={color}
                fillOpacity="0.1"
                stroke="none"
            />
        </svg>
    );
}
