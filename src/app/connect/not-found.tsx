import type { Metadata } from "next"

import { AppNotFound } from "../components/app-layout/app-not-found"

export const metadata: Metadata = {
  title: "404 — Connect — Connecting Dots",
  description: "That connect page isn’t linked yet.",
}

export default function ConnectNotFound() {
  return (
    <AppNotFound title="Connect" backHref="/connect" backLabel="Back to connect" />
  )
}
