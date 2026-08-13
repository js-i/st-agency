import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { privacyContent } from "@/content/privacy";
import { buildMetadata } from "@/lib/seo";
import { SectionReveal } from "@/components/ui/SectionReveal";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy-policy">): Promise<Metadata> {
  const { locale } = await params;
  const c = privacyContent[locale as "en" | "ru"];
  return buildMetadata({
    locale,
    href: "/privacy-policy",
    title: c.title,
    description:
      locale === "ru"
        ? "Политика конфиденциальности Island Horizons: какие данные мы собираем и как их используем."
        : "Island Horizons Privacy Policy: what data we collect and how we use it.",
  });
}

export default async function PrivacyPolicyPage({
  params,
}: PageProps<"/[locale]/privacy-policy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = privacyContent[locale as "en" | "ru"];

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page max-w-2xl">
        <SectionReveal>
          <h1 className="font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
            {c.title}
          </h1>
          <p className="mt-3 text-sm text-slate-light">{c.updated}</p>
          <p className="mt-6 leading-relaxed text-slate">{c.intro}</p>
        </SectionReveal>

        <div className="mt-10 space-y-8">
          {c.sections.map((section, i) => (
            <SectionReveal key={section.title} delay={(i % 4) * 0.05}>
              <h2 className="font-display text-lg font-semibold text-navy-950">
                {section.title}
              </h2>
              <div className="mt-2 space-y-2">
                {section.body.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-slate">
                    {p}
                  </p>
                ))}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
