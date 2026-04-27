"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroSignUpCta } from "./hero-sign-up-cta";
import { SectionHeading } from "./section-heading";

export function CtaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="get-started"
      aria-labelledby="cta-heading"
      className="px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-2xl">
        <SectionHeading id="cta-heading">Stay in the loop</SectionHeading>
        <div className="relative">
          <motion.div
            className="pointer-events-none absolute -inset-1 rounded-[1.4rem] opacity-40 blur-sm dark:opacity-30"
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, #ffb21a12, #f4420c18, #230c3614, #ffb21a12)",
            }}
            animate={reduce ? undefined : { rotate: [0, 360] }}
            transition={
              reduce ? undefined : { duration: 64, ease: "linear", repeat: Infinity }
            }
          />
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-50/90 p-8 shadow-[0_1px_0_rgba(0,0,0,0.04),0_20px_50px_rgba(0,0,0,0.06)] dark:border-zinc-700/50 dark:bg-zinc-950/50 dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_20px_50px_rgba(0,0,0,0.35)] sm:p-10">
            {!reduce && (
              <motion.div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_220px_at_0%_0%,rgba(244,66,12,0.1),transparent_65%),radial-gradient(360px_200px_at_100%_100%,rgba(35,12,54,0.12),transparent_70%)] dark:bg-[radial-gradient(420px_220px_at_0%_0%,rgba(255,178,26,0.08),transparent_65%),radial-gradient(360px_200px_at_100%_100%,rgba(35,12,54,0.2),transparent_70%)]"
                aria-hidden
                animate={{ opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
              />
            )}
            <div className="relative text-center">
              <p className="mx-auto max-w-md text-balance text-base leading-relaxed text-muted sm:text-lg">
                Get an account to save progress, get notified when new notes and courses
                land, and help shape what comes next.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <HeroSignUpCta className="min-h-11 min-w-[5.5rem] px-6 py-2.5 text-base sm:min-h-12 sm:px-7 sm:text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
