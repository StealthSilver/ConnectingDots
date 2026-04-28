import { GlowCard } from "@/components/glow-card-grid"
import { cn } from "@/lib/utils"

import { AppNotFoundCta } from "./app-not-found-cta"
import { AppPageShell } from "./app-page-shell"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

interface AppNotFoundProps {
  /** Title shown in the thin top navbar (e.g. "Blogs"). */
  title?: string
  /** Path that the secondary "Back to …" CTA links to. */
  backHref?: string
  /** Label used for the secondary CTA (e.g. "Back to blogs"). */
  backLabel?: string
}

/**
 * 404 screen shared by /blogs, /courses, /learning and /upcoming.
 * Uses the same sidebar + mini footer layout as the rest of the app shell.
 */
export function AppNotFound({ title, backHref, backLabel }: AppNotFoundProps) {
  return (
    <AppPageShell title={title} showSearch={false}>
      <section
        aria-labelledby="app-not-found-heading"
        className="px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16"
      >
        <GlowCard className="w-full">
          <div className="flex flex-col items-center gap-6 px-5 py-10 text-center sm:gap-10 sm:px-12 sm:py-20 lg:px-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70">
              404 — Lost in the network
            </p>

            <h1
              id="app-not-found-heading"
              className={cn(
                navChakra,
                "max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl",
              )}
            >
              This dot isn&apos;t connected.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg sm:text-balance">
              The page you&apos;re looking for doesn&apos;t exist, or it may
              have moved. Head back home, or jump back to where you came from.
            </p>

            <AppNotFoundCta backHref={backHref} backLabel={backLabel} />
          </div>
        </GlowCard>
      </section>
    </AppPageShell>
  )
}
