import type { Metadata } from "next"

import { AppPageShell } from "../../components/app-layout/app-page-shell"
import { CommunityContent } from "../../community/community-content"

export const metadata: Metadata = {
  title: "Community — Connecting Dots",
  description:
    "Study together, share what you're building, and join discussions around notes, blog posts, and courses.",
}

export default function HomeCommunityPage() {
  return (
    <AppPageShell title="Community" searchPlaceholder="Search community…">
      <section
        aria-label="Community"
        className="px-5 pb-14 pt-5 sm:px-8 sm:pb-20 sm:pt-6"
      >
        <CommunityContent />
      </section>
    </AppPageShell>
  )
}
