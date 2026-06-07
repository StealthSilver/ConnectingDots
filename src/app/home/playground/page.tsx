import type { Metadata } from "next"

import { AppPageShell } from "../../components/app-layout/app-page-shell"
import { PlaygroundContent } from "../../playground/playground-content"
import { appPageSectionClassName } from "@/lib/page-content-shell"

export const metadata: Metadata = {
  title: "Playground — Connecting Dots",
  description: "Interactive code playground — coming soon.",
}

export default function HomePlaygroundPage() {
  return (
    <AppPageShell title="Playground" searchPlaceholder="Search playground…">
      <section
        aria-label="Playground"
        className={appPageSectionClassName}
      >
        <PlaygroundContent />
      </section>
    </AppPageShell>
  )
}
