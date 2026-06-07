import type { Metadata } from "next"

import { AppPageShell } from "../../components/app-layout/app-page-shell"
import { CommunityContent } from "../../community/community-content"
import { appPageSectionClassName } from "@/lib/page-content-shell"

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
        className={appPageSectionClassName}
      >
        <CommunityContent />
      </section>
    </AppPageShell>
  )
}
