import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { INSIGHTS_CATEGORIES } from "@/content/insights-categories";
import { insightsPageContent } from "@/content/insights-copy";
import { getInsightsByCategory } from "@/lib/insights";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ArticleCard } from "@/components/insights/ArticleCard";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    INSIGHTS_CATEGORIES.map((category) => ({ locale, category: category.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/insights/category/[category]">): Promise<Metadata> {
  const { locale, category } = await params;
  const found = INSIGHTS_CATEGORIES.find((c) => c.slug === category);
  if (!found) return {};
  const loc = locale as "en" | "ru";
  const title = found[loc];
  return buildMetadata({
    locale,
    href: { pathname: "/insights/category/[category]", params: { category } },
    title: `${title} | Insights`,
    description:
      loc === "ru"
        ? `Материалы Insights по теме «${title}» от Island Horizons.`
        : `Insights articles on ${title} from Island Horizons.`,
  });
}

export default async function InsightsCategoryPage({
  params,
}: PageProps<"/[locale]/insights/category/[category]">) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const loc = locale as "en" | "ru";
  const found = INSIGHTS_CATEGORIES.find((c) => c.slug === category);
  if (!found) notFound();

  const c = insightsPageContent[loc];
  const articles = getInsightsByCategory(locale, found.slug);

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={found[loc]} />
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          {articles.length === 0 ? (
            <p className="text-slate">{c.noArticles}</p>
          ) : (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <SectionReveal key={article.slug} delay={(i % 3) * 0.06}>
                  <ArticleCard article={article} locale={loc} />
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
