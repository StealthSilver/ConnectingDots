import type { Metadata } from "next"

import { AppPageShell } from "../components/app-layout/app-page-shell"
import { CourseList } from "./course-list"

export const metadata: Metadata = {
  title: "Courses — Connecting Dots",
  description:
    "Structured learning paths from first principles to job-ready. No guessing, no dead ends.",
}

export default function CoursesPage() {
  return (
    <AppPageShell title="Courses" searchPlaceholder="Search courses…">
      <section
        aria-label="Available courses"
        className="px-5 pb-14 pt-5 sm:px-8 sm:pb-20 sm:pt-6"
      >
        <CourseList />
      </section>
    </AppPageShell>
  )
}
