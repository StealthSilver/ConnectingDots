import type { Metadata } from "next"

import { AppPageShell } from "../../components/app-layout/app-page-shell"
import { BlogList } from "../../blogs/blog-list"
import { getBlogPosts } from "@/lib/blogs"

export const metadata: Metadata = {
  title: "Blog — Connecting Dots",
  description:
    "Long-form reads that explain the why, not just the how. Deep dives into computer science, programming, and learning.",
}

export default async function HomeBlogPage() {
  const posts = await getBlogPosts()

  return (
    <AppPageShell title="Blog" searchPlaceholder="Search blog…">
      <section
        aria-label="Blog posts"
        className="mx-auto w-full max-w-6xl px-4 pb-14 pt-5 sm:px-6 sm:pb-20 sm:pt-6 lg:px-8"
      >
        <BlogList posts={posts} />
      </section>
    </AppPageShell>
  )
}
