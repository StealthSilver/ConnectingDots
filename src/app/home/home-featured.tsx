"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { ContentPreviewCard } from "@/components/content-preview-card"
import { GlowCardGrid } from "@/components/glow-card-grid"
import { appRoutes } from "@/lib/app-routes"
import { blogPosts } from "@/lib/blog-posts"
import {
  fundamentalsFrontendNote,
} from "@/lib/learning-notes"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

type FeaturedSection = "Featured blogs" | "Featured notes" | "News"

type FeaturedItem = {
  id: string
  section: FeaturedSection
  title: string
  excerpt: string
  href: string
  meta: string
}

const featuredItems: FeaturedItem[] = [
  ...blogPosts.map((post) => ({
    id: `blog-${post.slug}`,
    section: "Featured blogs" as const,
    title: post.title,
    excerpt: post.excerpt,
    href: `${appRoutes.blog}/${post.slug}`,
    meta: post.readingTime,
  })),
  {
    id: "note-fundamentals",
    section: "Featured notes",
    title: fundamentalsFrontendNote.title,
    excerpt: fundamentalsFrontendNote.excerpt,
    href: fundamentalsFrontendNote.href,
    meta: fundamentalsFrontendNote.meta,
  },
]

const sectionOrder: FeaturedSection[] = [
  "Featured blogs",
  "Featured notes",
  "News",
]

export function HomeFeatured() {
  const searchParams = useSearchParams()
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!q) return featuredItems
    return featuredItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.meta.toLowerCase().includes(q)
      )
    })
  }, [q])

  const grouped = useMemo(() => {
    return sectionOrder.map((section) => ({
      section,
      items: filtered.filter((item) => item.section === section),
    }))
  }, [filtered])

  const hasVisibleContent = grouped.some(
    (group) => group.section !== "News" && group.items.length > 0,
  )

  if (q && !hasVisibleContent) {
    return (
      <p className="mt-2 text-center text-sm text-muted-foreground">
        No featured items match{" "}
        <span className={cn(navChakra, "text-foreground")}>“{q}”</span>.
      </p>
    )
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {grouped.map(({ section, items }) => {
        if (section !== "News" && items.length === 0) return null

        return (
          <div key={section}>
            <h2
              className={cn(
                navChakra,
                "mb-3 text-base font-semibold tracking-tight text-foreground sm:mb-4 sm:text-lg",
              )}
            >
              {section}
            </h2>

            {section === "News" ? null : (
              <GlowCardGrid className="grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {items.map((item) => (
                  <ContentPreviewCard
                    key={item.id}
                    title={item.title}
                    excerpt={item.excerpt}
                    meta={item.meta}
                    href={item.href}
                    footerLabel={item.section}
                  />
                ))}
              </GlowCardGrid>
            )}
          </div>
        )
      })}
    </div>
  )
}
