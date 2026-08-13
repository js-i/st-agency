import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "./constants";

export type Href = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(locale: string, href: Href) {
  const pathname = getPathname({ locale, href });
  return `${siteConfig.url}${pathname === "/" ? "" : pathname}`;
}

export function buildMetadata({
  locale,
  href,
  title,
  description,
  image,
}: {
  locale: string;
  href: Href;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(locale, href);
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, absoluteUrl(loc, href)]),
  );
  const ogImage = image ?? `${siteConfig.url}/images/og-default.png`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
