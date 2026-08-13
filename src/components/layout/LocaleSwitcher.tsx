"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <div
      className="flex items-center gap-1 text-xs font-medium tracking-wide"
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && (
            <span className={dark ? "text-white/30 px-1" : "text-navy-900/25 px-1"}>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() =>
              router.replace(
                // @ts-expect-error -- next-intl narrows this to known params per pathname
                { pathname, params },
                { locale: loc },
              )
            }
            aria-current={locale === loc}
            className={`uppercase transition-colors ${
              locale === loc
                ? dark
                  ? "text-gold-light"
                  : "text-gold-dark"
                : dark
                  ? "text-white/60 hover:text-white"
                  : "text-navy-900/50 hover:text-navy-900"
            }`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
