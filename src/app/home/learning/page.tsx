import type { Metadata } from "next"

import { AppPageShell } from "../../components/app-layout/app-page-shell"
import { LearningContent } from "../../learning/learning-content"

export const metadata: Metadata = {
  title: "Learning — Connecting Dots",
  description:
    "Pattern-first DSA notes and structured learning material to crack any technical interview.",
}

export default function HomeLearningPage() {
  return (
    <AppPageShell title="Learning" searchPlaceholder="Search notes…">
      <section
        aria-label="Learning notes"
        className="px-5 pb-14 pt-5 sm:px-8 sm:pb-20 sm:pt-6"
      >
        <LearningContent />
      </section>
    </AppPageShell>
  )
}
