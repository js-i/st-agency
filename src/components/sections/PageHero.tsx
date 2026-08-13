import { BandHorizonArt, HorizonLine } from "@/components/ui/HorizonArt";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
      <BandHorizonArt className="absolute inset-0 h-full w-full opacity-80" />
      <HorizonLine className="h-10 sm:h-12" />
      <div className="container-page relative">
        <SectionReveal>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {text && (
            <p className="mt-5 max-w-2xl text-white/75 leading-relaxed">
              {text}
            </p>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}
