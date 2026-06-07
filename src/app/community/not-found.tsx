import type { Metadata } from "next"

import { AppNotFound } from "../components/app-layout/app-not-found"

export const metadata: Metadata = {
  title: "404 — Community — Connecting Dots",
  description: "That community page isn’t connected yet.",
}

export default function CommunityNotFound() {
  return (
    <AppNotFound
      title="Community"
      backHref="/community"
      backLabel="Back to community"
    />
  )
}
