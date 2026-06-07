import type { Metadata } from "next"

import { AppPageShell } from "../components/app-layout/app-page-shell"
import { ConnectContent } from "./connect-content"

export const metadata: Metadata = {
  title: "Connect — Connecting Dots",
  description:
    "Find Connecting Dots on X, YouTube, Discord, email, and more.",
}

export default function ConnectPage() {
  return (
    <AppPageShell title="Connect" searchPlaceholder="Search links…">
      <section
        aria-label="Connect links"
        className="px-5 pb-14 pt-5 sm:px-8 sm:pb-20 sm:pt-6"
      >
        <ConnectContent />
      </section>
    </AppPageShell>
  )
}
