"use client";

import Link from "next/link";
import { NavbarButton } from "@/app/components/section/resizable-navbar";
import { cn } from "@/lib/utils";

const chakraPetch = "[font-family:var(--font-chakra-petch)]" as const;

export function HeroSignUpCta() {
  return (
    <NavbarButton
      as={Link}
      href="/sign-up"
      variant="primary"
      className={cn(
        chakraPetch,
        "min-h-12 min-w-[6.5rem] px-7 py-3 text-lg sm:min-h-[3.25rem] sm:px-8 sm:text-xl",
      )}
    >
      Sign up
    </NavbarButton>
  );
}
