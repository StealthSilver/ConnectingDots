"use client"

import Link from "next/link"

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export function CourseEnrollButton() {
  return (
    <HoverBorderGradient
      as={Link}
      href="/sign-up"
      containerClassName="w-fit"
      className={cn(navChakra, "px-4 text-xs sm:px-5")}
    >
      Enroll free
    </HoverBorderGradient>
  )
}
