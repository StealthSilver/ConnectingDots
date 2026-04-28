"use client"

import { IconArrowLeft, IconHome } from "@tabler/icons-react"
import Link from "next/link"

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { heroPairedCtaClass } from "@/lib/pill-chrome"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

interface AppNotFoundCtaProps {
  backHref?: string
  backLabel?: string
}

export function AppNotFoundCta({ backHref, backLabel }: AppNotFoundCtaProps) {
  return (
    <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
      <HoverBorderGradient
        as={Link}
        href="/"
        containerClassName="w-full sm:w-fit"
        className={cn(
          navChakra,
          "flex w-full items-center justify-center gap-2 px-6 sm:w-auto sm:px-8",
        )}
      >
        <IconHome className="size-4 shrink-0" aria-hidden />
        Take me home
      </HoverBorderGradient>

      {backHref && backLabel ? (
        <Link
          href={backHref}
          className={cn(
            heroPairedCtaClass,
            navChakra,
            "w-full cursor-pointer items-center justify-center gap-2 tracking-tight sm:w-auto",
          )}
        >
          <IconArrowLeft className="size-4 shrink-0" aria-hidden />
          {backLabel}
        </Link>
      ) : null}
    </div>
  )
}
