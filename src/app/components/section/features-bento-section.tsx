"use client";

import { motion, useReducedMotion } from "motion/react";
import { GlowCard } from "@/components/glow-card-grid/glow-card";
import { GlowCardGrid } from "@/components/glow-card-grid/glow-card-grid";
import { SectionHeading } from "./section-heading";

const FEATURE_CARDS = [
  {
    name: "Blogs",
    handle:
      "Long-form pieces when a topic needs room to stretch—opinions, walkthroughs, and lessons learned.",
    avatar: "https://unavatar.io/x/shadcn",
    size: "prominent" as const,
    className:
      "min-h-[220px] sm:col-span-2 sm:min-h-[280px] lg:col-span-2 lg:row-span-2 lg:row-start-1 lg:min-h-[300px]",
  },
  {
    name: "DSA notes",
    handle:
      "Patterns, problem families, and intuition—so patterns stick beyond the one-off grind.",
    avatar: "https://unavatar.io/x/evilrabbit_",
    size: "default" as const,
    className:
      "min-h-[160px] sm:col-span-1 sm:row-start-2 lg:col-start-3 lg:row-start-1",
  },
  {
    name: "Web development",
    handle:
      "Front to back, with emphasis on the ideas that keep apps maintainable in the real world.",
    avatar: "https://unavatar.io/x/orcdev",
    size: "default" as const,
    className:
      "min-h-[160px] sm:col-span-1 sm:row-start-2 lg:col-start-3 lg:row-start-2",
  },
  {
    name: "System design",
    handle: "Trade-offs, components, and how systems behave under load and over time.",
    avatar: "https://unavatar.io/x/davidhdev",
    size: "default" as const,
    className: "min-h-[160px] sm:col-span-1 sm:row-start-3 lg:col-span-2 lg:row-start-3",
  },
  {
    name: "UI design",
    handle: "Layout, type, and motion with restraint—clarity over decoration, always.",
    avatar: "https://unavatar.io/x/shuding",
    size: "default" as const,
    className: "min-h-[160px] sm:col-span-1 sm:row-start-3 lg:col-start-3 lg:row-start-3",
  },
] as const;

export function FeaturesBentoSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative z-10 px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="features-heading">What you will find</SectionHeading>
        <GlowCardGrid className="grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:grid-rows-3">
          {FEATURE_CARDS.map((card) => (
            <motion.article
              key={card.name}
              className={`flex min-h-0 flex-col self-stretch ${card.className}`}
              initial={false}
              whileHover={
                reduce
                  ? undefined
                  : { scale: 1.015, transition: { type: "spring", stiffness: 400, damping: 28 } }
              }
              whileTap={reduce ? undefined : { scale: 0.992 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            >
              <GlowCard
                name={card.name}
                handle={card.handle}
                avatar={card.avatar}
                size={card.size}
              />
            </motion.article>
          ))}
        </GlowCardGrid>
      </div>
    </section>
  );
}
