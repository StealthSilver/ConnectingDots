"use client"

import type { ReactNode } from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"

import { AppMiniFooter } from "./app-mini-footer"
import { AppSidebar } from "./app-sidebar"

interface AppPageShellProps {
  children: ReactNode
  className?: string
}

/**
 * Full-page shell used by /blogs, /learning and /courses.
 * Renders the persistent left sidebar, a scrollable content area, and the
 * mini footer below the content — all without the top Navbar.
 */
export function AppPageShell({ children, className }: AppPageShellProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <div className="flex min-h-screen">
      <AppSidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((v) => !v)}
      />

      {/* Right side: content + footer, offset by sidebar width on large screens */}
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          sidebarExpanded ? "lg:ml-60" : "lg:ml-16",
          "pt-14 lg:pt-0",
          "transition-[margin-left] duration-300 ease-in-out",
        )}
      >
        <main className={cn("min-w-0 flex-1", className)}>
          {children}
        </main>
        <AppMiniFooter />
      </div>
    </div>
  )
}
