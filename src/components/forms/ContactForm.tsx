"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { Button } from "@/components/ui/Button";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "w-full rounded-lg border border-mist-300 bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-slate-light focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal";
const labelClass = "text-sm font-medium text-navy-900";

export function ContactForm() {
  const t = useTranslations("form");
  const b = useTranslations("buttons");
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-teal/40 bg-teal-tint px-6 py-8 text-navy-950"
      >
        <p className="font-display text-lg font-semibold">{t("success")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            {t("firstName")}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            {t("lastName")}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className={labelClass}>
            {t("country")}
          </label>
          <input
            id="country"
            name="country"
            type="text"
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="programme" className={labelClass}>
            {t("programme")}
          </label>
          <select
            id="programme"
            name="programme"
            defaultValue=""
            className={`mt-1.5 ${inputClass}`}
          >
            <option value="" disabled>
              {t("programmePlaceholder")}
            </option>
            <option value="São Tomé and Príncipe">São Tomé and Príncipe</option>
            <option value="Vanuatu (Coming Soon)">Vanuatu (Coming Soon)</option>
            <option value="Not sure yet">{locale === "ru" ? "Пока не определился(-ась)" : "Not sure yet"}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`mt-1.5 ${inputClass} resize-none`}
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {t("error")}
        </p>
      )}

      <p className="text-xs leading-relaxed text-slate-light">
        {t("consent")}{" "}
        <Link href="/privacy-policy" className="underline hover:text-navy-900">
          {locale === "ru" ? "Политикой конфиденциальности" : "Privacy Policy"}
        </Link>
      </p>

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? b("sending") : b("sendRequest")}
      </Button>
    </form>
  );
}
