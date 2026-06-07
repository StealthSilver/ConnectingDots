import {
  IconBrandDiscord,
  IconBrandX,
  IconBrandYoutube,
  IconLink,
  IconMail,
} from "@tabler/icons-react"

import { newTabProps, siteLinks } from "@/lib/site-links"
import { cn } from "@/lib/utils"

const socialItems = [
  { label: "X", href: siteLinks.x, icon: IconBrandX },
  { label: "YouTube", href: siteLinks.youtube, icon: IconBrandYoutube },
  { label: "Email", href: siteLinks.email, icon: IconMail },
  { label: "Discord", href: siteLinks.discord, icon: IconBrandDiscord },
  { label: "Portfolio", href: siteLinks.portfolio, icon: IconLink },
] as const

export function AppMiniFooter() {
  return (
    <footer
      role="contentinfo"
      className={cn(
        "flex min-h-14 flex-col items-center justify-center gap-3",
        "border-t border-[color:var(--color-line)] px-4 py-4",
        "sm:flex-row sm:justify-between sm:px-6 sm:py-3",
      )}
    >
      {/* Social links */}
      <div className="flex max-w-full flex-wrap items-center justify-center gap-2 sm:justify-start">
        {socialItems.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            {...newTabProps}
            aria-label={label}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full sm:h-8 sm:w-8",
              "border border-[color:var(--color-line)] bg-background/60",
              "text-muted-foreground transition-colors duration-200 hover:text-foreground",
            )}
          >
            <Icon className="size-3.5 shrink-0" aria-hidden />
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-center text-[11px] leading-relaxed text-muted-foreground sm:text-right sm:text-xs">
        &copy; 2026 Connecting Dots. All rights reserved.
      </p>
    </footer>
  )
}
