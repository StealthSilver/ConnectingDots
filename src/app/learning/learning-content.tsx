"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { ContentPreviewCard } from "@/components/content-preview-card"
import { GlowCardGrid } from "@/components/glow-card-grid"
import { fundamentalsFrontendNote } from "@/lib/learning-notes"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export function LearningContent() {
  const searchParams = useSearchParams()
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  const matches = useMemo(() => {
    if (!q) return true
    return (
      fundamentalsFrontendNote.title.toLowerCase().includes(q) ||
      fundamentalsFrontendNote.excerpt.toLowerCase().includes(q) ||
      fundamentalsFrontendNote.meta.toLowerCase().includes(q)
    )
  }, [q])

  if (q && !matches) {
    return (
      <p className="mt-2 text-center text-sm text-muted-foreground">
        No notes match{" "}
        <span className={cn(navChakra, "text-foreground")}>“{q}”</span>.
      </p>
    )
  }

  return (
    <GlowCardGrid className="grid-cols-1 gap-3 sm:gap-4 lg:max-w-md">
      <ContentPreviewCard
        title={fundamentalsFrontendNote.title}
        excerpt={fundamentalsFrontendNote.excerpt}
        meta={fundamentalsFrontendNote.meta}
        href={fundamentalsFrontendNote.href}
      />
    </GlowCardGrid>
  )
}
