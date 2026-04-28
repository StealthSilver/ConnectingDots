import type { Metadata } from "next"
import Link from "next/link"
import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconTag,
} from "@tabler/icons-react"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { cn } from "@/lib/utils"

import { AppPageShell } from "../components/app-layout/app-page-shell"

export const metadata: Metadata = {
  title: "Blogs — Connecting Dots",
  description:
    "Long-form reads that explain the why, not just the how. Deep dives into computer science, programming, and learning.",
}

const navChakra = "[font-family:var(--font-chakra-petch)]" as const
const letterFont = "[font-family:var(--font-kalam)]" as const

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
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
    <AppPageShell>
      {/* Page header */}
      <section
        aria-labelledby="blogs-heading"
        className="px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70">
          Long reads
        </p>
        <h1
          id="blogs-heading"
          className={cn(
            navChakra,
            "mb-4 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl",
          )}
        >
          Blogs
        </h1>
        <p
          className={cn(
            letterFont,
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl",
          )}
        >
          Ideas that need more room than a video allows. Written slowly,
          meant to last.
        </p>
      </section>

      {/* Divider */}
      <div className="mb-8 px-5 sm:mb-12 sm:px-8">
        <div className="h-px w-full bg-[color:var(--color-line)]" />
      </div>

      {/* Posts */}
      <section
        aria-label="Blog posts"
        className="px-5 pb-14 sm:px-8 sm:pb-20"
      >
        <GlowCardGrid className="grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </GlowCardGrid>

        <p className="mt-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          More posts coming soon
        </p>
      </section>
    </AppPageShell>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <GlowCard>
      <div className="flex h-full flex-col p-5 sm:p-7">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-chrome-border bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              <IconTag className="size-3 shrink-0" aria-hidden />
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2
          className={cn(
            navChakra,
            "mb-3 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl",
          )}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {post.excerpt}
        </p>

        {/* Meta + CTA */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--color-line)] pt-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="size-3.5 shrink-0" aria-hidden />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconClock className="size-3.5 shrink-0" aria-hidden />
              {post.readingTime}
            </span>
          </div>
          <Link
            href={`/blogs/${post.slug}`}
            className={cn(
              navChakra,
              "inline-flex items-center gap-1.5 text-xs font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70",
            )}
          >
            Read post
            <IconArrowRight className="size-3.5 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </GlowCard>
  )
}
