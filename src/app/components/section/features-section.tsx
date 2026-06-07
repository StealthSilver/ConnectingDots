import type { TablerIcon } from "@tabler/icons-react"
import {
  IconArrowUpRight,
  IconArticle,
  IconNotebook,
  IconRoad,
  IconSchool,
  IconTerminal2,
  IconUsersGroup,
} from "@tabler/icons-react"
import Link from "next/link"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { appRoutes } from "@/lib/app-routes"
import { fundamentalsFrontendNote } from "@/lib/learning-notes"
import { pageContentShellClassName } from "@/lib/page-content-shell"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

type Badge = "Live" | "Soon" | "In progress"

type FeatureDef = {
  title: string
  description: string
  icon: TablerIcon
  href: string
  bentoClass: string
  variant: "hero" | "standard"
  badge?: Badge
}

const roadmapSteps = ["Foundations", "Core Skills", "Projects", "Job Ready"]

const badgeStyles: Record<Badge, string> = {
  Live: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Soon: "border-chrome-border bg-background/60 text-muted-foreground",
  "In progress":
    "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
}

const features: FeatureDef[] = [
  {
    title: "Learning Roadmaps",
    description:
      "Structured paths from first principles to job-ready. No guessing, no dead ends — just a clear direction forward.",
    icon: IconRoad,
    href: appRoutes.courses,
    bentoClass:
      "md:col-span-2 md:row-span-2 lg:col-span-7 lg:row-span-2 lg:min-h-[22rem]",
    variant: "hero",
    badge: "Soon",
  },
  {
    title: "Blogs",
    description:
      "Long-form reads on design, UI, and frontend — explaining the why, not just the how.",
    icon: IconArticle,
    href: appRoutes.blog,
    bentoClass: "md:col-span-1 lg:col-span-5",
    variant: "standard",
    badge: "Live",
  },
  {
    title: "Notes",
    description: fundamentalsFrontendNote.excerpt,
    icon: IconNotebook,
    href: appRoutes.learning,
    bentoClass: "md:col-span-1 lg:col-span-5",
    variant: "standard",
    badge: "Live",
  },
  {
    title: "Courses",
    description:
      "Guided, step-by-step learning paths for topics that deserve a slower, structured pace.",
    icon: IconSchool,
    href: appRoutes.courses,
    bentoClass: "md:col-span-1 lg:col-span-4",
    variant: "standard",
    badge: "Soon",
  },
  {
    title: "Community",
    description:
      "A place to study together, ask questions, and share what you're building.",
    icon: IconUsersGroup,
    href: appRoutes.community,
    bentoClass: "md:col-span-1 lg:col-span-4",
    variant: "standard",
    badge: "Soon",
  },
  {
    title: "Playground",
    description:
      "Write, run, and test code right in your browser — no setup required.",
    icon: IconTerminal2,
    href: appRoutes.playground,
    bentoClass: "md:col-span-2 lg:col-span-4",
    variant: "standard",
    badge: "In progress",
  },
]

function FeatureBadge({ badge }: { badge: Badge }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wide sm:text-[11px]",
        badgeStyles[badge],
      )}
    >
      {badge}
    </span>
  )
}

function CardArrow() {
  return (
    <span
      aria-hidden
      className={cn(
        navChakra,
        "inline-flex size-8 items-center justify-center rounded-full border border-chrome-border bg-background/70",
        "text-muted-foreground transition-all duration-300",
        "group-hover:border-foreground/20 group-hover:bg-foreground group-hover:text-background",
        "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
      )}
    >
      <IconArrowUpRight className="size-3.5 shrink-0" />
    </span>
  )
}

