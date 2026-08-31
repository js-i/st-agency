import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { solutionsContent } from "@/content/solutions";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd, serviceJsonLd } from "@/lib/json-ld";
import { PageHero } from "@/components/sections/PageHero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ButtonLink } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/solutions">): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    locale === "ru"
      ? {
          title: "Решения | Citizenship by Investment и глобальная мобильность",
          description:
            "Комплексные решения в сфере инвестиционной миграции: гражданство за инвестиции, подбор программ, сопровождение оформления и консультационная поддержка.",
        }
      : {
          title: "Solutions | Citizenship by Investment & Global Mobility",
          description:
            "Comprehensive investment migration solutions: citizenship by investment, program selection, application support and advisory guidance.",
        };
  return buildMetadata({ locale, href: "/solutions", ...copy });
}

export default async function SolutionsPage({
  params,
}: PageProps<"/[locale]/solutions">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = solutionsContent[locale as "en" | "ru"];

  return (
    <>
      {c.items
        .filter((i) => i.status === "available")
        .map((item) => (
          <JsonLd
            key={item.title}
            data={serviceJsonLd({
              name: item.title,
              description: item.text,
              url: absoluteUrl(locale, "/solutions"),
            })}
          />
        ))}

      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-8 md:grid-cols-2">
          {c.items.map((item, i) => (
            <SectionReveal key={item.title} delay={(i % 2) * 0.06}>
              <div className="relative h-full rounded-2xl border border-mist-300 bg-white p-8">
                {item.status === "comingSoon" && (
                  <span className="absolute right-6 top-6 rounded-full bg-mist px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-slate-light">
                    Coming Soon
                  </span>
                )}
                <item.icon className="h-9 w-9 text-teal-dark" />
                <h2 className="mt-5 font-display text-xl font-semibold text-navy-950">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-teal-dark">
                  {item.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {item.text}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page max-w-2xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.future.title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate">{c.future.text}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page max-w-2xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.closing.title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate">{c.closing.text}</p>
            <div className="mt-8">
              <ButtonLink href="/contact">{c.cta}</ButtonLink>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
