import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleMetadata {
    title: string;
    slug: string;
    category: string;
    cover: string;
    seoTitle: string;
    seoDescription: string;
    keywords: string;
    publishedDate: string;
}

export interface Article extends ArticleMetadata {
    contentHtml: string;
}

function sanitizeValue(value: any): string {
    if (!value) return '';
    return String(value)
        .replace(/\x00/g, '')
        .replace(/[\n\r\t]/g, ' ')
        .trim();
}

export async function getArticles(): Promise<ArticleMetadata[]> {
    if (!fs.existsSync(articlesDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const fullPath = path.join(articlesDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);
            const data = matterResult.data as any;

            return {
                title: sanitizeValue(data.title),
                slug: sanitizeValue(data.slug),
                category: sanitizeValue(data.category),
                cover: sanitizeValue(data.cover),
                seoTitle: sanitizeValue(data.seoTitle),
                seoDescription: sanitizeValue(data.seoDescription),
                keywords: sanitizeValue(data.keywords),
                publishedDate: sanitizeValue(data.publishedDate)
            };
        });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();
    const data = matterResult.data as any;

    return {
        title: sanitizeValue(data.title),
        slug: sanitizeValue(data.slug),
        category: sanitizeValue(data.category),
        cover: sanitizeValue(data.cover),
        seoTitle: sanitizeValue(data.seoTitle),
        seoDescription: sanitizeValue(data.seoDescription),
        keywords: sanitizeValue(data.keywords),
        publishedDate: sanitizeValue(data.publishedDate),
        contentHtml,
    };
}
