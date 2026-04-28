import type { Metadata } from "next"
import {
  IconBookmark,
  IconBrandDiscord,
  IconChartBar,
  IconCircleCheck,
  IconRobot,
  IconRocket,
  IconTerminal2,
  IconUsersGroup,
} from "@tabler/icons-react"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { cn } from "@/lib/utils"

import { AppPageShell } from "../components/app-layout/app-page-shell"

export const metadata: Metadata = {
  title: "Upcoming features — Connecting Dots",
  description:
    "What we're building next on Connecting Dots — a sneak peek at the roadmap.",
}

const navChakra = "[font-family:var(--font-chakra-petch)]" as const
const letterFont = "[font-family:var(--font-kalam)]" as const

type Status = "Planned" | "In progress" | "Shipping soon"

type Feature = {
  title: string
  description: string
  status: Status
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
}

const features: Feature[] = [
  {
    title: "Interactive Playground",
    description:
      "Run snippets, visualize algorithms, and tinker with data structures right inside the browser — no setup required.",
    status: "In progress",
    icon: IconTerminal2,
  },
  {
    title: "Bookmarks & Reading Lists",
    description:
      "Save blog posts, notes, and lessons to curated lists. Pick up exactly where you left off across devices.",
    status: "Shipping soon",
    icon: IconBookmark,
  },
  {
    title: "AI Study Companion",
    description:
      "Ask questions on any note, get pattern hints on problems, and review weak areas with a tutor that knows your progress.",
    status: "Planned",
    icon: IconRobot,
  },
  {
    title: "Community & Discussions",
    description:
      "Comment threads on every post, study groups around courses, and a Discord-first place to share what you're building.",
    status: "Planned",
    icon: IconUsersGroup,
  },
  {
    title: "Progress Dashboard",
    description:
      "Track topics covered, streaks, and time-to-mastery on every pattern you learn. Less guessing, more momentum.",
    status: "Planned",
    icon: IconChartBar,
  },
  {
    title: "Discord Integration",
    description:
      "Daily problem drops, study reminders, and a connected feed between your account and the community server.",
    status: "Planned",
    icon: IconBrandDiscord,
  },
]

const statusStyles: Record<Status, string> = {
  Planned:
    "border-chrome-border bg-background/60 text-muted-foreground",
  "In progress":
    "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300",
  "Shipping soon":
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
}

export default function UpcomingPage() {
  return (
    <AppPageShell>
      {/* Page header */}
      <section
        aria-labelledby="upcoming-heading"
        className="px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70">
          Roadmap
        </p>
        <h1
          id="upcoming-heading"
          className={cn(
            navChakra,
            "mb-4 flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl",
          )}
        >
          <IconRocket className="size-7 shrink-0 text-foreground sm:size-9" aria-hidden />
          Upcoming features
        </h1>
        <p
          className={cn(
            letterFont,
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl",
          )}
        >
          A peek at what we&apos;re building next. Things change, but the
          direction is clear — make learning computer science feel less
          lonely.
        </p>
      </section>

      {/* Divider */}
      <div className="mb-8 px-5 sm:mb-12 sm:px-8">
        <div className="h-px w-full bg-[color:var(--color-line)]" />
      </div>

      {/* Feature cards */}
      <section
        aria-label="Planned features"
        className="px-5 pb-14 sm:px-8 sm:pb-20"
      >
        <GlowCardGrid className="grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </GlowCardGrid>

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          <IconCircleCheck className="size-3.5 shrink-0" aria-hidden />
          Have an idea? Reach out on Discord or X.
        </p>
      </section>
    </AppPageShell>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon
  return (
    <GlowCard>
      <div className="flex h-full flex-col p-5 sm:p-7">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-chrome-border bg-background/70 shadow-sm">
            <Icon className="size-5 shrink-0 text-foreground" aria-hidden />
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide",
              statusStyles[feature.status],
            )}
          >
            {feature.status}
          </span>
        </div>

        <h2
          className={cn(
            navChakra,
            "mb-2 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl",
          )}
        >
          {feature.title}
        </h2>

        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {feature.description}
        </p>
      </div>
    </GlowCard>
  )
}
