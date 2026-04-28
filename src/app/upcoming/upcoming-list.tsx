"use client"

import {
  IconBookmark,
  IconBrandDiscord,
  IconChartBar,
  IconCircleCheck,
  IconRobot,
  IconTerminal2,
  IconUsersGroup,
} from "@tabler/icons-react"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export type Status = "Planned" | "In progress" | "Shipping soon"

export type Feature = {
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

export function UpcomingList() {
  const searchParams = useSearchParams()
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!q) return features
    return features.filter((feature) => {
      return (
        feature.title.toLowerCase().includes(q) ||
        feature.description.toLowerCase().includes(q) ||
        feature.status.toLowerCase().includes(q)
      )
    })
  }, [q])

  if (q && filtered.length === 0) {
    return (
      <p className="mt-2 text-center text-sm text-muted-foreground">
        No upcoming features match{" "}
        <span className={cn(navChakra, "text-foreground")}>“{q}”</span>.
      </p>
    )
  }

  return (
    <>
      <GlowCardGrid className="grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
        {filtered.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </GlowCardGrid>

      {!q && (
        <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          <IconCircleCheck className="size-3.5 shrink-0" aria-hidden />
          Have an idea? Reach out on Discord or X.
        </p>
      )}
    </>
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
