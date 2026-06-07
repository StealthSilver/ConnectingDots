import type { Metadata } from "next"

import { AppNotFound } from "../../components/app-layout/app-not-found"
import { appRoutes } from "@/lib/app-routes"

export const metadata: Metadata = {
  title: "404 — Blog — Connecting Dots",
  description: "The blog post you're looking for isn't connected.",
}

export default function HomeBlogNotFound() {
  return (
    <AppNotFound
      title="Blog"
      backHref={appRoutes.blog}
      backLabel="Back to blog"
    />
  )
}
