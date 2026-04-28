"use client";

import Link from "next/link";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { heroPairedCtaClass } from "@/lib/pill-chrome";
import { cn } from "@/lib/utils";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

export function NotFoundCtaButtons() {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
      <HoverBorderGradient
        as={Link}
        href="/"
        className={cn(navChakra, "px-6 sm:px-8")}
      >
        Take me home
      </HoverBorderGradient>

      <Link
        href="/blogs"
        className={cn(
          heroPairedCtaClass,
          navChakra,
          "w-full cursor-pointer justify-center tracking-tight sm:w-auto",
        )}
      >
        Browse the blogs
      </Link>
    </div>
  );
}
