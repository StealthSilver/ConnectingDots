import type { Metadata } from "next"

import { AppNotFound } from "../components/app-layout/app-not-found"

export const metadata: Metadata = {
  title: "404 — Learning — Connecting Dots",
  description: "The note you’re looking for isn’t connected.",
}

export default function LearningNotFound() {
  return (
    <AppNotFound
      title="Learning"
      backHref="/learning"
      backLabel="Back to learning"
    />
  )
}
