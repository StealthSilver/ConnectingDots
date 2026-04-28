"use client"

import { Suspense, useCallback, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

import { AppMiniFooter } from "./app-mini-footer"
import { AppSidebar } from "./app-sidebar"
import { AppTopNav } from "./app-top-nav"

interface AppPageShellProps {
  children: ReactNode
  className?: string
  /** Title rendered in the thin top bar (e.g. "Blogs", "Courses"). */
  title?: string
  /** Placeholder for the top-bar search input. */
  searchPlaceholder?: string
  /** Hide the search input (e.g. on a 404 / not-found screen). */
  showSearch?: boolean
}

/**
 * Full-page shell used by /blogs, /learning, /courses and /upcoming.
 * Renders the persistent left sidebar, a thin top navbar (title + search),
 * the scrollable content area, and the mini footer below it.
 */
export function AppPageShell({
  children,
  className,
  title,
  searchPlaceholder,
  showSearch = true,
}: AppPageShellProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const onMobileMenuToggle = useCallback(() => setMobileOpen((v) => !v), [])
  const onMobileClose = useCallback(() => setMobileOpen(false), [])
  const onSidebarToggle = useCallback(() => setSidebarExpanded((v) => !v), [])

  return (
    <div className="flex min-h-screen">
      <AppSidebar
        expanded={sidebarExpanded}
        onToggle={onSidebarToggle}
        mobileOpen={mobileOpen}
        onMobileClose={onMobileClose}
      />

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          sidebarExpanded ? "lg:ml-60" : "lg:ml-16",
          "transition-[margin-left] duration-300 ease-in-out",
        )}
      >
        <Suspense
          fallback={
            <div className="sticky top-0 z-30 h-12 border-b border-[color:var(--color-line)] bg-background/85 px-5 backdrop-blur-md sm:px-8" />
          }
        >
          <AppTopNav
            title={title}
            searchPlaceholder={searchPlaceholder}
            showSearch={showSearch}
            mobileOpen={mobileOpen}
            onMobileMenuToggle={onMobileMenuToggle}
          />
        </Suspense>

        <main className={cn("min-w-0 flex-1", className)}>{children}</main>
        <AppMiniFooter />
      </div>
    </div>
  )
}
