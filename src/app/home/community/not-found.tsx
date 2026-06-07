import type { Metadata } from "next"

import { AppNotFound } from "../../components/app-layout/app-not-found"
import { appRoutes } from "@/lib/app-routes"

export const metadata: Metadata = {
  title: "404 — Community — Connecting Dots",
  description: "That community page isn't connected yet.",
}

export default function HomeCommunityNotFound() {
  return (
    <AppNotFound
      title="Community"
      backHref={appRoutes.community}
      backLabel="Back to community"
    />
  )
}
