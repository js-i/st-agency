import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { InsightSummary } from "@/lib/insights";
import { INSIGHTS_CATEGORIES } from "@/content/insights-categories";
import { ArrowRightIcon } from "@/components/icons/BrandIcons";

export function ArticleCard({
  article,
  locale,
}: {
  article: InsightSummary;
  locale: "en" | "ru";
}) {
  const t = useTranslations("insights");
  const category = INSIGHTS_CATEGORIES.find((c) => c.slug === article.category);

  return (
    <Link
      href={{ pathname: "/insights/[slug]", params: { slug: article.slug } }}
      className="group flex h-full flex-col rounded-2xl border border-mist-300 bg-white p-7 transition-colors hover:border-gold"
    >
      {category && (
        <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
          {category[locale]}
        </span>
      )}
      <h3 className="mt-3 font-display text-lg font-semibold text-navy-950">
        {article.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
        {article.description}
      </p>
      <div className="mt-5 flex items-center justify-between text-xs text-slate-light">
        <span>{t("readingTime", { minutes: article.readingMinutes })}</span>
        <span className="inline-flex items-center gap-1 font-medium text-gold-dark">
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
