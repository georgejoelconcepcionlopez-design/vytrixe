
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const articles = [
    {
        trend_id: 'super-bowl-lx-2026',
        country_code: 'us',
        seo_title: 'Super Bowl LX (2026): The Ultimate Guide to the Biggest Sporting Event in History',
        seo_description: 'Discover everything about Super Bowl LX in 2026. From halftime show rumors to ticket prices and key matchups. The definitive guide to Super Bowl LX.',
        content_html: JSON.stringify({
            introduction: "As February 2026 unfolds, the anticipation for Super Bowl LX has reached a fever pitch. Scheduled to take place at the state-of-the-art Levi's Stadium in Santa Clara, California, this milestone 60th anniversary of the Super Bowl promises to be more than just a football game—it's a global cultural phenomenon. Fans from across the United States and the world are converging on the Bay Area for what analysts predict will be the most-watched television event in history. This year, the NFL has pulled out all the stops to ensure that the diamond anniversary is reflected in every aspect of the production, from the high-tech fan experiences to the most ambitious halftime show ever conceived.",
            sections: [
                {
                    heading: "The Road to Super Bowl LX: Contenders and Underdogs",
                    content: "The 2025-2026 NFL season has been one of the most unpredictable in recent memory. Powerhouse franchises like the Kansas City Chiefs and the San Francisco 49ers have battled through injuries and grueling schedules to remain in the hunt. Meanwhile, rising stars in Detroit and Houston have disrupted the traditional hierarchy, creating a playoff picture that is truly wide open. The parity in the league this year has led to a surge in search interest, as fans flock to TrendNova to track the shifting momentum of their favorite teams. Betting markets are currently leaning towards a rematch of Super Bowl LIV, but as every veteran fan knows, the 'any given Sunday' rule is particularly potent in the postseason."
                },
                {
                    heading: "Levi's Stadium: A Technical Marvel for a Diamond Jubilee",
                    content: "Returning to Santa Clara for Super Bowl LX is a strategic move by the NFL. Levi's Stadium has undergone significant upgrades to accommodate the 60th anniversary. New 8K video displays, enhanced 5G connectivity for every seat, and an expanded 'Super Bowl Experience' outside the venue are just the beginning. The stadium's focus on sustainability—being one of the greenest venues in the league—aligns with the NFL's goals for 2026. For those lucky enough to attend in person, the combination of luxury amenities and raw football intensity will be unparalleled. For the millions watching at home, the broadcast will feature groundbreaking augmented reality (AR) graphics that provide real-time player stats and positional data directly on the field."
                },
                {
                    heading: "The Halftime Show Rumors: Who Will Take the Levi's Stadium Stage?",
                    content: "Perhaps the most debated topic in early February 2026 is the lineup for the Apple Music Super Bowl LX Halftime Show. Speculation has reached a boiling point, with top-tier names like Taylor Swift, Drake, and even a potential Oasis reunion being floated by insiders. Given the 60th anniversary theme, many fans are hoping for a multi-genre tribute to the history of American music. The NFL has kept the details under tight security, but leaks suggest a production budget exceeding $20 million, aimed at creating a 'visual spectacle' that surpasses the legendary 2022 Los Angeles show. The announcement is expected within days, and TrendNova will be the first to break the news as sentiment spikes."
                },
                {
                    heading: "Economic Impact and the 'Super Bowl Surge'",
                    content: "Beyond the gridiron, Super Bowl LX is a massive economic engine. The Bay Area is expected to see an influx of over $600 million in local spending. Hotels in San Jose and San Francisco have been booked for months, with nightly rates reaching record highs. This economic 'Super Bowl Surge' extends to the digital realm, where ad spots for the 2026 broadcast are rumored to cost upwards of $8.5 million for 30 seconds. Brands are pivoting towards interactive campaigns, utilizing QR codes and second-screen experiences to capture the fragmented attention of the modern viewer. This intersection of commerce and entertainment is a hallmark of the 2026 trend landscape."
                }
            ],
            faq: [
                { question: "When is Super Bowl LX?", answer: "Super Bowl LX is scheduled for February 8, 2026." },
                { question: "Where is Super Bowl LX being played?", answer: "The game will be held at Levi's Stadium in Santa Clara, California." },
                { question: "Who is performing at the 2026 halftime show?", answer: "Official announcements are pending, but rumors point to a major multi-artist 60th-anniversary celebration." },
                { question: "How much are tickets for Super Bowl LX?", answer: "On the secondary market, ticket prices are starting at approximately $7,500." }
            ],
            related_links: [
                { title: "Official NFL Super Bowl Portal", url: "https://www.nfl.com/super-bowl" },
                { title: "Levi's Stadium Event Guide", url: "https://www.levisstadium.com" }
            ],
            table_of_contents: [
                { id: "the-road-to-super-bowl-lx", text: "The Road to Super Bowl LX" },
                { id: "levis-stadium-technical-marvel", text: "Levi's Stadium: A Technical Marvel" },
                { id: "the-halftime-show-rumors", text: "The Halftime Show Rumors" },
                { id: "economic-impact", text: "Economic Impact" }
            ]
        })
    },
    {
        trend_id: 'iphone-17-rumors-2026',
        country_code: 'us',
        seo_title: 'iPhone 17 Rumors: Everything We Know About Apple\'s 2026 Flagship',
        seo_description: 'From the under-display FaceID to the long-awaited Slim model, explore the latest leaks and rumors about the upcoming iPhone 17. The ultimate 2026 Apple guide.',
        content_html: JSON.stringify({
            introduction: "As we move into the first quarter of 2026, the technology world is already buzzing with speculation about Apple's next major release: the iPhone 17. While the iPhone 16 remains a powerhouse in the market, early supply chain leaks from Asia suggest that Apple is planning a radical departure for its 2026 lineup. The most significant rumor involves a complete restructuring of the model tiers, potentially introducing a ultra-thin 'iPhone 17 Slim' that could redefine the aesthetic of the modern smartphone. For tech enthusiasts and investors alike, tracking these early signals is essential for understanding the trajectory of the mobile market in 2026.",
            sections: [
                {
                    heading: "The Death of the Plus: Introducing the iPhone 17 Slim",
                    content: "Consistent reports from industry analysts indicate that Apple will discontinue the 'Plus' model in 2026. In its place, the 'iPhone 17 Slim' is expected to take center stage as a premium, high-style option. Rumored to feature a significantly thinner chassis—potentially approaching the thinness of the latest iPad Pro—this model would cater to users who prioritize portability and design over raw battery capacity. While questions remain about the thermal management of such a thin device, Apple's advancements in multi-layered motherboard design suggest that they have found a way to pack Pro-grade performance into a wafer-thin form factor."
                },
                {
                    heading: "Under-Display FaceID: The Final Move Toward All-Screen",
                    content: "One of the most persistent rumors for the 2026 iPhone is the transition of FaceID sensors to an under-display configuration. This would allow Apple to reduce the 'Dynamic Island' to a simple circular cutout for the front-facing camera, or perhaps eliminate it entirely in favor of an uninterrupted display. Supply chain insiders claim that LG Display has successfully mass-produced the first generation of transparent substrates required for this technology. If implemented, the iPhone 17 would mark the first significant change to the frontal identity of the iPhone since the introduction of the notch in 2017."
                },
                {
                    heading: "A19 Chipset and the Dawn of Localized AI",
                    content: "The heart of the iPhone 17 will undoubtedly be the A19 chip, built on TSMC's enhanced 2nm process. Beyond the expected gains in power and efficiency, the A19 is rumored to feature a massive upgrade to the Neural Engine. This move is designed to support more complex 'On-Device AI' tasks, reducing reliance on the cloud for features like real-time video generative editing and deeply integrated Siri 4.0. As Apple continues its push into 'Apple Intelligence', the hardware-level optimizations in the iPhone 17 will likely be the primary selling point for the 2026 upgrade cycle."
                },
                {
                    heading: "Camera Upgrades: The Periscope Zoom Goes Standard",
                    content: "Photography remains a key differentiator for high-end smartphones. For the 2026 lineup, rumors suggest that the 5x optical zoom periscope lens—previously reserved for the Max model—will become standard across the entire iPhone 17 Pro range. Additionally, a new 48-megapixel ultra-wide sensor is expected to debut, bringing much-needed clarity to wide-angle shots and improving spatial video recording for the Vision Pro ecosystem. These camera enhancements, combined with new computational photography algorithms, aim to keep Apple at the top of the mobile imaging rankings."
                }
            ],
            faq: [
                { question: "When is the iPhone 17 release date?", answer: "Apple typically announces new iPhones in September. The iPhone 17 is expected in September 2026." },
                { question: "Will there be an iPhone 17 Slim?", answer: "Multiple rumors suggest a new 'Slim' model will replace the 'Plus' model in 2026." },
                { question: "What is the price of the iPhone 17?", answer: "Predictions suggest a starting price of $799 for the base model, with the Slim and Pro models reaching $1,099+." },
                { question: "Does the iPhone 17 have a new screen?", answer: "Rumors point to under-display FaceID and potentially a 120Hz ProMotion display for all models." }
            ],
            related_links: [
                { title: "MacRumors iPhone 17 Hub", url: "https://www.macrumors.com/roundup/iphone-17/" },
                { title: "9to5Mac Apple News", url: "https://9to5mac.com" }
            ],
            table_of_contents: [
                { id: "death-of-plus-slim", text: "The iPhone 17 Slim" },
                { id: "under-display-faceid", text: "Under-Display FaceID" },
                { id: "a19-chipset-ai", text: "A19 Chip and AI" },
                { id: "camera-upgrades", text: "Camera Upgrades" }
            ]
        })
    }
]

async function seed() {
    console.log(`Starting seed of ${articles.length} articles...`)
    for (const article of articles) {
        const { error } = await supabase
            .from('trend_articles')
            .upsert(article, { onConflict: 'trend_id, country_code' })

        if (error) {
            console.error(`Error inserting ${article.trend_id}:`, error.message)
        } else {
            console.log(`Successfully seeded: ${article.trend_id}`)
        }
    }
}

seed()
