"use client"

import { AuthCtaLink } from "@/components/auth-cta-link"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export function CourseEnrollButton() {
  return (
    <AuthCtaLink
      signedOutLabel="Enroll free"
      containerClassName="w-fit"
      className={cn(navChakra, "px-4 text-xs sm:px-5")}
    />
  )
}
