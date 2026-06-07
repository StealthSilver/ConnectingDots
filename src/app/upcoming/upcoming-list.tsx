"use client"

import { IconCircleCheck } from "@tabler/icons-react"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export type Status = "Planned" | "In progress"

export type Feature = {
  title: string
  description: string
  status: Status
}

const features: Feature[] = [
  {
    title: "Playground",
    description:
      "Write, run, and test code in the browser — no setup required.",
    status: "In progress",
  },
  {
    title: "Courses",
    description:
      "Guided, step-by-step paths from first principles to job-ready.",
    status: "Planned",
  },
  {
    title: "Community",
    description:
      "Study together, ask questions, and share what you're building.",
    status: "Planned",
  },
]

const statusStyles: Record<Status, string> = {
  Planned: "text-muted-foreground",
  "In progress": "text-amber-600 dark:text-amber-300",
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
      <GlowCardGrid className="grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
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
  return (
    <GlowCard className="h-full">
      <div className="flex h-full flex-col p-4 sm:p-5">
        <p
          className={cn(
            "mb-2 text-[10px] font-medium uppercase tracking-[0.16em] sm:text-[11px]",
            statusStyles[feature.status],
          )}
        >
          {feature.status}
        </p>

        <h2
          className={cn(
            navChakra,
            "mb-2 text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg",
          )}
        >
          {feature.title}
        </h2>

        <p className="flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {feature.description}
        </p>
      </div>
    </GlowCard>
  )
}
