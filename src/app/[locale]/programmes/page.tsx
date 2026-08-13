import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  programmesListContent,
  saoTomeProgramme,
} from "@/content/programmes";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/components/icons/BrandIcons";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/programmes">): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    locale === "ru"
      ? {
          title: "Программы гражданства за инвестиции",
          description:
            "Изучите государственные программы гражданства за инвестиции и выберите решение, соответствующее вашим долгосрочным целям.",
        }
      : {
          title: "Citizenship by Investment Programmes",
          description:
            "Explore government citizenship-by-investment programmes and find the solution that matches your long-term goals.",
        };
  return buildMetadata({ locale, href: "/programmes", ...copy });
}

export default async function ProgrammesPage({
  params,
}: PageProps<"/[locale]/programmes">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = programmesListContent[locale as "en" | "ru"];
  const stp = saoTomeProgramme[locale as "en" | "ru"];

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionReveal>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-light">
              {c.availableLabel}
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.06} className="mt-6">
            <Link
              href="/programmes/sao-tome-and-principe"
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-mist-300 bg-mist p-8 transition-colors hover:border-gold sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold text-navy-950">
                  {stp.countryName}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate">
                  {stp.hero.text.slice(0, 160)}…
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-gold-dark">
                {c.cta}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </SectionReveal>

          <SectionReveal delay={0.1} className="mt-14">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-light">
              {c.comingSoonLabel}
            </h2>
            <div className="mt-6 rounded-2xl border border-dashed border-mist-300 p-8">
              <h3 className="font-display text-2xl font-semibold text-slate-light">
                Vanuatu
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-light">
                {c.comingSoonNote}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
