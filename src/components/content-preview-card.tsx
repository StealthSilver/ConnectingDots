import { IconArrowRight } from "@tabler/icons-react"
import Link from "next/link"

import { GlowCard } from "@/components/glow-card-grid"
import { newTabProps } from "@/lib/site-links"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export type ContentPreviewCardProps = {
  title: string
  excerpt: string
  meta: string
  href?: string
  footerLabel?: string
  className?: string
}

export function ContentPreviewCard({
  title,
  excerpt,
  meta,
  href,
  footerLabel,
  className,
}: ContentPreviewCardProps) {
  const body = (
    <GlowCard
      className={cn(
        "h-full",
        href && "transition-transform duration-200 group-hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="flex h-full flex-col p-4 sm:p-5">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
          {meta}
        </p>
        <h3
          className={cn(
            navChakra,
            "mb-2 text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg",
          )}
        >
          {title}
        </h3>
        <p className="mb-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {excerpt}
        </p>
        <div className="flex items-center justify-between gap-3 border-t border-[color:var(--color-line)] pt-3">
          {footerLabel ? (
            <span className="text-[11px] text-muted-foreground/70">{footerLabel}</span>
          ) : (
            <span aria-hidden className="text-[11px] text-transparent">
              .
            </span>
          )}
          <span
            className={cn(
              navChakra,
              "inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-tight text-foreground sm:text-xs",
              href && "transition-opacity group-hover:opacity-70",
            )}
          >
            Open
            <IconArrowRight className="size-3 shrink-0" aria-hidden />
          </span>
        </div>
      </div>
    </GlowCard>
  )

  if (href) {
    const wrapperClassName = "group block h-full"
    const isExternal = href.startsWith("http")

    if (isExternal) {
      return (
        <a href={href} className={wrapperClassName} {...newTabProps}>
          {body}
        </a>
      )
    }

    return (
      <Link href={href} className={wrapperClassName}>
        {body}
      </Link>
    )
  }

  return body
}
