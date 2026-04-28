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
      className="flex h-14 items-center justify-between border-t border-[color:var(--color-line)] px-5 sm:px-6"
    >
      {/* Social links */}
      <div className="flex flex-wrap items-center gap-2">
        {socialItems.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            {...newTabProps}
            aria-label={label}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full",
              "border border-[color:var(--color-line)] bg-background/60",
              "text-muted-foreground transition-colors duration-200 hover:text-foreground",
            )}
          >
            <Icon className="size-3.5 shrink-0" aria-hidden />
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-xs text-muted-foreground">
        &copy; 2026 Connecting Dots. All rights reserved.
      </p>
    </footer>
  )
}
