import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/about": { en: "/about", ru: "/about" },
    "/solutions": { en: "/solutions", ru: "/solutions" },
    "/our-approach": { en: "/our-approach", ru: "/our-approach" },
    "/programmes": { en: "/programmes", ru: "/programmes" },
    "/programmes/sao-tome-and-principe": {
      en: "/programmes/sao-tome-and-principe",
      ru: "/programmes/sao-tome-and-principe",
    },
    "/insights": { en: "/insights", ru: "/insights" },
    "/insights/[slug]": { en: "/insights/[slug]", ru: "/insights/[slug]" },
    "/insights/category/[category]": {
      en: "/insights/category/[category]",
      ru: "/insights/category/[category]",
    },
    "/faq": { en: "/faq", ru: "/faq" },
    "/contact": { en: "/contact", ru: "/contact" },
    "/privacy-policy": { en: "/privacy-policy", ru: "/privacy-policy" },
  },
});

export type AppLocale = (typeof routing.locales)[number];