function BentoCardBackground({ variant }: { variant: "hero" | "standard" }) {
  if (variant === "standard") {
    return null
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.22] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-muted) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute -right-24 -top-24 size-72 rounded-full bg-gradient-to-br from-zinc-300/30 via-zinc-200/10 to-transparent dark:from-zinc-600/20 dark:via-zinc-700/5" />
      <div className="absolute -bottom-16 -left-16 size-56 rounded-full bg-gradient-to-tr from-zinc-400/15 to-transparent dark:from-zinc-500/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-chrome-border/60 to-transparent" />
    </div>
  )
}

function FeatureCardWrapper({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn("group block h-full min-h-0 min-w-0", className)}
    >
      {children}
    </Link>
  )
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="w-full pb-12 pt-10 sm:pb-20 sm:pt-16"
    >
      <div className={pageContentShellClassName}>
        <div className="mb-7 sm:mb-11">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Features
          </p>
          <h2
            id="features-heading"
            className={cn(
              navChakra,
              "max-w-2xl text-xl font-semibold tracking-tight text-foreground sm:text-3xl",
            )}
          >
            Built for learners who mean it.
          </h2>
        </div>

        <GlowCardGrid
          className={cn(
            "min-w-0 grid-cols-1 gap-3 sm:gap-3.5 md:grid-cols-2 lg:grid-cols-12",
            "md:auto-rows-[minmax(9.5rem,auto)] lg:auto-rows-[minmax(10.5rem,auto)]",
          )}
        >
          {features.map(
            ({
              title,
              description,
              icon: Icon,
              href,
              bentoClass,
              variant,
              badge,
            }) => (
              <FeatureCardWrapper key={title} href={href} className={bentoClass}>
                <GlowCard className="relative h-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                  <BentoCardBackground variant={variant} />
                  {variant === "hero" ? (
                    <HeroCardContent
                      title={title}
                      description={description}
                      Icon={Icon}
                      badge={badge}
                    />
                  ) : (
                    <StandardCardContent
                      title={title}
                      description={description}
                      Icon={Icon}
                      badge={badge}
                    />
                  )}
                </GlowCard>
              </FeatureCardWrapper>
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
  badge,
}: {
  title: string
  description: string
  Icon: TablerIcon
  badge?: Badge
}) {
  return (
    <div className="relative z-10 flex h-full flex-col p-5 sm:p-7 lg:p-8">
      <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
        <div className="flex size-11 items-center justify-center rounded-2xl border border-chrome-border bg-background/80 shadow-sm backdrop-blur-sm sm:size-12">
          <Icon className="size-5 shrink-0 text-foreground" aria-hidden />
        </div>
        <div className="flex items-center gap-2">
          {badge && <FeatureBadge badge={badge} />}
          <CardArrow />
        </div>
      </div>

      <h3
        className={cn(
          navChakra,
          "mb-2 max-w-md text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-[1.65rem]",
        )}
      >
        {title}
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>

      <div className="mt-auto pt-6 sm:pt-8">
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 sm:gap-x-2">
          {roadmapSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-1.5 sm:gap-2">
              <span className="rounded-full border border-chrome-border/80 bg-background/70 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-sm sm:px-3 sm:text-xs">
                {step}
              </span>
              {i < roadmapSteps.length - 1 && (
                <span
                  className="text-[10px] text-muted-foreground/35 sm:text-xs"
                  aria-hidden
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StandardCardContent({
  title,
  description,
  Icon,
  badge,
}: {
  title: string
  description: string
  Icon: TablerIcon
  badge?: Badge
}) {
  return (
    <div className="relative z-10 flex h-full flex-col p-4 sm:p-5 lg:p-6">
      <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
        <div className="flex size-9 items-center justify-center rounded-xl border border-chrome-border bg-background/75 shadow-sm sm:size-10">
          <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        </div>
        <CardArrow />
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h3
          className={cn(
            navChakra,
            "text-base font-semibold tracking-tight text-foreground sm:text-lg",
          )}
        >
          {title}
        </h3>
        {badge && <FeatureBadge badge={badge} />}
      </div>

      <p className="line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {description}
      </p>
    </div>
  )
}
