import type { Metadata } from "next"

import { cn } from "@/lib/utils"

import { AppPageShell } from "../components/app-layout/app-page-shell"
import { CourseList } from "./course-list"

export const metadata: Metadata = {
  title: "Courses — Connecting Dots",
  description:
    "Structured learning paths from first principles to job-ready. No guessing, no dead ends.",
}

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export default function CoursesPage() {
  return (
    <AppPageShell title="Courses" searchPlaceholder="Search courses…">
      <section
        aria-labelledby="courses-heading"
        className="px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12"
      >
        <h1
          id="courses-heading"
          className={cn(
            navChakra,
            "text-2xl font-semibold tracking-tight text-foreground sm:text-4xl",
          )}
        >
          Courses
        </h1>
      </section>

      <div className="mb-8 px-5 sm:mb-12 sm:px-8">
        <div className="h-px w-full bg-[color:var(--color-line)]" />
      </div>

      <section
        aria-label="Available courses"
        className="px-5 pb-14 sm:px-8 sm:pb-20"
      >
        <CourseList />
      </section>
    </AppPageShell>
  )
}
