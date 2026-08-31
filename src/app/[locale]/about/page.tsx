import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { aboutContent } from "@/content/about";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionReveal } from "@/components/ui/SectionReveal";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    locale === "ru"
      ? {
          title: "О компании Island Horizons | Надёжные консультанты по глобальной мобильности",
          description:
            "Узнайте больше о философии, ценностях и подходе Island Horizons. Мы сопровождаем клиентов в вопросах инвестиционной миграции и международной мобильности.",
        }
      : {
          title: "About Island Horizons | Trusted Global Mobility Advisors",
          description:
            "Learn about the philosophy, values and approach of Island Horizons — trusted advisors in investment migration and global mobility.",
        };
  return buildMetadata({ locale, href: "/about", ...copy });
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = aboutContent[locale as "en" | "ru"];

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page max-w-3xl space-y-5">
          {c.intro.map((p, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <p className="text-base leading-relaxed text-slate sm:text-[1.05rem]">
                {p}
              </p>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-2">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.whoWeAre.title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate">{c.whoWeAre.text}</p>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.approach.title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate">{c.approach.text}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.differentiators.title}
            </h2>
          </SectionReveal>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {c.differentiators.items.map((item, i) => (
              <SectionReveal key={item.title} delay={(i % 2) * 0.08}>
                <div className="border-l-2 border-teal pl-6">
                  <h3 className="font-display text-lg font-semibold text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {item.text}
                  </p>
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
              {c.values.title}
            </h2>
          </SectionReveal>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.items.map((item, i) => (
              <SectionReveal key={item.title} delay={(i % 4) * 0.07}>
                <h3 className="font-display text-base font-semibold text-teal-light">
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
        <div className="container-page grid grid-cols-1 gap-10 sm:grid-cols-2">
          <SectionReveal>
            <h2 className="font-display text-xl font-semibold text-navy-950">
              {c.mission.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              {c.mission.text}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <h2 className="font-display text-xl font-semibold text-navy-950">
              {c.vision.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              {c.vision.text}
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.promise.title}
            </h2>
            <ul className="mt-6 space-y-3">
              {c.promise.items.map((item) => (
                <li key={item} className="flex gap-3 text-slate">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </SectionReveal>
          <SectionReveal delay={0.1} className="mt-14 border-t border-mist-300 pt-10">
            <h2 className="font-display text-xl font-semibold text-navy-950">
              {c.closing.title}
            </h2>
            <p className="mt-3 leading-relaxed text-slate">{c.closing.text}</p>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
