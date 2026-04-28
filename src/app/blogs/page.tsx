import type { Metadata } from "next"

import { AppPageShell } from "../components/app-layout/app-page-shell"
import { BlogList, type BlogPost } from "./blog-list"

export const metadata: Metadata = {
  title: "Blogs — Connecting Dots",
  description:
    "Long-form reads that explain the why, not just the how. Deep dives into computer science, programming, and learning.",
}

const posts: BlogPost[] = [
  {
    slug: "why-big-o-notation-actually-matters",
    title: "Why Big-O Notation Actually Matters (And When to Ignore It)",
    excerpt:
      "Every CS course starts with Big-O. Most explanations stop at the definition. This one goes further — we'll look at why asymptotic complexity is genuinely useful, where it misleads you, and how to think about performance trade-offs the way working engineers actually do.",
    date: "April 22, 2026",
    readingTime: "9 min read",
    tags: ["Computer Science", "Algorithms", "Fundamentals"],
  },
]

export default function BlogsPage() {
  return (
    <AppPageShell title="Blogs" searchPlaceholder="Search blogs…">
      <section
        aria-label="Blog posts"
        className="px-5 pb-14 pt-5 sm:px-8 sm:pb-20 sm:pt-6"
      >
        <BlogList posts={posts} />
      </section>
    </AppPageShell>
  )
}
