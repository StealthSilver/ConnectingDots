"use client"

import type { TablerIcon } from "@tabler/icons-react"
import {
  IconBrain,
  IconCode,
  IconLock,
  IconRoad,
  IconStack2,
} from "@tabler/icons-react"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { cn } from "@/lib/utils"

import { CourseEnrollButton } from "./course-enroll-button"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export type Level = "Beginner" | "Intermediate" | "Advanced"

export type Course = {
  title: string
  description: string
  level: Level
  icon: TablerIcon
  modules: number
  comingSoon?: boolean
}

const courses: Course[] = [
  {
    title: "DSA Fundamentals",
    description:
      "Arrays, linked lists, trees, graphs, sorting, and searching — built from scratch with clear intuition for each data structure before any code is written.",
    level: "Beginner",
    icon: IconStack2,
    modules: 12,
  },
  {
    title: "Cracking Technical Interviews",
    description:
      "Pattern-first problem solving across 6 core DSA patterns. Learn to recognise the shape of a problem before touching a keyboard.",
    level: "Intermediate",
    icon: IconCode,
    modules: 8,
    comingSoon: true,
  },
  {
    title: "Full-Stack Web Development",
    description:
      "From HTML to deploying a production app. Covers React, Node, databases, authentication, and the deployment pipeline — step by step.",
    level: "Beginner",
    icon: IconRoad,
    modules: 18,
    comingSoon: true,
  },
  {
    title: "Machine Learning for Engineers",
    description:
      "Intuition-first ML: linear models, decision trees, neural nets, and modern deep learning — using Python and real datasets throughout.",
    level: "Intermediate",
    icon: IconBrain,
    modules: 10,
    comingSoon: true,
  },
]

const levelColors: Record<Level, string> = {
  Beginner:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  Intermediate:
    "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  Advanced:
    "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
}

export function CourseList() {
  const searchParams = useSearchParams()
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!q) return courses
    return courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.level.toLowerCase().includes(q)
      )
    })
  }, [q])

  if (q && filtered.length === 0) {
    return (
      <p className="mt-2 text-center text-sm text-muted-foreground">
        No courses match{" "}
        <span className={cn(navChakra, "text-foreground")}>“{q}”</span>.
      </p>
    )
  }

  return (
    <GlowCardGrid className="grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
      {filtered.map((course) => (
        <CourseCard key={course.title} course={course} />
      ))}
    </GlowCardGrid>
  )
}

function CourseCard({ course }: { course: Course }) {
  const Icon = course.icon

  return (
    <GlowCard>
      <div className="flex h-full flex-col p-5 sm:p-7">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-chrome-border bg-background/70 shadow-sm sm:h-11 sm:w-11">
            <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <LevelBadge level={course.level} />
            {course.comingSoon && <ComingSoonBadge />}
          </div>
        </div>

        <h2
          className={cn(
            navChakra,
            "mb-2.5 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl",
          )}
        >
          {course.title}
        </h2>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {course.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--color-line)] pt-4">
          <span className="text-xs text-muted-foreground/70">
            {course.modules} modules
          </span>

          {course.comingSoon ? (
            <span
              className={cn(
                navChakra,
                "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60",
              )}
            >
              <IconLock className="size-3.5 shrink-0" aria-hidden />
              Not yet available
            </span>
          ) : (
            <CourseEnrollButton />
          )}
        </div>
      </div>
    </GlowCard>
  )
}

function LevelBadge({ level }: { level: Level }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-1 text-[11px] font-medium",
        levelColors[level],
      )}
    >
      {level}
    </span>
  )
}

function ComingSoonBadge() {
  return (
    <span className="rounded-full border border-chrome-border bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground/70">
      Coming soon
    </span>
  )
}
