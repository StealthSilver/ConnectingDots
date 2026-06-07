"use client"

import Image from "next/image"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import {
  IconArticle,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconMoon,
  IconNotebook,
  IconRocket,
  IconSchool,
  IconSun,
  IconTerminal2,
  IconLogout,
  IconUserCircle,
  IconUsersGroup,
} from "@tabler/icons-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { AuthCtaLink } from "@/components/auth-cta-link"
import { appRoutes } from "@/lib/app-routes"
import { authRoutes } from "@/lib/auth-routes"
import { useTheme } from "@/lib/theme"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

const navItems = [
  { label: "Blog", href: appRoutes.blog, icon: IconArticle },
  { label: "Learning", href: appRoutes.learning, icon: IconNotebook },
  { label: "Community", href: appRoutes.community, icon: IconUsersGroup },
  { label: "Courses", href: appRoutes.courses, icon: IconSchool },
  { label: "Playground", href: appRoutes.playground, icon: IconTerminal2 },
] as const

function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "group inline-flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
        "text-muted-foreground transition-colors duration-200",
        "hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]",
      )}
    >
      {isDark ? (
        <IconSun className="size-4 shrink-0" aria-hidden />
      ) : (
        <IconMoon className="size-4 shrink-0" aria-hidden />
      )}
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  )
}

function UserPopover({
  onClose,
  triggerRef,
}: {
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}) {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      const target = e.target as Node
      if (popoverRef.current?.contains(target)) return
      if (triggerRef.current?.contains(target)) return
      onClose()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("mousedown", onOutsideClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onOutsideClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [onClose, triggerRef])

  return (
    <motion.div
      ref={popoverRef}
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className={cn(
        "absolute bottom-full left-2 z-50 mb-2 w-52",
        "rounded-2xl border border-[color:var(--color-line)]",
        "bg-background/95 shadow-lg backdrop-blur-md",
        "p-2",
      )}
    >
      {isAuthenticated ? (
        <>
          <div className="px-3 py-2">
            <p className={cn(navChakra, "truncate text-xs font-semibold text-foreground")}>
              {session?.user?.name ?? "Account"}
            </p>
            {session?.user?.email && (
              <p className="truncate text-[11px] text-muted-foreground">
                {session.user.email}
              </p>
            )}
          </div>
          <div className="mx-1 mb-1 h-px bg-[color:var(--color-line)]" />
          <button
            type="button"
            onClick={() => {
              onClose()
              void signOut({ callbackUrl: authRoutes.signUp })
            }}
            className={cn(
              "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5",
              "text-muted-foreground transition-colors duration-200",
              "hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]",
            )}
          >
            <IconLogout className="size-4 shrink-0" aria-hidden />
            <span className="text-xs font-medium tracking-[0.15em]">Log out</span>
          </button>
          <div className="mx-1 mb-1 h-px bg-[color:var(--color-line)]" />
        </>
      ) : (
        <>
          <div className="px-1 pb-2 pt-1">
            <AuthCtaLink
              containerClassName="w-full"
              className={cn(navChakra, "flex w-full justify-center text-xs")}
              onClick={onClose}
            />
          </div>
          <div className="mx-1 mb-1 h-px bg-[color:var(--color-line)]" />
        </>
      )}

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Divider */}
      <div className="mx-1 my-1 h-px bg-[color:var(--color-line)]" />

      {/* Upcoming features */}
      <Link
        href="/upcoming"
        onClick={onClose}
        className={cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5",
          "text-muted-foreground transition-colors duration-200",
          "hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]",
        )}
      >
        <IconRocket className="size-4 shrink-0" aria-hidden />
        <span className="text-xs font-medium tracking-[0.15em]">
          Upcoming features
        </span>
      </Link>
    </motion.div>
  )
}

function SidebarNavItem({
  href,
  label,
  icon: Icon,
  isActive,
  expanded,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  isActive: boolean
  expanded: boolean
}) {
  return (
    <Link
      href={href}
      title={!expanded ? label : undefined}
      className={cn(
        navChakra,
        "group relative flex items-center rounded-xl text-sm font-medium transition-colors duration-200",
        expanded ? "gap-3 px-3 py-2" : "justify-center px-3 py-2",
        isActive
          ? "bg-black/[0.06] text-foreground dark:bg-white/[0.08]"
          : "text-muted-foreground hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]",
      )}
    >
      {isActive && expanded && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-foreground/50"
        />
      )}
      <Icon className="size-4 shrink-0" aria-hidden />
      {expanded && <span className="truncate">{label}</span>}
    </Link>
  )
}

