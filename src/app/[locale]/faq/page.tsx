import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { faqContent } from "@/content/faq";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, faqJsonLd } from "@/lib/json-ld";
import { PageHero } from "@/components/sections/PageHero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ButtonLink } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    locale === "ru"
      ? {
          title: "Вопросы и ответы | Гражданство за инвестиции",
          description:
            "Ответы на наиболее распространенные вопросы о программах инвестиционного гражданства, процедурах оформления и требованиях.",
        }
      : {
          title: "Frequently Asked Questions | Citizenship by Investment",
          description:
            "Answers to the most common questions about investment citizenship programmes, application procedures and requirements.",
        };
  return buildMetadata({ locale, href: "/faq", ...copy });
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = faqContent[locale as "en" | "ru"];

  return (
    <>
      <JsonLd data={faqJsonLd(c.items)} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page max-w-3xl">
          <div className="divide-y divide-mist-300 border-t border-mist-300">
            {c.items.map((item, i) => (
              <SectionReveal key={item.question} delay={(i % 5) * 0.04}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-navy-950 sm:text-lg">
                    {item.question}
                    <span className="shrink-0 text-gold transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate sm:text-[0.95rem]">
                    {item.answer}
                  </p>
                </details>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.1} className="mt-16 border-t border-mist-300 pt-10">
            <h2 className="font-display text-2xl font-semibold text-navy-950">
              {c.closing.title}
            </h2>
            <p className="mt-3 leading-relaxed text-slate">{c.closing.text}</p>
            <div className="mt-6">
              <ButtonLink href="/contact">{c.closing.cta}</ButtonLink>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
