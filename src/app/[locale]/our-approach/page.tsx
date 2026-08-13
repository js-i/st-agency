import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { approachContent } from "@/content/approach";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ButtonLink } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/our-approach">): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    locale === "ru"
      ? {
          title: "Наш подход | Профессиональное сопровождение на каждом этапе",
          description:
            "Узнайте, как мы сопровождаем клиентов на каждом этапе получения второго гражданства — от первой консультации до завершения процесса.",
        }
      : {
          title: "Our Approach | Professional Guidance Every Step of the Way",
          description:
            "See how we guide clients through every stage of obtaining second citizenship — from the first consultation to completion.",
        };
  return buildMetadata({ locale, href: "/our-approach", ...copy });
}

export default async function ApproachPage({
  params,
}: PageProps<"/[locale]/our-approach">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = approachContent[locale as "en" | "ru"];

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="space-y-10">
            {c.steps.map((step, i) => (
              <SectionReveal key={step.number} delay={(i % 3) * 0.06}>
                <div className="grid grid-cols-1 gap-4 border-t border-mist-300 pt-8 sm:grid-cols-[100px_1fr] sm:gap-8">
                  <span className="font-display text-4xl font-semibold text-gold/70">
                    {step.number}
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-navy-950">
                      {step.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
                      {step.text}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-24">
        <div className="container-page">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              {c.qualities.title}
            </h2>
          </SectionReveal>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.qualities.items.map((item, i) => (
              <SectionReveal key={item.title} delay={(i % 4) * 0.07}>
                <h3 className="font-display text-base font-semibold text-gold-light">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.text}
                </p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page max-w-2xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.outcome.title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate">{c.outcome.text}</p>
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
