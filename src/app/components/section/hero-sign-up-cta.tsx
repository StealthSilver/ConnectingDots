"use client";

import Link from "next/link";
import { NavbarButton } from "@/app/components/section/resizable-navbar";
import { cn } from "@/lib/utils";

const chakraPetch = "[font-family:var(--font-chakra-petch)]" as const;

type HeroSignUpCtaProps = { className?: string };

const heroSizes =
  "min-h-12 min-w-[6.5rem] px-7 py-3 text-lg sm:min-h-[3.25rem] sm:px-8 sm:text-xl";

export function HeroSignUpCta({ className }: HeroSignUpCtaProps) {
  return (
    <NavbarButton
      as={Link}
      href="/sign-up"
      variant="primary"
      className={cn(chakraPetch, heroSizes, className)}
    >
      Sign up
    </NavbarButton>
  );
}
