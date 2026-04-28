"use client"

import {
  IconMenu2,
  IconSearch,
  IconX,
} from "@tabler/icons-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react"

import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

interface AppTopNavProps {
  title?: string
  searchPlaceholder?: string
  showSearch?: boolean
  mobileOpen: boolean
  onMobileMenuToggle: () => void
}

/**
 * Thin top bar shown above app pages (Blogs, Learning, Courses, Upcoming).
 * Left:   page title (and a hamburger on mobile to control the sidebar).
 * Right:  optional search input that writes `?q=…` to the URL so pages can
 *         filter their content from the same query string.
 */
export function AppTopNav({
  title,
  searchPlaceholder = "Search…",
  showSearch = true,
  mobileOpen,
  onMobileMenuToggle,
}: AppTopNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialQ = searchParams.get("q") ?? ""
  const [value, setValue] = useState(initialQ)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keep input in sync if the URL changes externally (e.g. back/forward nav).
  useEffect(() => {
    setValue(searchParams.get("q") ?? "")
  }, [searchParams])

  const updateUrl = useCallback(
    (next: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (next) params.set("q", next)
      else params.delete("q")
      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      setValue(next)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => updateUrl(next), 120)
    },
    [updateUrl],
  )

  const onClear = useCallback(() => {
    setValue("")
    if (debounceRef.current) clearTimeout(debounceRef.current)
    updateUrl("")
  }, [updateUrl])

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-12 items-center gap-2 border-b border-[color:var(--color-line)]",
        "bg-background/85 px-5 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 sm:gap-3 sm:px-8",
      )}
    >
      {/* Mobile sidebar toggle */}
      <button
        type="button"
        onClick={onMobileMenuToggle}
        aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={mobileOpen}
        className={cn(
          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full lg:hidden",
          "border border-[color:var(--color-line)] bg-background/90 text-muted-foreground",
          "transition-colors hover:text-foreground",
        )}
      >
        {mobileOpen ? (
          <IconX className="size-4" aria-hidden />
        ) : (
          <IconMenu2 className="size-4" aria-hidden />
        )}
      </button>

      {/* Title */}
      {title ? (
        <h2
          className={cn(
            navChakra,
            "min-w-0 truncate text-sm font-semibold tracking-tight text-foreground sm:text-base",
          )}
        >
          {title}
        </h2>
      ) : (
        <span className="min-w-0" />
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      {showSearch && (
        <div
          className={cn(
            "group relative flex h-9 items-center gap-2 rounded-full border border-[color:var(--color-line)]",
            "bg-background/70 px-3 text-sm text-muted-foreground",
            "focus-within:border-foreground/30 focus-within:text-foreground",
            "w-40 sm:w-72",
          )}
        >
          <IconSearch className="size-4 shrink-0 opacity-70" aria-hidden />
          <input
            type="search"
            inputMode="search"
            enterKeyHint="search"
            value={value}
            onChange={onChange}
            placeholder={searchPlaceholder}
            aria-label={`Search ${title ?? "page"}`}
            className={cn(
              "h-full w-full min-w-0 bg-transparent text-sm text-foreground outline-none",
              "placeholder:text-muted-foreground/70",
            )}
          />
          {value ? (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className="inline-flex size-5 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <IconX className="size-3.5" aria-hidden />
            </button>
          ) : null}
        </div>
      )}
    </header>
  )
}
