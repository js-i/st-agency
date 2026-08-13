"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { InsightsDrawer } from "./InsightsDrawer";

export function Header() {
  const t = useTranslations("nav");
  const b = useTranslations("buttons");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);

  const primaryNav = NAV_ITEMS.filter(
    (item) => item.key !== "home" && item.key !== "contact",
  );

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-navy-950/95 backdrop-blur-sm">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <Image
            src="/images/logo-mark.png"
            alt="Island Horizons"
            width={44}
            height={44}
            className="h-10 w-10"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-[0.14em] text-white uppercase">
            Island Horizons
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setInsightsOpen(true)}
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            {t("insights")}
          </button>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LocaleSwitcher dark />
          <Link
            href="/contact"
            className="rounded-full border border-gold bg-gold px-5 py-2.5 text-sm font-medium text-navy-950 transition-colors hover:bg-gold-light hover:border-gold-light"
          >
            {b("getConsultation")}
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-white lg:hidden"
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy-950 lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-3 text-base text-white/90 hover:bg-white/5"
              >
                {t(item.key)}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setInsightsOpen(true);
              }}
              className="rounded-lg px-2 py-3 text-left text-base text-white/90 hover:bg-white/5"
            >
              {t("insights")}
            </button>
            <div className="mt-2 flex items-center justify-between px-2 py-2">
              <LocaleSwitcher dark />
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-medium text-navy-950"
            >
              {b("getConsultation")}
            </Link>
          </nav>
        </div>
      )}

      <InsightsDrawer open={insightsOpen} onClose={() => setInsightsOpen(false)} />
    </header>
  );
}
