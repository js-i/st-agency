import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { saoTomeProgramme } from "@/content/programmes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  JsonLd,
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/json-ld";
import { PageHero } from "@/components/sections/PageHero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ButtonLink } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/programmes/sao-tome-and-principe">): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    locale === "ru"
      ? {
          title: "Гражданство Сан-Томе и Принсипи за инвестиции",
          description:
            "Официальная программа гражданства Сан-Томе и Принсипи за инвестиции. Узнайте о преимуществах, требованиях и процессе оформления.",
        }
      : {
          title: "São Tomé and Príncipe Citizenship by Investment",
          description:
            "The official São Tomé and Príncipe citizenship-by-investment program. Learn about the benefits, requirements and application process.",
        };
  return buildMetadata({
    locale,
    href: "/programmes/sao-tome-and-principe",
    ...copy,
  });
}

export default async function SaoTomePage({
  params,
}: PageProps<"/[locale]/programmes/sao-tome-and-principe">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = saoTomeProgramme[locale as "en" | "ru"];
  const url = absoluteUrl(locale, "/programmes/sao-tome-and-principe");

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `${c.countryName} Citizenship by Investment`,
          description: c.hero.text,
          url,
        })}
      />
      <JsonLd data={faqJsonLd(c.faq.items.map((i) => ({ question: i.question, answer: i.answer })))} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", url: absoluteUrl(locale, "/programmes") },
          { name: c.countryName, url },
        ])}
      />

      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-dark">
              {c.gallery.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.gallery.title}
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.06} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
            <div className="relative col-span-2 aspect-21/9 overflow-hidden rounded-2xl sm:col-span-5">
              <Image
                src="/images/sao-tome/dolphins.jpg"
                alt={c.gallery.images.dolphins}
                fill
                sizes="(min-width: 640px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
            {(
              [
                ["/images/sao-tome/turtles.jpg", c.gallery.images.turtles],
                ["/images/sao-tome/waterfall.jpg", c.gallery.images.waterfall],
                ["/images/sao-tome/sunset.jpg", c.gallery.images.sunset],
                ["/images/sao-tome/coastal-road.jpg", c.gallery.images.coastalRoad],
                ["/images/sao-tome/cacao.jpg", c.gallery.images.cacao],
              ] as const
            ).map(([src, alt]) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-2xl sm:col-span-1"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 640px) 240px, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.whySection.title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate">{c.whySection.text}</p>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-mist-300 bg-white p-3">
              <div className="relative aspect-3/2 overflow-hidden rounded-xl">
                <Image
                  src="/images/sao-tome/map.png"
                  alt={c.whySection.mapCaption}
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-contain"
                />
              </div>
              <p className="mt-3 px-1 text-xs text-slate-light">{c.whySection.mapCaption}</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <SectionReveal>
            <h2 className="font-display text-xl font-semibold text-navy-950">
              {c.benefits.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {c.benefits.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-navy-900">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <h2 className="font-display text-xl font-semibold text-navy-950">
              {c.suitedFor.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {c.suitedFor.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-navy-900">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm italic text-slate-light">{c.suitedFor.note}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.costs.title}
            </h2>
            <p className="mt-4 text-slate leading-relaxed">{c.costs.text}</p>
            <ul className="mt-5 space-y-3">
              {c.costs.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-navy-900">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm italic text-slate-light">{c.costs.note}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.process.title}
            </h2>
          </SectionReveal>
          <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.process.steps.map((step, i) => (
              <SectionReveal key={step.title} delay={(i % 3) * 0.06} as="li">
                <span className="font-display text-2xl font-semibold text-teal/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold text-navy-950">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">
                  {step.text}
                </p>
              </SectionReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.documents.title}
            </h2>
            <p className="mt-4 text-slate leading-relaxed">{c.documents.text}</p>
            <ul className="mt-5 space-y-3">
              {c.documents.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-navy-900">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm italic text-slate-light">{c.documents.note}</p>
          </SectionReveal>
          <SectionReveal delay={0.08} className="relative aspect-8/5 overflow-hidden rounded-2xl">
            <Image
              src="/images/sao-tome/passports.jpg"
              alt={c.documents.imageAlt}
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </SectionReveal>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.legal.title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate">{c.legal.text}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.whyUs.title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate">{c.whyUs.text}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.faq.title}
            </h2>
          </SectionReveal>
          <div className="mt-8 divide-y divide-mist-300 border-t border-mist-300">
            {c.faq.items.map((item, i) => (
              <SectionReveal key={item.question} delay={(i % 4) * 0.05}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-navy-950">
                    {item.question}
                    <span className="shrink-0 text-teal transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {item.answer}
                  </p>
                </details>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-20 text-center text-white sm:py-24">
        <div className="container-page relative max-w-2xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              {c.closing.title}
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">{c.closing.text}</p>
            <div className="mt-8">
              <ButtonLink href="/contact" className="mx-auto">
                {c.closing.cta}
              </ButtonLink>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
