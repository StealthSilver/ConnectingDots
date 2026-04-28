import type { Metadata } from "next"

import { cn } from "@/lib/utils"

import { AppPageShell } from "../components/app-layout/app-page-shell"
import { BlogList, type BlogPost } from "./blog-list"

export const metadata: Metadata = {
  title: "Blogs — Connecting Dots",
  description:
    "Long-form reads that explain the why, not just the how. Deep dives into computer science, programming, and learning.",
}

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

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
        aria-labelledby="blogs-heading"
        className="px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12"
      >
        <h1
          id="blogs-heading"
          className={cn(
            navChakra,
            "text-2xl font-semibold tracking-tight text-foreground sm:text-4xl",
          )}
        >
          Blogs
        </h1>
      </section>

      <div className="mb-8 px-5 sm:mb-12 sm:px-8">
        <div className="h-px w-full bg-[color:var(--color-line)]" />
      </div>

      <section
        aria-label="Blog posts"
        className="px-5 pb-14 sm:px-8 sm:pb-20"
      >
        <BlogList posts={posts} />
      </section>
    </AppPageShell>
  )
}
