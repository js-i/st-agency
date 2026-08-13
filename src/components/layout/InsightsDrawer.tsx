"use client";

import { AnimatePresence, m } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { INSIGHTS_CATEGORIES } from "@/content/insights-categories";
import { X } from "lucide-react";

export function InsightsDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("insights");
  const nav = useTranslations("nav");
  const locale = useLocale() as "en" | "ru";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <m.div
            className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <m.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={t("panelTitle")}
          >
            <div className="flex h-full flex-col overflow-y-auto p-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-navy-950">
                  {t("panelTitle")}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={nav("closeMenu")}
                  className="rounded-full p-2 text-navy-900 hover:bg-mist"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {t("panelIntro")}
              </p>

              <Link
                href="/insights"
                onClick={onClose}
                className="mt-8 inline-flex items-center text-sm font-medium text-gold-dark hover:text-gold"
              >
                {t("allArticles")} →
              </Link>

              <h3 className="mt-8 text-xs font-semibold uppercase tracking-wider text-slate-light">
                {t("categories")}
              </h3>
              <nav className="mt-3 flex flex-col divide-y divide-mist-200 border-t border-mist-200">
                {INSIGHTS_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={{
                      pathname: "/insights/category/[category]",
                      params: { category: cat.slug },
                    }}
                    onClick={onClose}
                    className="py-3 text-[0.95rem] text-navy-900 transition-colors hover:text-gold-dark"
                  >
                    {cat[locale]}
                  </Link>
                ))}
              </nav>
            </div>
          </m.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
