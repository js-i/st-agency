import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS, siteConfig } from "@/lib/constants";
import { TelegramIcon, WhatsAppIcon } from "../icons/BrandIcons";
import { ButtonLink } from "../ui/Button";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const b = useTranslations("buttons");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-page border-b border-white/10 py-16">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">{t("ctaText")}</p>
          </div>
          <ButtonLink href="/contact" variant="primary">
            {b("getConsultation")}
          </ButtonLink>
        </div>
      </div>

      <div className="container-page grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Image
            src="/images/logo-mark.png"
            alt="Island Horizons"
            width={44}
            height={44}
            className="h-10 w-10"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            {t("description")}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {nav(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/insights" className="text-sm text-white/70 hover:text-white">
                {nav("insights")}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-sm text-white/70 hover:text-white">
                {nav("faq")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
            {t("getInTouch")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                {siteConfig.whatsapp.display}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.telegramContact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <TelegramIcon className="h-4 w-4 shrink-0" />
                {siteConfig.telegramContact.display}
              </a>
            </li>
            <li>{t("officeHours")}</li>
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
        <p className="text-xs text-white/40">
          © {year} {siteConfig.name}. {t("rights")}
        </p>
        <Link href="/privacy-policy" className="text-xs text-white/40 hover:text-white">
          {nav("privacy")}
        </Link>
      </div>
    </footer>
  );
}
