import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { InsightsCategorySlug } from "@/content/insights-categories";

export type InsightFrontmatter = {
  title: string;
  description: string;
  category: InsightsCategorySlug;
  date: string;
};

export type InsightSummary = InsightFrontmatter & {
  slug: string;
  readingMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/insights");

function localeDir(locale: string) {
  return path.join(CONTENT_DIR, locale);
}

export function getAllInsightSlugs(locale: string): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getInsightSource(locale: string, slug: string) {
  const filePath = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as InsightFrontmatter,
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function getAllInsights(locale: string): InsightSummary[] {
  return getAllInsightSlugs(locale)
    .map((slug) => {
      const entry = getInsightSource(locale, slug);
      if (!entry) return null;
      return {
        slug,
        ...entry.frontmatter,
        readingMinutes: entry.readingMinutes,
      };
    })
    .filter((v): v is InsightSummary => v !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsightsByCategory(
  locale: string,
  category: InsightsCategorySlug,
): InsightSummary[] {
  return getAllInsights(locale).filter((a) => a.category === category);
}
