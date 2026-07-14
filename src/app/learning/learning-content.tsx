"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { ContentPreviewCard } from "@/components/content-preview-card"
import { GlowCardGrid } from "@/components/glow-card-grid"
import { learningNotes } from "@/lib/learning-notes"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export function LearningContent() {
  const searchParams = useSearchParams()
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  const notes = useMemo(() => {
    if (!q) return learningNotes
    return learningNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.excerpt.toLowerCase().includes(q) ||
        note.meta.toLowerCase().includes(q),
    )
  }, [q])

  if (q && notes.length === 0) {
    return (
      <p className="mt-2 text-center text-sm text-muted-foreground">
        No notes match{" "}
        <span className={cn(navChakra, "text-foreground")}>“{q}”</span>.
      </p>
    )
  }

  return (
    <GlowCardGrid className="grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:max-w-3xl">
      {notes.map((note) => (
        <ContentPreviewCard
          key={note.href}
          title={note.title}
          excerpt={note.excerpt}
          meta={note.meta}
          href={note.href}
        />
      ))}
    </GlowCardGrid>
  )
}
