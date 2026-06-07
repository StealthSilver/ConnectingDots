import type { Metadata } from "next"

import { AppNotFound } from "../components/app-layout/app-not-found"

export const metadata: Metadata = {
  title: "404 — Blog — Connecting Dots",
  description: "The blog post you’re looking for isn’t connected.",
}

export default function BlogNotFound() {
  return (
    <AppNotFound title="Blog" backHref="/blog" backLabel="Back to blog" />
  )
}
