"use client"

import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconTag,
} from "@tabler/icons-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
}

interface BlogListProps {
  posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
  const searchParams = useSearchParams()
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!q) return posts
    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    })
  }, [posts, q])

  if (q && filtered.length === 0) {
    return (
      <p className="mt-2 text-center text-sm text-muted-foreground">
        No posts match{" "}
        <span className={cn(navChakra, "text-foreground")}>“{q}”</span>.
      </p>
    )
  }

  return (
    <>
      <GlowCardGrid className="grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </GlowCardGrid>

      {!q && (
        <p className="mt-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          More posts coming soon
        </p>
      )}
    </>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <GlowCard>
      <div className="flex h-full flex-col p-5 sm:p-7">
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

        <h2
          className={cn(
            navChakra,
            "mb-3 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl",
          )}
        >
          {post.title}
        </h2>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {post.excerpt}
        </p>

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
