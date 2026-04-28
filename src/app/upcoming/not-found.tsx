import type { Metadata } from "next"

import { AppNotFound } from "../components/app-layout/app-not-found"

export const metadata: Metadata = {
  title: "404 — Upcoming features — Connecting Dots",
  description: "The roadmap item you’re looking for isn’t connected.",
}

export default function UpcomingNotFound() {
  return (
    <AppNotFound
      title="Upcoming Features"
      backHref="/upcoming"
      backLabel="Back to upcoming"
    />
  )
}
