"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { appRoutes } from "@/lib/app-routes"
import { authRoutes } from "@/lib/auth-routes"
import { cn } from "@/lib/utils"

type AuthCtaLinkProps = {
  className?: string
  containerClassName?: string
  signedOutLabel?: string
  signedInLabel?: string
  onClick?: () => void
}

export function AuthCtaLink({
  className,
  containerClassName,
  signedOutLabel = "Sign up",
  signedInLabel = "Go to Home",
  onClick,
}: AuthCtaLinkProps) {
  const { status } = useSession()
  const isAuthenticated = status === "authenticated"

  return (
    <HoverBorderGradient
      as={Link}
      href={isAuthenticated ? appRoutes.home : authRoutes.signUp}
      containerClassName={containerClassName}
      className={className}
      onClick={onClick}
    >
      {isAuthenticated ? signedInLabel : signedOutLabel}
    </HoverBorderGradient>
  )
}
