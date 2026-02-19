import { AdPlaceholder } from "./AdPlaceholder";

const SLOT_MAPPING: Record<string, string> = {
    'article_top': 'news-top-leaderboard',
    'article_mid': 'news-mid-content',
    'article_sidebar': 'news-sidebar-sticky'
};

export default function AdBlock({ position }: { position: string }) {
    const slotId = SLOT_MAPPING[position] || 'default-slot';

    return (
        <div className="my-8 w-full">
            <AdPlaceholder
                slot={slotId}
                label={`Advertisement • ${position.replace('_', ' ').toUpperCase()}`}
                className="h-32 md:h-64" // Taller for better visibility
            />
        </div>
    );
}
