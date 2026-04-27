"use client";

import Link from "next/link";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

export function Hero01CtaButtons() {
  return (
    <div className="mb-6 flex flex-col items-stretch gap-3 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center">
      <HoverBorderGradient as={Link} href="/sign-up" className={navChakra}>
        Sign up
      </HoverBorderGradient>

      <HoverBorderGradient as={Link} href="#about" className={navChakra}>
        Learn more
      </HoverBorderGradient>
    </div>
  );
}
