import type { Metadata } from "next"
import { IconRocket } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

import { AppPageShell } from "../components/app-layout/app-page-shell"
import { UpcomingList } from "./upcoming-list"

export const metadata: Metadata = {
  title: "Upcoming features — Connecting Dots",
  description:
    "What we're building next on Connecting Dots — a sneak peek at the roadmap.",
}

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export default function UpcomingPage() {
  return (
    <AppPageShell
      title="Upcoming Features"
      searchPlaceholder="Search features…"
    >
      <section
        aria-labelledby="upcoming-heading"
        className="px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12"
      >
        <h1
          id="upcoming-heading"
          className={cn(
            navChakra,
            "flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl",
          )}
        >
          <IconRocket
            className="size-7 shrink-0 text-foreground sm:size-9"
            aria-hidden
          />
          Upcoming features
        </h1>
      </section>

      <div className="mb-8 px-5 sm:mb-12 sm:px-8">
        <div className="h-px w-full bg-[color:var(--color-line)]" />
      </div>

      <section
        aria-label="Planned features"
        className="px-5 pb-14 sm:px-8 sm:pb-20"
      >
        <UpcomingList />
      </section>
    </AppPageShell>
  )
}
