import type { Metadata } from "next"

import { AppPageShell } from "../../components/app-layout/app-page-shell"
import { PlaygroundContent } from "../../playground/playground-content"

export const metadata: Metadata = {
  title: "Playground — Connecting Dots",
  description: "Interactive code playground — coming soon.",
}

export default function HomePlaygroundPage() {
  return (
    <AppPageShell title="Playground" searchPlaceholder="Search playground…">
      <section
        aria-label="Playground"
        className="px-5 pb-14 pt-5 sm:px-8 sm:pb-20 sm:pt-6"
      >
        <PlaygroundContent />
      </section>
    </AppPageShell>
  )
}
