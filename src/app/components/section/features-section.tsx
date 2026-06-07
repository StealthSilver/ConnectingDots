import type { TablerIcon } from "@tabler/icons-react"
import {
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

type FeatureDef = {
  title: string
  description: string
  icon: TablerIcon
  href: string
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
    href: appRoutes.courses,
    bentoClass: "md:col-span-2 md:row-span-2 lg:col-span-4 lg:row-span-2",
    isHero: true,
  },
  {
    title: "Blogs",
    description:
      "Long-form reads on design, UI, and frontend — explaining the why, not just the how.",
    icon: IconArticle,
    href: appRoutes.blog,
    bentoClass: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "Notes",
    description: fundamentalsFrontendNote.excerpt,
    icon: IconNotebook,
    href: appRoutes.learning,
    bentoClass: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "Courses",
    description:
      "Guided, step-by-step learning paths for topics that deserve a slower, structured pace.",
    icon: IconSchool,
    href: appRoutes.courses,
    bentoClass: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "Community",
    description:
      "A place to study together, ask questions, and share what you're building.",
    icon: IconUsersGroup,
    href: appRoutes.community,
    bentoClass: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "Playground",
    description:
      "Write, run, and test code right in your browser — no setup required.",
    icon: IconTerminal2,
    href: appRoutes.playground,
    bentoClass: "md:col-span-1 lg:col-span-2",
  },
]

function FeatureCardWrapper({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className="group block h-full">
      {children}
    </Link>
  )
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="w-screen max-w-full pb-12 pt-10 sm:pb-20 sm:pt-16"
    >
      <div className={pageContentShellClassName}>
        <div className="mb-7 sm:mb-11">
          <h2
            id="features-heading"
            className={cn(
              navChakra,
              "text-xl font-semibold tracking-tight text-foreground sm:text-3xl",
            )}
          >
            Built for learners who mean it.
          </h2>
        </div>

        <GlowCardGrid
          className={cn(
            "grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-6",
            "md:auto-rows-[minmax(128px,auto)] lg:auto-rows-[minmax(140px,auto)]",
          )}
        >
          {features.map(({ title, description, icon: Icon, href, bentoClass, isHero }) => (
            <FeatureCardWrapper key={title} href={href}>
              {isHero ? (
                <GlowCard
                  className={cn(
                    "h-full min-h-[200px] transition-transform duration-200 group-hover:-translate-y-0.5 sm:min-h-[220px]",
                    bentoClass,
                  )}
                >
                  <HeroCardContent title={title} description={description} Icon={Icon} />
                </GlowCard>
              ) : (
                <GlowCard
                  className={cn(
                    "h-full transition-transform duration-200 group-hover:-translate-y-0.5",
                    bentoClass,
                  )}
                >
                  <SmallCardContent title={title} description={description} Icon={Icon} />
                </GlowCard>
              )}
            </FeatureCardWrapper>
          ))}
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
    <div className="flex h-full flex-col p-5 sm:p-8">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-chrome-border bg-background/70 shadow-sm sm:mb-5 sm:h-11 sm:w-11">
        <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
      </div>

      <h3
        className={cn(
          navChakra,
          "mb-2 text-lg font-semibold tracking-tight text-foreground sm:mb-2.5 sm:text-2xl",
        )}
      >
        {title}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-x-1.5 gap-y-2 pt-5 sm:gap-x-2 sm:pt-6">
        {roadmapSteps.map((step, i) => (
          <div key={step} className="flex items-center gap-1.5 sm:gap-2">
            <span className="rounded-full border border-chrome-border bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground sm:px-3 sm:text-xs">
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
    <div className="flex h-full flex-col p-4 sm:p-6">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-chrome-border bg-background/70 shadow-sm sm:mb-3.5">
        <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      </div>

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
