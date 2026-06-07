import type { Metadata } from "next"

import { AppNotFound } from "../components/app-layout/app-not-found"
import { appRoutes } from "@/lib/app-routes"

export const metadata: Metadata = {
  title: "404 — Home — Connecting Dots",
  description: "That home page isn't connected yet.",
}

export default function HomeNotFound() {
  return (
    <AppNotFound
      title="Home"
      backHref={appRoutes.home}
      backLabel="Back to home"
    />
  )
}
