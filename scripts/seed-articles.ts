import 'dotenv/config';
import { createAdminClient } from '../lib/supabase/admin';

async function seed() {
    console.log("🚀 Starting Vytrixe Content Seeding...");
    const supabase = createAdminClient();

    const articles = [
        {
            title: "The AI Revolution in 2026: How Artificial Intelligence Is Reshaping the World",
            slug: "ai-revolution-2026",
            category: "AI",
            excerpt: "Artificial intelligence is transforming industries faster than ever. From autonomous agents to generative models, the next phase of AI is already unfolding.",
            content: `
                <p>Artificial intelligence has entered a new phase of acceleration in 2026. Over the past few years, AI models have evolved from experimental research projects into powerful tools that shape everyday life.</p>
                <p>Companies across healthcare, finance, and manufacturing are now deploying AI systems capable of automating complex decision-making tasks. Autonomous agents can analyze massive datasets, detect patterns, and make predictions faster than any human team.</p>
                <p>One of the most significant breakthroughs has been the integration of multimodal AI systems. These models can process text, images, video, and audio simultaneously, enabling entirely new applications in robotics, education, and creative industries.</p>
                <p>Major technology firms are investing billions into building AI infrastructure, including specialized chips and massive data centers designed specifically for machine learning workloads.</p>
                <p>As governments begin drafting regulations for AI safety and transparency, experts believe the next decade will define how humanity coexists with increasingly intelligent systems.</p>
                <p>The AI revolution is no longer coming. It has already begun.</p>
            `,
            seo_title: "AI Revolution 2026: The Future of Artificial Intelligence",
            seo_description: "Discover how artificial intelligence is transforming industries and shaping the future of technology in 2026.",
            cover_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
            keywords: ["AI", "Revolution 2026", "Artificial Intelligence", "Future Tech"]
        },
        {
            title: "The Future of Technology: Five Breakthroughs That Will Define the Next Decade",
            slug: "future-of-technology-breakthroughs",
            category: "Technology",
            excerpt: "From quantum computing to advanced robotics, the next wave of technology innovation is already emerging.",
            content: `
                <p>Technology evolves at an extraordinary pace, but certain breakthroughs have the potential to reshape the global economy.</p>
                <p>Quantum computing is one of the most promising technologies under development today. Unlike classical computers, quantum machines can solve complex problems that would otherwise take centuries.</p>
                <p>Another transformative innovation is advanced robotics. New robots powered by AI can adapt to their environments and collaborate with humans in factories, warehouses, and hospitals.</p>
                <p>Edge computing is also gaining momentum as companies move data processing closer to where information is generated. This dramatically reduces latency and improves efficiency for connected devices.</p>
                <p>Meanwhile, biotechnology is merging with computing, opening new possibilities in personalized medicine and genetic therapies.</p>
                <p>Together, these innovations are creating the foundation for a radically different technological landscape.</p>
            `,
            seo_title: "Future Technology Trends That Will Change the World",
            seo_description: "Explore the most important technology breakthroughs shaping the next decade.",
            cover_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
            keywords: ["Technology", "Breakthroughs", "Quantum Computing", "Robotics"]
        },
        {
            title: "Bitcoin and the Next Crypto Bull Cycle: What Investors Should Know",
            slug: "bitcoin-next-bull-cycle",
            category: "Crypto",
            excerpt: "Crypto markets are preparing for the next major cycle. Analysts believe Bitcoin could reach new highs.",
            content: `
                <p>Cryptocurrency markets have always moved in cycles. Periods of rapid growth are often followed by corrections before the next wave of innovation begins.</p>
                <p>Bitcoin remains the dominant asset in the crypto ecosystem. With increasing institutional adoption and limited supply, many analysts believe the next bull cycle could push prices far beyond previous highs.</p>
                <p>Another major trend is the growth of decentralized finance. DeFi platforms allow users to borrow, lend, and trade digital assets without traditional financial intermediaries.</p>
                <p>Regulation will also play a key role in shaping the future of crypto markets. Governments worldwide are working to create frameworks that balance innovation with consumer protection.</p>
                <p>Despite volatility, the long-term outlook for blockchain technology remains extremely strong.</p>
            `,
            seo_title: "Bitcoin Bull Run Predictions and Crypto Market Trends",
            seo_description: "Will Bitcoin lead the next crypto bull cycle? Discover the trends shaping the cryptocurrency market.",
            cover_image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1600",
            keywords: ["Bitcoin", "Crypto", "Bull Cycle", "Blockchain"]
        },
        {
            title: "How Startups Are Disrupting Traditional Industries",
            slug: "startups-disrupting-industries",
            category: "Startups",
            excerpt: "Startups around the world are transforming industries once dominated by large corporations.",
            content: `
                <p>Startups have become the driving force behind many of today’s most important innovations. With small teams and agile development models, these companies can move far faster than traditional enterprises.</p>
                <p>In sectors such as fintech, health technology, and artificial intelligence, startups are introducing entirely new ways of solving long-standing problems.</p>
                <p>Venture capital investment continues to pour into promising startups, enabling rapid growth and global expansion.</p>
                <p>Many successful companies that dominate markets today began as small startup projects built by a handful of founders with bold ideas.</p>
                <p>The startup ecosystem continues to expand, creating opportunities for entrepreneurs worldwide.</p>
            `,
            seo_title: "Startup Innovation and the Future of Entrepreneurship",
            seo_description: "Learn how startups are transforming industries and reshaping the global economy.",
            cover_image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1600",
            keywords: ["Startups", "Disruption", "Entrepreneurship", "Fintech"]
        },
        {
            title: "The Global Business Landscape Is Changing Faster Than Ever",
            slug: "global-business-transformation",
            category: "Business",
            excerpt: "Economic shifts, technological innovation, and globalization are transforming how companies operate.",
            content: `
                <p>Businesses today operate in an environment defined by rapid change. Digital transformation has become essential for companies seeking to remain competitive.</p>
                <p>Organizations are investing heavily in automation, cloud infrastructure, and data analytics to improve efficiency and reduce costs.</p>
                <p>Global supply chains are also evolving as companies seek greater resilience and flexibility.</p>
                <p>Meanwhile, remote work and distributed teams are redefining traditional workplace structures.</p>
                <p>Companies that adapt quickly to these changes are likely to emerge as the leaders of tomorrow.</p>
            `,
            seo_title: "Business Trends Transforming the Global Economy",
            seo_description: "Discover the key business trends shaping the modern global economy.",
            cover_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
            keywords: ["Business", "Global Economy", "Digital Transformation", "Trends"]
        },
        {
            title: "Why Viral Content Spreads So Fast on the Internet",
            slug: "science-of-viral-content",
            category: "Viral",
            excerpt: "Understanding why certain content spreads rapidly can help creators and brands reach massive audiences.",
            content: `
                <p>Viral content is one of the most powerful forces on the internet. A single video, tweet, or image can reach millions of people within hours.</p>
                <p>Psychologists believe that emotional engagement plays a crucial role in virality. Content that triggers strong emotions—such as surprise, humor, or inspiration—is more likely to be shared.</p>
                <p>Algorithms on social media platforms also amplify viral content by promoting posts that receive high engagement.</p>
                <p>Brands and creators increasingly study these patterns to design content that resonates with audiences.</p>
                <p>While virality cannot be guaranteed, understanding the science behind it can dramatically increase the chances of success.</p>
            `,
            seo_title: "The Science Behind Viral Content on the Internet",
            seo_description: "Why do some posts go viral? Discover the psychology and algorithms behind viral content.",
            cover_image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1600",
            keywords: ["Viral Content", "Social Media", "Algorithms", "Internet Trends"]
        },
        {
            title: "The Best AI Tools Transforming Productivity in 2026",
            slug: "best-ai-tools-productivity-2026",
            category: "Tools",
            excerpt: "AI tools are revolutionizing how people work, create, and manage information.",
            content: `
                <p>Artificial intelligence tools have become essential productivity companions for professionals across industries.</p>
                <p>AI writing assistants can generate articles, emails, and reports within seconds. Design tools powered by generative AI can produce graphics and videos without complex software.</p>
                <p>Developers are also benefiting from AI coding assistants that accelerate software development and reduce errors.</p>
                <p>As these tools continue improving, they will fundamentally change how humans collaborate with machines.</p>
                <p>The era of AI-powered productivity has officially begun.</p>
            `,
            seo_title: "Best AI Productivity Tools in 2026",
            seo_description: "Discover the most powerful AI tools transforming productivity today.",
            cover_image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1600",
            keywords: ["AI Tools", "Productivity", "Future of Work", "Automation"]
        }
    ];

    for (const article of articles) {
        console.log(`Inserting: ${article.title}...`);
        const { error } = await supabase
            .from('articles')
            .upsert({
                ...article,
                published_at: new Date().toISOString(),
                created_at: new Date().toISOString()
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`❌ Error inserting article "${article.title}":`, error.message);
        } else {
            console.log(`✅ Success: ${article.title}`);
        }
    }

    console.log("\n✨ Seeding Complete!");
}

seed().catch(err => {
    console.error("Fatal error during seeding:", err);
    process.exit(1);
});
