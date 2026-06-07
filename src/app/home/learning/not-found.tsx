import type { Metadata } from "next"

import { AppNotFound } from "../../components/app-layout/app-not-found"
import { appRoutes } from "@/lib/app-routes"

export const metadata: Metadata = {
  title: "404 — Learning — Connecting Dots",
  description: "That learning page isn't connected yet.",
}

export default function HomeLearningNotFound() {
  return (
    <AppNotFound
      title="Learning"
      backHref={appRoutes.learning}
      backLabel="Back to learning"
    />
  )
}
