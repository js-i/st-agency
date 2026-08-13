import { getLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";

export default async function NotFound() {
  const locale = await getLocale();
  const isRu = locale === "ru";

  return (
    <section className="flex min-h-[60vh] items-center bg-white py-24">
      <div className="container-page text-center">
        <p className="font-display text-6xl font-semibold text-gold">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-navy-950">
          {isRu ? "Страница не найдена" : "Page not found"}
        </h1>
        <p className="mt-2 text-slate">
          {isRu
            ? "Страница, которую вы ищете, могла быть перемещена или больше не существует."
            : "The page you are looking for may have been moved or no longer exists."}
        </p>
        <div className="mt-8">
          <ButtonLink href="/" className="mx-auto">
            {isRu ? "На главную" : "Back to Home"}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
