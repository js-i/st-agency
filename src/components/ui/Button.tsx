import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "../icons/BrandIcons";

type Variant = "primary" | "secondary" | "ghost";
type LinkHref = ComponentProps<typeof Link>["href"];

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold text-navy-950 hover:bg-gold-light border border-gold hover:border-gold-light",
  secondary:
    "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/5",
  ghost:
    "bg-transparent text-navy-900 border border-navy-900/20 hover:border-navy-900/60",
};

const base =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function ButtonLink({
  href,
  variant = "primary",
  showArrow = true,
  className = "",
  children,
}: {
  href: LinkHref;
  variant?: Variant;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${base} ${variantClasses[variant]} ${className}`}
    >
      {children}
      {showArrow && <ArrowRightIcon className="h-4 w-4" />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  showArrow = false,
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  showArrow?: boolean;
}) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
      {showArrow && <ArrowRightIcon className="h-4 w-4" />}
    </button>
  );
}
