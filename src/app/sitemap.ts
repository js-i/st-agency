import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, type Href } from "@/lib/seo";
import { getAllInsightSlugs } from "@/lib/insights";
import { INSIGHTS_CATEGORIES } from "@/content/insights-categories";

const STATIC_PATHS: { href: Href; priority: number }[] = [
  { href: "/", priority: 1 },
  { href: "/about", priority: 0.8 },
  { href: "/solutions", priority: 0.8 },
  { href: "/our-approach", priority: 0.7 },
  { href: "/programmes", priority: 0.9 },
  { href: "/programmes/sao-tome-and-principe", priority: 0.9 },
  { href: "/insights", priority: 0.7 },
  { href: "/faq", priority: 0.6 },
  { href: "/contact", priority: 0.7 },
  { href: "/privacy-policy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { href, priority } of STATIC_PATHS) {
    entries.push({
      url: absoluteUrl(routing.defaultLocale, href),
      priority,
      changeFrequency: href === "/" ? "weekly" : "monthly",
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [loc, absoluteUrl(loc, href)]),
        ),
      },
    });
  }

  for (const category of INSIGHTS_CATEGORIES) {
    const href = {
      pathname: "/insights/category/[category]" as const,
      params: { category: category.slug },
    };
    entries.push({
      url: absoluteUrl(routing.defaultLocale, href),
      priority: 0.5,
      changeFrequency: "weekly",
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [loc, absoluteUrl(loc, href)]),
        ),
      },
    });
  }

  for (const locale of routing.locales) {
    for (const slug of getAllInsightSlugs(locale)) {
      entries.push({
        url: absoluteUrl(locale, { pathname: "/insights/[slug]", params: { slug } }),
        priority: 0.6,
        changeFrequency: "monthly",
      });
    }
  }

  return entries;
}
