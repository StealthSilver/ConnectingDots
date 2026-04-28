"use client"

import Link from "next/link"

import { GlowCard } from "@/components/glow-card-grid"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { pageContentShellClassName } from "@/lib/page-content-shell"
import { heroPairedCtaClass } from "@/lib/pill-chrome"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export function CtaSection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="w-screen max-w-full pb-20 pt-12 sm:pb-28 sm:pt-16"
    >
      <div className={pageContentShellClassName}>
        <GlowCard className="w-full">
          <div className="flex flex-col items-center gap-8 px-8 py-14 text-center sm:gap-10 sm:px-12 sm:py-20 lg:px-20">
            {/* Eyebrow */}
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70">
              Start learning
            </p>

            {/* Headline */}
            <h2
              id="cta-heading"
              className={cn(
                navChakra,
                "max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl",
              )}
            >
              Ready to connect the dots?
            </h2>

            {/* Sub-copy */}
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:text-balance">
              Join learners who are building real understanding one concept at a
              time. No hype, no fluff. Just clear writing and structured paths
              that actually stick.
            </p>

            {/* CTA buttons — mirrors hero */}
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <HoverBorderGradient
                as={Link}
                href="/sign-up"
                className={cn(navChakra, "px-6 sm:px-8")}
              >
                Sign up — it&apos;s free
              </HoverBorderGradient>

              <Link
                href="/blogs"
                className={cn(
                  heroPairedCtaClass,
                  navChakra,
                  "w-full cursor-pointer justify-center tracking-tight sm:w-auto",
                )}
              >
                Browse the blogs
              </Link>
            </div>

          
          </div>
        </GlowCard>
      </div>
    </section>
  )
}
