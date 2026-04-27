"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  IconArticle,
  IconBook,
  IconBrandHtml5,
  IconLayersSubtract,
  IconPalette,
} from "@tabler/icons-react";
import { SectionHeading } from "./section-heading";

const features = [
  {
    title: "Blogs",
    description:
      "Long-form pieces when a topic needs room to stretch—opinions, walkthroughs, and lessons learned.",
    icon: IconArticle,
    className:
      "min-h-[220px] sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:row-start-1 lg:min-h-[300px]",
  },
  {
    title: "DSA notes",
    description:
      "Patterns, problem families, and intuition—so patterns stick beyond the one-off grind.",
    icon: IconBook,
    className:
      "min-h-[160px] sm:col-span-1 sm:row-start-2 lg:col-start-3 lg:row-start-1",
  },
  {
    title: "Web development",
    description:
      "Front to back, with emphasis on the ideas that keep apps maintainable in the real world.",
    icon: IconBrandHtml5,
    className:
      "min-h-[160px] sm:col-span-1 sm:row-start-2 lg:col-start-3 lg:row-start-2",
  },
  {
    title: "System design",
    description:
      "Trade-offs, components, and how systems behave under load and over time.",
    icon: IconLayersSubtract,
    className: "min-h-[160px] sm:col-span-1 sm:row-start-3 lg:col-span-2 lg:row-start-3",
  },
  {
    title: "UI design",
    description:
      "Layout, type, and motion with restraint—clarity over decoration, always.",
    icon: IconPalette,
    className: "min-h-[160px] sm:col-span-1 sm:row-start-3 lg:col-start-3 lg:row-start-3",
  },
] as const;

const cardBase =
  "relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-5 shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.04)] " +
  "dark:border-zinc-700/60 dark:bg-zinc-950/40 dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_12px_40px_rgba(0,0,0,0.35)]";

const glow =
  "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#ffb21a]/30 via-[#f4420c]/15 to-[#230c36]/20 blur-2xl " +
  "opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-[#ffb21a]/20 dark:via-[#f4420c]/10";

export function FeaturesBentoSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="features-heading">What you will find</SectionHeading>
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:grid-rows-3"
          style={{ gridAutoRows: "minmax(0, auto)" }}
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.article
                key={f.title}
                className={f.className}
                initial={false}
                whileHover={
                  reduce
                    ? undefined
                    : { scale: 1.015, transition: { type: "spring", stiffness: 400, damping: 28 } }
                }
                whileTap={reduce ? undefined : { scale: 0.992 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              >
                <div className={`${cardBase} group h-full`}>
                  <span className={glow} aria-hidden />
                  <div className="relative flex h-full flex-col gap-3">
                    <div className="inline-flex w-fit items-center justify-center rounded-xl border border-zinc-200/80 bg-white/60 p-2.5 text-zinc-800 shadow-sm dark:border-zinc-600/50 dark:bg-zinc-900/80 dark:text-zinc-200">
                      <Icon className="h-5 w-5" stroke={1.5} aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {f.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
