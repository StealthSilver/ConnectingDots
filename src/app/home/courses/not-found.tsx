import type { Metadata } from "next"

import { AppNotFound } from "../../components/app-layout/app-not-found"
import { appRoutes } from "@/lib/app-routes"

export const metadata: Metadata = {
  title: "404 — Courses — Connecting Dots",
  description: "That course page isn't connected yet.",
}

export default function HomeCoursesNotFound() {
  return (
    <AppNotFound
      title="Courses"
      backHref={appRoutes.courses}
      backLabel="Back to courses"
    />
  )
}
