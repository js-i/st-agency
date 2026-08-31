import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { insightsPageContent } from "@/content/insights-copy";
import { getAllInsights } from "@/lib/insights";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ArticleCard } from "@/components/insights/ArticleCard";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/insights">): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    locale === "ru"
      ? {
          title: "Insights | Аналитика по гражданству за инвестиции",
          description:
            "Экспертные материалы о гражданстве за инвестиции, международной мобильности и инвестиционной миграции от Island Horizons.",
        }
      : {
          title: "Insights | Citizenship by Investment Analysis",
          description:
            "Expert perspective on citizenship by investment, global mobility and investment migration from Island Horizons.",
        };
  return buildMetadata({ locale, href: "/insights", ...copy });
}

export default async function InsightsPage({
  params,
}: PageProps<"/[locale]/insights">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as "en" | "ru";
  const c = insightsPageContent[loc];
  const articles = getAllInsights(locale);

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

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
