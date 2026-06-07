import type { Metadata } from "next"

import { AppPageShell } from "../../components/app-layout/app-page-shell"
import { CourseList } from "../../courses/course-list"
import { appPageSectionClassName } from "@/lib/page-content-shell"

export const metadata: Metadata = {
  title: "Courses — Connecting Dots",
  description:
    "Structured learning paths from first principles to job-ready. No guessing, no dead ends.",
}

export default function HomeCoursesPage() {
  return (
    <AppPageShell title="Courses" searchPlaceholder="Search courses…">
      <section
        aria-label="Available courses"
        className={appPageSectionClassName}
      >
        <CourseList />
      </section>
    </AppPageShell>
  )
}
