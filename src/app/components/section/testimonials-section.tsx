"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "./section-heading";

const items = [
  {
    name: "A. M.",
    role: "Student",
    quote:
      "The notes finally connect the pattern to the problem—it is not just another solution write-up.",
  },
  {
    name: "K. Singh",
    role: "Builder",
    quote:
      "Calm pace and no fluff. I keep coming back when I get stuck and need the mental model, not a trick.",
  },
  {
    name: "P. Iyer",
    role: "Self-taught dev",
    quote:
      "The blog posts read like a conversation with someone who has actually shipped things. Rare.",
  },
  {
    name: "J. R.",
    role: "CS undergrad",
    quote:
      "System design and DSA in one place, without the noise. The layout of ideas matters here.",
  },
] as const;

function TestimonialCard({
  quote,
  name,
  role,
}: (typeof items)[number]) {
  return (
    <div
      className={[
        "w-[min(100%,320px)] shrink-0 rounded-2xl border border-zinc-200/80 bg-white/80 px-5 py-5 shadow-sm",
        "dark:border-zinc-700/60 dark:bg-zinc-950/50",
      ].join(" ")}
    >
      <p className="text-sm leading-relaxed text-foreground/95">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-2 border-t border-zinc-200/70 pt-4 dark:border-zinc-700/60">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300/80 dark:from-zinc-700 dark:to-zinc-800" />
        <div>
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted">{role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(false);

  useEffect(() => {
    setRun(true);
  }, []);

  const loop = [...items, ...items, ...items];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="overflow-hidden border-y border-zinc-200/60 bg-zinc-100/30 py-20 dark:border-zinc-800/80 dark:bg-zinc-950/25"
    >
      <div className="px-4 sm:px-6">
        <SectionHeading id="testimonials-heading">What readers say</SectionHeading>
      </div>
      {reduce || !run ? (
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4 px-4 pb-2 sm:px-6">
          {items.map((t) => (
            <TestimonialCard key={t.name + t.quote} {...t} />
          ))}
        </div>
      ) : (
        <div className="relative [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          <motion.div
            className="flex w-max gap-4 pr-4"
            initial={{ x: 0 }}
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              x: {
                duration: 45,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          >
            {loop.map((t, i) => (
              <TestimonialCard key={`${i}-${t.name}`} {...t} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
