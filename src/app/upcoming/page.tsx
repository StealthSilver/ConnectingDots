import type { Metadata } from "next"

import { AppPageShell } from "../components/app-layout/app-page-shell"
import { UpcomingList } from "./upcoming-list"

export const metadata: Metadata = {
  title: "Upcoming features — Connecting Dots",
  description:
    "What we're building next on Connecting Dots — a sneak peek at the roadmap.",
}

export default function UpcomingPage() {
  return (
    <AppPageShell
      title="Upcoming Features"
      searchPlaceholder="Search features…"
    >
      <section
        aria-label="Planned features"
        className="px-5 pb-14 pt-5 sm:px-8 sm:pb-20 sm:pt-6"
      >
        <UpcomingList />
      </section>
    </AppPageShell>
  )
}
