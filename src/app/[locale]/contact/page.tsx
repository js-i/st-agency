import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { contactContent } from "@/content/contact";
import { siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  MobilityIcon,
  GlobeIcon,
  DocumentsIcon,
  CompassIcon,
  WhatsAppIcon,
  TelegramIcon,
} from "@/components/icons/BrandIcons";

const getIcons = [MobilityIcon, GlobeIcon, DocumentsIcon, CompassIcon];

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    locale === "ru"
      ? {
          title: "Контакты Island Horizons",
          description:
            "Свяжитесь с Island Horizons, чтобы получить персональную консультацию по вопросам гражданства за инвестиции и международной мобильности.",
        }
      : {
          title: "Contact Island Horizons",
          description:
            "Get in touch with Island Horizons for a personal consultation on citizenship by investment and global mobility.",
        };
  return buildMetadata({ locale, href: "/contact", ...copy });
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = contactContent[locale as "en" | "ru"];

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c.getSection.title}
            </h2>
          </SectionReveal>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.getSection.items.map((item, i) => {
              const Icon = getIcons[i];
              return (
                <SectionReveal key={item.title} delay={(i % 4) * 0.07}>
                  <Icon className="h-8 w-8 text-gold-dark" />
                  <h3 className="mt-4 font-display text-base font-semibold text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {item.text}
                  </p>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionReveal>
              <h2 className="font-display text-xl font-semibold text-navy-950">
                {c.format.title}
              </h2>
              <p className="mt-3 leading-relaxed text-slate">{c.format.text}</p>
            </SectionReveal>

            <SectionReveal delay={0.08} className="mt-10 rounded-2xl border border-mist-300 bg-white p-7">
              <h3 className="font-display text-lg font-semibold text-navy-950">
                {c.details.title}
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-slate-light">{c.details.emailLabel}</dt>
                  <dd>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-gold-dark hover:text-gold"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-light">{c.details.whatsappLabel}</dt>
                  <dd>
                    <a
                      href={siteConfig.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold-dark hover:text-gold"
                    >
                      <WhatsAppIcon className="h-4 w-4 shrink-0" />
                      {siteConfig.whatsapp.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-light">{c.details.telegramLabel}</dt>
                  <dd>
                    <a
                      href={siteConfig.telegramContact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold-dark hover:text-gold"
                    >
                      <TelegramIcon className="h-4 w-4 shrink-0" />
                      {siteConfig.telegramContact.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-light">{c.details.hoursLabel}</dt>
                  <dd className="text-navy-900">{c.details.hours}</dd>
                </div>
              </dl>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.1}>
            <div className="rounded-2xl border border-mist-300 bg-white p-8">
              <h2 className="font-display text-xl font-semibold text-navy-950">
                {c.form.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {c.form.text}
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
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
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
