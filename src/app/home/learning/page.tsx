import type { Metadata } from "next"

import { AppPageShell } from "../../components/app-layout/app-page-shell"
import { LearningContent } from "../../learning/learning-content"
import { appPageSectionClassName } from "@/lib/page-content-shell"

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
        className={appPageSectionClassName}
      >
        <LearningContent />
      </section>
    </AppPageShell>
  )
}
