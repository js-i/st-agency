import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { homeContent, type HomeLocale } from "@/content/home";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd, serviceJsonLd } from "@/lib/json-ld";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ButtonLink } from "@/components/ui/Button";
import { HeroHorizonArt, HorizonLine, BandHorizonArt, CompassMotif } from "@/components/ui/HorizonArt";
import { ArrowRightIcon } from "@/components/icons/BrandIcons";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    locale === "ru"
      ? {
          title: "Island Horizons | Гражданство за инвестиции и консалтинг по глобальной мобильности",
          description:
            "Профессиональное сопровождение при получении гражданства за инвестиции. Индивидуальные решения, официальные государственные программы и комплексная консультационная поддержка.",
        }
      : {
          title: "Island Horizons | Citizenship by Investment & Global Mobility Consulting",
          description:
            "Professional guidance in citizenship by investment. Individual solutions, official government programmes, and comprehensive advisory support from consultation to completion.",
        };

  return buildMetadata({ locale, href: "/", ...copy });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const c = homeContent[locale as HomeLocale];

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Citizenship by Investment Advisory",
          description: c.hero.text,
          url: absoluteUrl(locale, "/"),
        })}
      />

      {/* Block 1 — Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-28 text-white sm:py-36">
        <HeroHorizonArt className="absolute inset-0 h-full w-full" />
        <HorizonLine className="h-14 sm:h-18" />
        <div className="container-page relative">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              {c.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.12] sm:text-5xl lg:text-6xl">
              {c.hero.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {c.hero.text}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="primary">
                {c.hero.primaryCta}
              </ButtonLink>
              <ButtonLink href="/programmes" variant="secondary">
                {c.hero.secondaryCta}
              </ButtonLink>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Block 2 — Strategy */}
      <section className="bg-white py-24 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionReveal>
            <h2 className="font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
              {c.strategy.title}
            </h2>
            <CompassMotif className="mt-10 hidden h-40 w-40 text-gold lg:block" />
          </SectionReveal>
          <div className="space-y-5">
            {c.strategy.paragraphs.map((p, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <p className="text-base leading-relaxed text-slate sm:text-[1.05rem]">
                  {p}
                </p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Block 3 — Why Us */}
      <section className="bg-mist py-24 sm:py-28">
        <div className="container-page">
          <SectionReveal>
            <h2 className="max-w-2xl font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
              {c.whyUs.title}
            </h2>
          </SectionReveal>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.whyUs.items.map((item, i) => (
              <SectionReveal key={item.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-mist-300 bg-white p-8">
                  <item.icon className="h-9 w-9 text-gold-dark" />
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate">
                    {item.text}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Block 4 — Solutions / Programmes preview */}
      <section className="bg-navy-950 py-24 text-white sm:py-28">
        <div className="container-page">
          <SectionReveal>
            <h2 className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
              {c.solutions.title}
            </h2>
            <p className="mt-5 max-w-2xl text-white/70 leading-relaxed">
              {c.solutions.text}
            </p>
          </SectionReveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <SectionReveal>
              <Link
                href="/programmes/sao-tome-and-principe"
                className="group block h-full rounded-2xl border border-gold/30 bg-white/5 p-8 transition-colors hover:border-gold/60"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-light">
                  {c.solutions.availableLabel}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  {c.solutions.availableName}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {c.solutions.availableText}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-light">
                  {t("available")}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  {c.solutions.upcomingLabel}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white/70">
                  Vanuatu · {t("comingSoon")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {c.solutions.upcomingText}
                </p>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.15} className="mt-10 inline-block">
            <ButtonLink href="/programmes" variant="secondary">
              {c.solutions.cta}
            </ButtonLink>
          </SectionReveal>
        </div>
      </section>

      {/* Block 5 — Approach preview */}
      <section className="bg-white py-24 sm:py-28">
        <div className="container-page max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
              {c.approach.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate sm:text-[1.05rem]">
              {c.approach.text}
            </p>
            <div className="mt-8">
              <ButtonLink href="/our-approach" variant="ghost">
                {c.approach.cta}
              </ButtonLink>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Block 6 — Trust */}
      <section className="bg-mist py-24 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <SectionReveal>
            <h2 className="font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
              {c.trust.title}
            </h2>
            <p className="mt-4 text-slate leading-relaxed">{c.trust.text}</p>
            <p className="mt-6 font-display text-xl font-semibold text-navy-950">
              {c.trust.closing}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {c.trust.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-mist-300 bg-white p-4 text-sm text-navy-900"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-center text-white sm:py-28">
        <BandHorizonArt className="absolute inset-0 h-full w-full opacity-70" />
        <HorizonLine className="h-12 sm:h-14" />
        <div className="container-page relative">
          <SectionReveal>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
              {c.finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/70 leading-relaxed">
              {c.finalCta.text}
            </p>
            <div className="mt-9">
              <ButtonLink href="/contact" variant="primary" className="mx-auto">
                {c.finalCta.cta}
              </ButtonLink>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