interface AppSidebarProps {
  expanded: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function AppSidebar({
  expanded,
  onToggle,
  mobileOpen,
  onMobileClose,
}: AppSidebarProps) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const [userOpen, setUserOpen] = useState(false)
  const userTriggerRef = useRef<HTMLButtonElement>(null)
  const showLabels = expanded || mobileOpen

  useEffect(() => {
    onMobileClose()
  }, [pathname, onMobileClose])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] lg:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col",
          showLabels ? "w-60" : "w-16",
          "border-r border-[color:var(--color-line)] bg-background/95 backdrop-blur-md",
          "transition-[width] duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Expand / collapse toggle — small circle on the right border at the top */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
          className={cn(
            "absolute -right-3 top-3 z-50 hidden lg:inline-flex",
            "h-6 w-6 items-center justify-center rounded-full",
            "border border-[color:var(--color-line)] bg-background",
            "text-muted-foreground shadow-sm transition-colors duration-200",
            "hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
          )}
        >
          {expanded ? (
            <IconChevronLeft className="size-3.5" aria-hidden />
          ) : (
            <IconChevronRight className="size-3.5" aria-hidden />
          )}
        </button>

        {/* Nav items including logo */}
        <nav
          aria-label="App navigation"
          className="flex-1 overflow-hidden overflow-y-auto px-3 pb-4 pt-1.5 sm:pt-2"
        >
          <ul className="flex flex-col gap-0.5" role="list">
            {/* Logo / Home — styled like a nav item */}
            <li>
              <Link
                href={appRoutes.home}
                title={!showLabels ? "Home — Connecting Dots" : undefined}
                aria-label="Home — Connecting Dots"
                className={cn(
                  navChakra,
                  "group relative flex items-center rounded-xl text-sm font-medium transition-colors duration-200",
                  showLabels ? "gap-3 px-3 py-2" : "justify-center px-3 py-2",
                  pathname === appRoutes.home
                    ? "bg-black/[0.06] text-foreground dark:bg-white/[0.08]"
                    : "text-muted-foreground hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]",
                )}
              >
                {/* Contracted: small cropped logo; Expanded: full logo */}
                {showLabels ? (
                  <>
                    <Image
                      src="/light.png"
                      alt=""
                      width={120}
                      height={32}
                      className="h-5 w-auto shrink-0 dark:hidden"
                      priority
                    />
                    <Image
                      src="/cddark.png"
                      alt=""
                      width={120}
                      height={32}
                      className="hidden h-5 w-auto shrink-0 dark:block"
                      priority
                    />
                    <span className="truncate text-foreground">Connecting Dots</span>
                  </>
                ) : (
                  <span className="flex h-5 w-5 shrink-0 items-center overflow-hidden">
                    <Image
                      src="/light.png"
                      alt=""
                      width={120}
                      height={32}
                      className="h-full w-auto shrink-0 dark:hidden"
                      priority
                    />
                    <Image
                      src="/cddark.png"
                      alt=""
                      width={120}
                      height={32}
                      className="hidden h-full w-auto shrink-0 dark:block"
                      priority
                    />
                  </span>
                )}
              </Link>
            </li>

            {navItems.map((item) => (
              <li key={item.href}>
                <SidebarNavItem
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isActive={isNavActive(pathname, item.href)}
                  expanded={showLabels}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* User button at bottom — height matches the right-side footer */}
        <div className="relative flex h-14 items-center border-t border-[color:var(--color-line)] px-3">
          <AnimatePresence>
            {userOpen && (
              <UserPopover
                onClose={() => setUserOpen(false)}
                triggerRef={userTriggerRef}
              />
            )}
          </AnimatePresence>

          <button
            ref={userTriggerRef}
            type="button"
            onClick={() => setUserOpen((o) => !o)}
            aria-expanded={userOpen}
            aria-label="Account menu"
            title={!showLabels ? "Account" : undefined}
            className={cn(
              "group flex w-full items-center rounded-xl px-3 py-2 text-sm font-medium",
              showLabels ? "gap-3" : "justify-center",
              "text-muted-foreground transition-colors duration-200",
              "hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]",
              userOpen && "bg-black/[0.06] text-foreground dark:bg-white/[0.08]",
            )}
          >
            <IconUserCircle className="size-5 shrink-0" aria-hidden />
            {showLabels && (
              <>
                <span className={cn(navChakra, "flex-1 truncate text-left text-sm")}>
                  {isAuthenticated ? (session?.user?.name ?? "Account") : "Account"}
                </span>
                <IconChevronUp
                  className={cn(
                    "size-3.5 shrink-0 text-muted-foreground/50 transition-transform duration-200",
                    userOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
