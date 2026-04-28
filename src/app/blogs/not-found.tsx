import type { Metadata } from "next"

import { AppNotFound } from "../components/app-layout/app-not-found"

export const metadata: Metadata = {
  title: "404 — Blogs — Connecting Dots",
  description: "The blog post you’re looking for isn’t connected.",
}

export default function BlogsNotFound() {
  return (
    <AppNotFound title="Blogs" backHref="/blogs" backLabel="Back to blogs" />
  )
}
