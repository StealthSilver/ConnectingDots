import type { Metadata } from "next"

import { AppNotFound } from "../../components/app-layout/app-not-found"
import { appRoutes } from "@/lib/app-routes"

export const metadata: Metadata = {
  title: "404 — Playground — Connecting Dots",
  description: "That playground page isn't connected yet.",
}

export default function HomePlaygroundNotFound() {
  return (
    <AppNotFound
      title="Playground"
      backHref={appRoutes.playground}
      backLabel="Back to playground"
    />
  )
}
