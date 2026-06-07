import type { Metadata } from "next"

import { AppPageShell } from "../components/app-layout/app-page-shell"
import { getBlogPosts } from "@/lib/blogs"
import { HomeFeatured } from "./home-featured"

export const metadata: Metadata = {
  title: "Home — Connecting Dots",
  description:
    "Featured blogs, notes, and updates from Connecting Dots.",
}

export default async function HomePage() {
  const blogPosts = await getBlogPosts()

  return (
    <AppPageShell title="Home" searchPlaceholder="Search featured content…">
      <section
        aria-label="Featured content"
        className="mx-auto w-full max-w-6xl px-4 pb-14 pt-5 sm:px-6 sm:pb-20 sm:pt-6 lg:px-8"
      >
        <HomeFeatured blogPosts={blogPosts} />
      </section>
    </AppPageShell>
  )
}
