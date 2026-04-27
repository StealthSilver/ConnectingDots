"use client";

import Link from "next/link";
import { useState } from "react";

import {
  GradientPill,
  HoverBorderGradient,
} from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3275F8]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-background";

export function Hero01CtaButtons() {
  const [learnHovered, setLearnHovered] = useState(false);

  return (
    <div className="mb-6 flex flex-col items-stretch gap-3 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center">
      <HoverBorderGradient as={Link} href="/sign-up" className={navChakra}>
        Sign up
      </HoverBorderGradient>

      <GradientPill
        as={Link}
        href="#about"
        onMouseEnter={() => setLearnHovered(true)}
        onMouseLeave={() => setLearnHovered(false)}
        borderGlowActive={learnHovered}
        rotateEnabled={learnHovered}
        emphasizeBorder={learnHovered}
        duration={1.35}
        containerClassName={cn(
          "cursor-pointer transition-[transform,box-shadow] duration-200 ease-out will-change-transform",
          "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(50,117,248,0.12)]",
          "dark:hover:shadow-[0_8px_28px_rgba(50,117,248,0.18)]",
          focusRing,
        )}
        className={cn(
          "relative z-20 px-4 py-2 text-sm font-medium tracking-tight !font-medium",
          navChakra,
        )}
      >
        Learn more
      </GradientPill>
    </div>
  );
}
