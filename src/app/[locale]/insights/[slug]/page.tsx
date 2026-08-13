import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import {
  getAllInsightSlugs,
  getInsightSource,
} from "@/lib/insights";
import { INSIGHTS_CATEGORIES } from "@/content/insights-categories";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { PageHero } from "@/components/sections/PageHero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MdxContent } from "@/components/insights/MdxContent";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllInsightSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/insights/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = getInsightSource(locale, slug);
  if (!entry) return {};
  return buildMetadata({
    locale,
    href: { pathname: "/insights/[slug]", params: { slug } },
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
  });
}

export default async function InsightArticlePage({
  params,
}: PageProps<"/[locale]/insights/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as "en" | "ru";
  const entry = getInsightSource(locale, slug);
  if (!entry) notFound();

  const t = await getTranslations({ locale, namespace: "insights" });
  const b = await getTranslations({ locale, namespace: "buttons" });
  const category = INSIGHTS_CATEGORIES.find(
    (cat) => cat.slug === entry.frontmatter.category,
  );
  const url = absoluteUrl(locale, { pathname: "/insights/[slug]", params: { slug } });

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: entry.frontmatter.title,
          description: entry.frontmatter.description,
          url,
          datePublished: entry.frontmatter.date,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Insights", url: absoluteUrl(locale, "/insights") },
          { name: entry.frontmatter.title, url },
        ])}
      />

      <PageHero
        eyebrow={category ? category[loc] : t("panelTitle")}
        title={entry.frontmatter.title}
        text={entry.frontmatter.description}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page max-w-2xl">
          <SectionReveal>
            <p className="text-xs text-slate-light">
              {t("readingTime", { minutes: entry.readingMinutes })}
            </p>
            <article>
              <MdxContent source={entry.content} />
            </article>
          </SectionReveal>

          <SectionReveal delay={0.08} className="mt-14 border-t border-mist-300 pt-8">
            <Link
              href="/insights"
              className="text-sm font-medium text-gold-dark hover:text-gold"
            >
              ← {b("backToInsights")}
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
