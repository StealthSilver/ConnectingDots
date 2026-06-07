"use client";

import Link from "next/link";

import { appRoutes } from "@/lib/app-routes";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { heroPairedCtaClass } from "@/lib/pill-chrome";
import { cn } from "@/lib/utils";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

export function NotFoundCtaButtons() {
  return (
    <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
      <HoverBorderGradient
        as={Link}
        href="/"
        containerClassName="w-full sm:w-fit"
        className={cn(navChakra, "flex w-full justify-center px-6 sm:w-auto sm:px-8")}
      >
        Take me home
      </HoverBorderGradient>

      <Link
        href={appRoutes.blog}
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
