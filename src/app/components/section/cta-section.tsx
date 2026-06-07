"use client"

import { appRoutes } from "@/lib/app-routes"
import Link from "next/link"

import { GlowCard } from "@/components/glow-card-grid"
import { AuthCtaLink } from "@/components/auth-cta-link"
import { pageContentShellClassName } from "@/lib/page-content-shell"
import { heroPairedCtaClass } from "@/lib/pill-chrome"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export function CtaSection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="w-screen max-w-full pb-14 pt-10 sm:pb-28 sm:pt-16"
    >
      <div className={pageContentShellClassName}>
        <GlowCard className="w-full">
          <div className="flex flex-col items-center gap-6 px-5 py-10 text-center sm:gap-10 sm:px-12 sm:py-20 lg:px-20">
            {/* Headline */}
            <h2
              id="cta-heading"
              className={cn(
                navChakra,
                "max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl",
              )}
            >
              Ready to connect the dots?
            </h2>

            {/* Sub-copy */}
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg sm:text-balance">
              Join learners who are building real understanding one concept at a
              time. No hype, no fluff. Just clear writing and structured paths
              that actually stick.
            </p>

            {/* CTA buttons — mirrors hero */}
            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <AuthCtaLink
                signedOutLabel="Sign up — it's free"
                containerClassName="w-full sm:w-fit"
                className={cn(navChakra, "flex w-full justify-center px-6 sm:w-auto sm:px-8")}
              />

              <Link
        href={appRoutes.blog}
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
