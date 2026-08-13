export const INSIGHTS_CATEGORIES = [
  {
    slug: "citizenship-by-investment",
    en: "Citizenship by Investment",
    ru: "Гражданство за инвестиции",
  },
  {
    slug: "global-mobility",
    en: "Global Mobility",
    ru: "Международная мобильность",
  },
  {
    slug: "investment-migration",
    en: "Investment Migration",
    ru: "Инвестиционная миграция",
  },
  {
    slug: "countries-and-programmes",
    en: "Countries & Programmes",
    ru: "Страны и программы",
  },
  { slug: "family", en: "Family", ru: "Семья" },
  { slug: "business", en: "Business", ru: "Бизнес" },
  { slug: "news", en: "News", ru: "Новости" },
  {
    slug: "faqs-and-guides",
    en: "FAQs & Guides",
    ru: "Вопросы и руководства",
  },
] as const;

export type InsightsCategorySlug = (typeof INSIGHTS_CATEGORIES)[number]["slug"];
