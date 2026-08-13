"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

/**
 * Slow, calm fade-up used across the site per the brand guideline: only
 * gentle appearance animation, no sliders, no abrupt motion.
 */
export function SectionReveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
