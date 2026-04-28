import type { Metadata } from "next"

import { cn } from "@/lib/utils"

import { AppPageShell } from "../components/app-layout/app-page-shell"
import { LearningContent } from "./learning-content"

export const metadata: Metadata = {
  title: "Learning — Connecting Dots",
  description:
    "Pattern-first DSA notes and structured learning material to crack any technical interview.",
}

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export default function LearningPage() {
  return (
    <AppPageShell title="Learning" searchPlaceholder="Search notes…">
      <section
        aria-labelledby="learning-heading"
        className="px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12"
      >
        <h1
          id="learning-heading"
          className={cn(
            navChakra,
            "text-2xl font-semibold tracking-tight text-foreground sm:text-4xl",
          )}
        >
          Learning
        </h1>
      </section>

      <div className="mb-8 px-5 sm:mb-12 sm:px-8">
        <div className="h-px w-full bg-[color:var(--color-line)]" />
      </div>

      <section
        aria-label="Learning notes"
        className="px-5 pb-14 sm:px-8 sm:pb-20"
      >
        <LearningContent />
      </section>
    </AppPageShell>
  )
}
