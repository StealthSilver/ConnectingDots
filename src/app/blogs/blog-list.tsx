"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { ContentPreviewCard } from "@/components/content-preview-card"
import { GlowCardGrid } from "@/components/glow-card-grid"
import { appRoutes } from "@/lib/app-routes"
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

function compactExcerpt(text: string, maxLength = 140) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
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
    <GlowCardGrid className="grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {filtered.map((post) => (
        <ContentPreviewCard
          key={post.slug}
          title={post.title}
          excerpt={compactExcerpt(post.excerpt)}
          meta={post.tags[0] ?? post.readingTime}
          footerLabel={post.readingTime}
          href={`${appRoutes.blog}/${post.slug}`}
        />
      ))}
    </GlowCardGrid>
  )
}
