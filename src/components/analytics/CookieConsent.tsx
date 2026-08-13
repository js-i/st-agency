"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const CONSENT_STORAGE_KEY = "ih-cookie-consent";
export const CONSENT_EVENT = "ih-cookie-consent-changed";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(CONSENT_STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

export function CookieConsent() {
  const t = useTranslations("cookie");
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const visible = consent === null;

  function decide(value: "granted" | "denied") {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-mist-300 bg-white/97 backdrop-blur-sm">
      <div className="container-page flex flex-col items-center gap-4 py-5 sm:flex-row sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-slate">
          {t("message")}{" "}
          <Link href="/privacy-policy" className="underline hover:text-navy-900">
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="rounded-full border border-navy-900/20 px-5 py-2.5 text-sm font-medium text-navy-900 hover:border-navy-900/50"
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="rounded-full bg-navy-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-800"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
