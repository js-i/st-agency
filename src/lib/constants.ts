export const siteConfig = {
  name: "Island Horizons",
  tagline: {
    en: "New Horizons. Trusted Guidance.",
    ru: "Новые горизонты. Уверенные решения.",
  },
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://island-horizons.vercel.app",
  email: "info@islandhorizonstp.com",
  whatsapp: {
    display: "+239 988 2147",
    href: "https://wa.me/2399882147",
  },
  telegramContact: {
    display: "+239 988 2147",
    href: "https://t.me/+2399882147",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/island-horizons",
    instagram: "https://www.instagram.com/islandhorizons",
    telegram: "https://t.me/islandhorizons",
  },
} as const;

export const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/solutions", key: "solutions" },
  { href: "/our-approach", key: "ourApproach" },
  { href: "/programmes", key: "programmes" },
  { href: "/contact", key: "contact" },
] as const;
