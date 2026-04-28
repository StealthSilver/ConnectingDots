import type { TablerIcon } from "@tabler/icons-react"
import {
  IconArticle,
  IconBrain,
  IconNotebook,
  IconPuzzle,
  IconRoad,
  IconTerminal2,
} from "@tabler/icons-react"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { pageContentShellClassName } from "@/lib/page-content-shell"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

type FeatureDef = {
  title: string
  description: string
  icon: TablerIcon
  bentoClass: string
  isHero?: boolean
}

const roadmapSteps = ["Foundations", "Core Skills", "Projects", "Job Ready"]

const features: FeatureDef[] = [
  {
    title: "Learning Roadmaps",
    description:
      "Structured paths from first principles to job-ready. No guessing, no dead ends — just a clear direction forward.",
    icon: IconRoad,
    bentoClass: "md:col-span-2 md:row-span-2 lg:col-span-4 lg:row-span-2",
    isHero: true,
  },
  {
    title: "In-depth Blogs",
    description: "Long-form reads that explain the why, not just the how.",
    icon: IconArticle,
    bentoClass: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "DSA for Interviews",
    description: "Pattern-first notes to crack any technical interview.",
    icon: IconNotebook,
    bentoClass: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "Code Playground",
    description: "Write, run, and test code right in your browser — no setup.",
    icon: IconTerminal2,
    bentoClass: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "AI & ML",
    description: "Hands-on notebooks from fundamentals to real-world projects.",
    icon: IconBrain,
    bentoClass: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "Problem Sets",
    description:
      "Curated exercises with progressive hints and full explanations.",
    icon: IconPuzzle,
    bentoClass: "md:col-span-2 lg:col-span-2",
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="w-screen max-w-full pb-16 pt-12 sm:pb-20 sm:pt-16"
    >
      <div className={pageContentShellClassName}>
        {/* Section header */}
        <div className="mb-9 sm:mb-11">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70">
            What&apos;s inside
          </p>
          <h2
            id="features-heading"
            className={cn(
              navChakra,
              "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
            )}
          >
            Built for learners who mean it.
          </h2>
        </div>

        {/* Bento grid */}
        <GlowCardGrid
          className={cn(
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-6",
            "md:auto-rows-[minmax(128px,auto)] lg:auto-rows-[minmax(140px,auto)]",
          )}
        >
          {features.map(({ title, description, icon: Icon, bentoClass, isHero }) =>
            isHero ? (
              <GlowCard key={title} className={cn("min-h-[220px]", bentoClass)}>
                <HeroCardContent title={title} description={description} Icon={Icon} />
              </GlowCard>
            ) : (
              <GlowCard key={title} className={bentoClass}>
                <SmallCardContent title={title} description={description} Icon={Icon} />
              </GlowCard>
            ),
          )}
        </GlowCardGrid>
      </div>
    </section>
  )
}

function HeroCardContent({
  title,
  description,
  Icon,
}: {
  title: string
  description: string
  Icon: TablerIcon
}) {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      {/* Icon */}
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-chrome-border bg-background/70 shadow-sm">
        <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
      </div>

      {/* Text */}
      <h3
        className={cn(
          navChakra,
          "mb-2.5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl",
        )}
      >
        {title}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>

      {/* Step progression visual */}
      <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-2 pt-6">
        {roadmapSteps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span className="rounded-full border border-chrome-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              {step}
            </span>
            {i < roadmapSteps.length - 1 && (
              <span className="text-xs text-muted-foreground/40" aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SmallCardContent({
  title,
  description,
  Icon,
}: {
  title: string
  description: string
  Icon: TablerIcon
}) {
  return (
    <div className="flex h-full flex-col p-5 sm:p-6">
      {/* Icon */}
      <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg border border-chrome-border bg-background/70 shadow-sm">
        <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      </div>

      {/* Text */}
      <h3
        className={cn(
          navChakra,
          "mb-1.5 text-base font-semibold text-foreground",
        )}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
