import type { Metadata } from "next"

import { AppNotFound } from "../components/app-layout/app-not-found"

export const metadata: Metadata = {
  title: "404 — Courses — Connecting Dots",
  description: "The course you’re looking for isn’t connected.",
}

export default function CoursesNotFound() {
  return (
    <AppNotFound
      title="Courses"
      backHref="/courses"
      backLabel="Back to courses"
    />
  )
}
